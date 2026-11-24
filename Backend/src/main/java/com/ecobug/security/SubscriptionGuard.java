package com.ecobug.security;

import com.ecobug.entity.User;
import com.ecobug.enums.Role;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class SubscriptionGuard {

    public User requireActiveSubscription(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails details)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        User user = details.getUser();
        if (user.getRole() == Role.ADMIN) {
            return user;
        }

        if (!user.hasActiveSubscription()) {
            throw new ResponseStatusException(
                    HttpStatus.PAYMENT_REQUIRED,
                    "Active Pro subscription required to access this feature"
            );
        }

        return user;
    }
}