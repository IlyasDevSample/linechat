package me.ilyaselaissi.linechatapi.exceptions.token;

public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException(String message) {
        super(message);
    }
}
