package me.ilyaselaissi.linechatapi.exceptions.user;

public class InvalidUserException extends RuntimeException{
    public InvalidUserException(String message) {
        super(message);
    }
}
