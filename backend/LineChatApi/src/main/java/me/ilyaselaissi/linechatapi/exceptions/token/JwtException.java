package me.ilyaselaissi.linechatapi.exceptions.token;

public class JwtException extends RuntimeException{
    public JwtException(String message) {
        super(message);
    }
}
