package com.honda.ego.auth.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI/Swagger configuration
 */
@Configuration
public class OpenApiConfig {
    
    @Value("${server.port:8081}")
    private String serverPort;
    
    @Bean
    public OpenAPI authServiceOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:" + serverPort);
        devServer.setDescription("Server URL in Development environment");
        
        Server prodServer = new Server();
        prodServer.setUrl("https://api.honda-ego.com");
        prodServer.setDescription("Server URL in Production environment");
        
        Contact contact = new Contact();
        contact.setEmail("dev@honda-ego.com");
        contact.setName("Honda eGo Development Team");
        contact.setUrl("https://honda-ego.com");
        
        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");
        
        Info info = new Info()
            .title("Honda eGo Authentication Service API")
            .version("1.0.0")
            .contact(contact)
            .description("This API provides authentication and authorization services for Honda eGo platform. " +
                        "It handles user registration, login, password management, and JWT token operations.")
            .license(mitLicense);
        
        return new OpenAPI().info(info).servers(List.of(devServer, prodServer));
    }
}
