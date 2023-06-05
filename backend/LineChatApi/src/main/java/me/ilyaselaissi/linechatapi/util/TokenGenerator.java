package me.ilyaselaissi.linechatapi.util;

import java.security.SecureRandom;
import java.util.Base64;

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
}
