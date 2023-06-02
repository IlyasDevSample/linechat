package me.ilyaselaissi.linechatapi.exceptions;

import me.ilyaselaissi.linechatapi.exceptions.user.DuplicateUserException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = {InvalidUserException.class, DuplicateUserException.class})
    public ResponseEntity<String> handleInvalidUserException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
