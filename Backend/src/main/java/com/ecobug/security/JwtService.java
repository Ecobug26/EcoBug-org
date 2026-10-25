package com.ecobug.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(String email) {
    return buildToken(email, accessTokenExpiration, "access");
}

public String generateRefreshToken(String email) {
    return buildToken(email, refreshTokenExpiration, "refresh");
}

private String buildToken(
        String email,
        long expiration,
        String tokenType) {

    return Jwts.builder()
            .subject(email)
            .claim("tokenType", tokenType)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
}

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public boolean isTokenType(String token, String expectedType) {
    String tokenType = extractClaim(
            token,
            claims -> claims.get("tokenType", String.class)
    );

    return expectedType.equals(tokenType);
}
    public boolean isTokenValid(String token, String email) {

        return email.equals(extractEmail(token))
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return resolver.apply(claims);
    }
}