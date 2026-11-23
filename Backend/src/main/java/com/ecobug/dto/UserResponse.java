package com.ecobug.dto;

import com.ecobug.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserResponse {
    private String subscriptionPlan;
    private LocalDateTime subscriptionExpiresAt;
    private UUID id;
    private String fullName;
    private String email;
    private Role role;
}