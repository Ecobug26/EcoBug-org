package com.ecobug.service;

import com.ecobug.dto.AuthResponse;
import com.ecobug.dto.LoginRequest;
import com.ecobug.dto.RegisterRequest;
import com.ecobug.entity.User;
import com.ecobug.repository.UserRepository;
import com.ecobug.exception.EmailAlreadyExistsException;
import com.ecobug.exception.InvalidCredentialsException;
import com.ecobug.security.JwtService;
import com.ecobug.dto.RefreshRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public AuthService(UserRepository userRepository,
                   PasswordEncoder passwordEncoder,
                   JwtService jwtService) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
}

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new  EmailAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user.getEmail());
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

    return AuthResponse.builder()
        .accessToken(accessToken)
        .refreshToken(refreshToken)
        .email(user.getEmail())
        .fullName(user.getFullName())
        .build();
    }
    public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new InvalidCredentialsException("Invalid email or password");
    }

    String accessToken = jwtService.generateAccessToken(user.getEmail());
    String refreshToken = jwtService.generateRefreshToken(user.getEmail());

    return AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .email(user.getEmail())
            .fullName(user.getFullName())
            .build();
}
public AuthResponse refresh(RefreshRequest request) {

    String email;

    try {
        email = jwtService.extractEmail(request.getRefreshToken());
    } catch (Exception e) {
        throw new InvalidCredentialsException("Invalid refresh token");
    }

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new InvalidCredentialsException("User not found"));

    if (!jwtService.isTokenValid(request.getRefreshToken(), user.getEmail())) {
        throw new InvalidCredentialsException("Invalid refresh token");
    }

    String newAccessToken = jwtService.generateAccessToken(user.getEmail());
    String newRefreshToken = jwtService.generateRefreshToken(user.getEmail());

    return AuthResponse.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .email(user.getEmail())
            .fullName(user.getFullName())
            .build();
}

}