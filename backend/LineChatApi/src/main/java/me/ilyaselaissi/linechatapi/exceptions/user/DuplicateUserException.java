package me.ilyaselaissi.linechatapi.exceptions.user;

public class DuplicateUserException extends RuntimeException{
    public DuplicateUserException(String message) {
        super(message);
    }
}
