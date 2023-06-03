package me.ilyaselaissi.linechatapi.exceptions;

import me.ilyaselaissi.linechatapi.exceptions.token.InvalidTokenException;
import me.ilyaselaissi.linechatapi.exceptions.user.DuplicateUserException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.Map;

@RestControllerAdvice
public class AppExceptionHandler {

    @Value("${app.frontend-url}")
    private String FRONTEND_URL;

    @ExceptionHandler(value = {InvalidUserException.class, DuplicateUserException.class})
    public ResponseEntity<String> handleInvalidUserException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(value = {InvalidTokenException.class})
    public ResponseEntity<Map<String, String>> handleInvalidTokenException(Exception e) {
        Map<String, String> response = Map.of(
                "status", "error",
                "message", e.getMessage()
        );
        return ResponseEntity.badRequest().body(response);
    }
}
