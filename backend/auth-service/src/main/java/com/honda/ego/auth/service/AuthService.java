package com.honda.ego.auth.service;

import com.honda.ego.auth.dto.AuthResponse;
import com.honda.ego.auth.dto.LoginRequest;
import com.honda.ego.auth.dto.RegisterRequest;
import com.honda.ego.auth.model.User;
import com.honda.ego.auth.model.enums.UserRole;
import com.honda.ego.auth.model.enums.UserStatus;
import com.honda.ego.auth.repository.UserRepository;
import com.honda.ego.auth.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Service class for authentication operations
 */
@Service
@Transactional
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Autowired
    private EmailService emailService;
    
    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }
        
        if (request.getPhoneNumber() != null && userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number is already in use!");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.CUSTOMER);
        user.setStatus(UserStatus.PENDING_VERIFICATION);
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        
        user = userRepository.save(user);
        
        // Send verification email
        try {
            emailService.sendVerificationEmail(user);
        } catch (Exception e) {
            // Log error but don't fail registration
            e.printStackTrace();
        }
        
        // Generate tokens
        String accessToken = tokenProvider.generateToken(user.getId().toString(), user.getRole().name());
        String refreshToken = tokenProvider.generateRefreshToken(user.getId().toString());
        
        // Store refresh token in Redis
        storeRefreshToken(user.getId(), refreshToken);
        
        return buildAuthResponse(user, accessToken, refreshToken);
    }
    
    /**
     * Authenticate user login
     */
    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            // Get user details
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Check if user is active
            if (user.getStatus() != UserStatus.ACTIVE && user.getStatus() != UserStatus.PENDING_VERIFICATION) {
                throw new RuntimeException("Account is " + user.getStatus().name().toLowerCase());
            }
            
            // Update last login and FCM token
            user.setLastLogin(LocalDateTime.now());
            if (request.getFcmToken() != null) {
                user.setFcmToken(request.getFcmToken());
            }
            user = userRepository.save(user);
            
            // Generate tokens
            String accessToken = tokenProvider.generateToken(user.getId().toString(), user.getRole().name());
            String refreshToken = tokenProvider.generateRefreshToken(user.getId().toString());
            
            // Store refresh token in Redis
            storeRefreshToken(user.getId(), refreshToken);
            
            return buildAuthResponse(user, accessToken, refreshToken);
            
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
    
    /**
     * Refresh access token
     */
    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        
        String userId = tokenProvider.getUserIdFromToken(refreshToken);
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if refresh token exists in Redis
        String storedToken = (String) redisTemplate.opsForValue().get("refresh_token:" + userId);
        if (storedToken == null || !storedToken.equals(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        
        // Generate new access token
        String newAccessToken = tokenProvider.generateToken(userId, user.getRole().name());
        
        return buildAuthResponse(user, newAccessToken, refreshToken);
    }
    
    /**
     * Logout user
     */
    public void logout(String userId) {
        // Remove refresh token from Redis
        redisTemplate.delete("refresh_token:" + userId);
        
        // Clear FCM token
        userRepository.findById(UUID.fromString(userId))
            .ifPresent(user -> {
                user.setFcmToken(null);
                userRepository.save(user);
            });
    }
    
    /**
     * Verify email
     */
    public void verifyEmail(String token) {
        if (!tokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid verification token");
        }
        
        String userId = tokenProvider.getUserIdFromToken(token);
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setEmailVerified(true);
        if (user.getStatus() == UserStatus.PENDING_VERIFICATION) {
            user.setStatus(UserStatus.ACTIVE);
        }
        userRepository.save(user);
    }
    
    /**
     * Send password reset email
     */
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with this email"));
        
        try {
            emailService.sendPasswordResetEmail(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send password reset email");
        }
    }
    
    /**
     * Reset password with token
     */
    public void resetPassword(String token, String newPassword) {
        if (!tokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid or expired reset token");
        }
        
        String userId = tokenProvider.getUserIdFromToken(token);
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        // Invalidate all existing tokens for this user
        redisTemplate.delete("refresh_token:" + userId);
    }
    
    /**
     * Change password
     */
    public void changePassword(String userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        // Invalidate all existing tokens for this user
        redisTemplate.delete("refresh_token:" + userId);
    }
    
    /**
     * Get user profile
     */
    public User getUserProfile(String userId) {
        return userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    /**
     * Update user profile
     */
    public User updateUserProfile(String userId, User updateRequest) {
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Update allowed fields
        if (updateRequest.getFullName() != null) {
            user.setFullName(updateRequest.getFullName());
        }
        if (updateRequest.getPhoneNumber() != null && !updateRequest.getPhoneNumber().equals(user.getPhoneNumber())) {
            if (userRepository.existsByPhoneNumber(updateRequest.getPhoneNumber())) {
                throw new RuntimeException("Phone number is already in use");
            }
            user.setPhoneNumber(updateRequest.getPhoneNumber());
            user.setPhoneVerified(false);
        }
        if (updateRequest.getAddress() != null) {
            user.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getCity() != null) {
            user.setCity(updateRequest.getCity());
        }
        if (updateRequest.getDateOfBirth() != null) {
            user.setDateOfBirth(updateRequest.getDateOfBirth());
        }
        if (updateRequest.getGender() != null) {
            user.setGender(updateRequest.getGender());
        }
        
        return userRepository.save(user);
    }
    
    /**
     * Store refresh token in Redis
     */
    private void storeRefreshToken(UUID userId, String refreshToken) {
        redisTemplate.opsForValue().set(
            "refresh_token:" + userId.toString(), 
            refreshToken, 
            7, 
            TimeUnit.DAYS
        );
    }
    
    /**
     * Build authentication response
     */
    private AuthResponse buildAuthResponse(User user, String accessToken, String refreshToken) {
        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setExpiresIn(tokenProvider.getTokenExpiration());
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setEmailVerified(user.getEmailVerified());
        response.setPhoneVerified(user.getPhoneVerified());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setLastLogin(user.getLastLogin());
        return response;
    }
}
