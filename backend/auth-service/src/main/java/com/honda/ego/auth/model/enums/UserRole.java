package com.honda.ego.auth.model.enums;

/**
 * User roles in the Honda eGo system
 */
public enum UserRole {
    CUSTOMER("Customer - Can place orders and use services"),
    DRIVER("Driver - Can accept and fulfill orders"),
    ADMIN("Admin - Can manage system operations"),
    SUPER_ADMIN("Super Admin - Full system access");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
