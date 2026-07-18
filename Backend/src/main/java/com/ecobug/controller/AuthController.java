package com.ecobug.controller;

import com.ecobug.dto.AuthResponse;
import com.ecobug.dto.LoginRequest;
import com.ecobug.dto.RegisterRequest;
import com.ecobug.dto.RefreshRequest;
import com.ecobug.service.AuthService;
import com.ecobug.dto.UserResponse;
import com.ecobug.entity.User;
import com.ecobug.security.CustomUserDetails;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
    @GetMapping("/me")
public UserResponse me(Authentication authentication) {

    CustomUserDetails userDetails =
            (CustomUserDetails) authentication.getPrincipal();

    User user = userDetails.getUser();

    return UserResponse.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .email(user.getEmail())
            .role(user.getRole())
            .build();
}
@PostMapping("/refresh")
public AuthResponse refresh(@Valid @RequestBody RefreshRequest request) {
    return authService.refresh(request);
}
}