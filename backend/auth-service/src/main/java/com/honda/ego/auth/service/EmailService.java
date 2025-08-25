package com.honda.ego.auth.service;

import com.honda.ego.auth.model.User;
import com.honda.ego.auth.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service for sending emails
 */
@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;
    
    /**
     * Send email verification
     */
    @Async
    public void sendVerificationEmail(User user) {
        String token = tokenProvider.generateEmailVerificationToken(user.getId().toString());
        String verificationUrl = frontendUrl + "/verify-email?token=" + token;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Honda eGo - Verify Your Email");
        message.setText(buildEmailVerificationMessage(user.getFullName(), verificationUrl));
        
        mailSender.send(message);
    }
    
    /**
     * Send password reset email
     */
    @Async
    public void sendPasswordResetEmail(User user) {
        String token = tokenProvider.generatePasswordResetToken(user.getId().toString());
        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Honda eGo - Password Reset");
        message.setText(buildPasswordResetMessage(user.getFullName(), resetUrl));
        
        mailSender.send(message);
    }
    
    /**
     * Send welcome email
     */
    @Async
    public void sendWelcomeEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Welcome to Honda eGo!");
        message.setText(buildWelcomeMessage(user.getFullName()));
        
        mailSender.send(message);
    }
    
    /**
     * Build email verification message
     */
    private String buildEmailVerificationMessage(String name, String verificationUrl) {
        return String.format(
            "Dear %s,\n\n" +
            "Welcome to Honda eGo! Please verify your email address by clicking the link below:\n\n" +
            "%s\n\n" +
            "This link will expire in 24 hours.\n\n" +
            "If you didn't create an account with Honda eGo, please ignore this email.\n\n" +
            "Best regards,\n" +
            "Honda eGo Team",
            name, verificationUrl
        );
    }
    
    /**
     * Build password reset message
     */
    private String buildPasswordResetMessage(String name, String resetUrl) {
        return String.format(
            "Dear %s,\n\n" +
            "You have requested to reset your password for your Honda eGo account.\n\n" +
            "Please click the link below to reset your password:\n\n" +
            "%s\n\n" +
            "This link will expire in 1 hour.\n\n" +
            "If you didn't request a password reset, please ignore this email.\n\n" +
            "Best regards,\n" +
            "Honda eGo Team",
            name, resetUrl
        );
    }
    
    /**
     * Build welcome message
     */
    private String buildWelcomeMessage(String name) {
        return String.format(
            "Dear %s,\n\n" +
            "Welcome to Honda eGo - the future of electric vehicle services!\n\n" +
            "Your account has been successfully created and verified. You can now:\n" +
            "• Book delivery services\n" +
            "• Order food delivery\n" +
            "• Request ride sharing\n" +
            "• Track your orders in real-time\n" +
            "• Chat with our AI assistant\n\n" +
            "Download our mobile app for the best experience:\n" +
            "• iOS: App Store\n" +
            "• Android: Google Play Store\n\n" +
            "If you have any questions, our AI-powered support is available 24/7.\n\n" +
            "Thank you for choosing Honda eGo!\n\n" +
            "Best regards,\n" +
            "Honda eGo Team",
            name
        );
    }
}
