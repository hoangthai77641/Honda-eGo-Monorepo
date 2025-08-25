package com.honda.ego.auth.repository;

import com.honda.ego.auth.model.User;
import com.honda.ego.auth.model.enums.UserRole;
import com.honda.ego.auth.model.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Find user by phone number
     */
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    /**
     * Find user by email or phone number
     */
    @Query("SELECT u FROM User u WHERE u.email = :identifier OR u.phoneNumber = :identifier")
    Optional<User> findByEmailOrPhoneNumber(@Param("identifier") String identifier);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Check if phone number exists
     */
    boolean existsByPhoneNumber(String phoneNumber);
    
    /**
     * Find users by role
     */
    List<User> findByRole(UserRole role);
    
    /**
     * Find users by status
     */
    List<User> findByStatus(UserStatus status);
    
    /**
     * Find users by role and status
     */
    List<User> findByRoleAndStatus(UserRole role, UserStatus status);
    
    /**
     * Find users created after a specific date
     */
    List<User> findByCreatedAtAfter(LocalDateTime date);
    
    /**
     * Find users who haven't logged in for a specific period
     */
    @Query("SELECT u FROM User u WHERE u.lastLogin IS NULL OR u.lastLogin < :date")
    List<User> findInactiveUsers(@Param("date") LocalDateTime date);
    
    /**
     * Find users by city
     */
    List<User> findByCity(String city);
    
    /**
     * Count users by role
     */
    long countByRole(UserRole role);
    
    /**
     * Count users by status
     */
    long countByStatus(UserStatus status);
    
    /**
     * Find users with unverified email
     */
    List<User> findByEmailVerifiedFalse();
    
    /**
     * Find users with unverified phone
     */
    List<User> findByPhoneVerifiedFalse();
}
