package me.ilyaselaissi.linechatapi.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Component
public class TokenGenerator {

    private static final int TOKEN_LENGTH = 32;
    public static final String EMAIL_CONFIRMATION_TOKEN_TYPE = "email_confirmation";
    public static final String PASSWORD_RESET_TOKEN_TYPE = "password_reset";

    public static String generateRandomStringToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    public static String generateJwtToken(String username, String jwtSecretKey) {
        // Define the JWT claims
        Claims claims = Jwts.claims().setSubject(username);

        // Set the expiration date for the token (e.g., 10 days from now)
        Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 10); // 10 days

        // Generate the JWT token
        String token = Jwts.builder()
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return token;
    }

    public static Claims parseJwtToken(String token, String jwtSecretKey) {
        return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody();
    }
}
