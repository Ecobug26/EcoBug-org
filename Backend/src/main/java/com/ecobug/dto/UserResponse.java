package com.ecobug.dto;

import com.ecobug.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserResponse {

    private UUID id;
    private String fullName;
    private String email;
    private Role role;
}