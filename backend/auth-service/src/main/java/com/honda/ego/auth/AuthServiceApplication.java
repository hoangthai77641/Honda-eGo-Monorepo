package com.honda.ego.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Honda eGo Authentication Service
 * 
 * This service handles authentication, authorization, and user management
 * for the Honda eGo platform.
 * 
 * Features:
 * - JWT-based authentication
 * - Role-based access control
 * - User registration and verification
 * - Password reset functionality
 * - OAuth2 integration ready
 * - Rate limiting
 * - Redis session management
 * 
 * @author Honda eGo Development Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableEurekaClient
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
