package com.honda.ego.auth.model.enums;

/**
 * User status in the Honda eGo system
 */
public enum UserStatus {
    ACTIVE("User is active and can use all services"),
    INACTIVE("User account is inactive"),
    SUSPENDED("User account is suspended due to violations"),
    PENDING_VERIFICATION("User account is pending email/phone verification");

    private final String description;

    UserStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
