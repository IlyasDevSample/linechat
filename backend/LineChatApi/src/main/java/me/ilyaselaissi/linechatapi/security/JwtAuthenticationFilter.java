package me.ilyaselaissi.linechatapi.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import me.ilyaselaissi.linechatapi.exceptions.token.JwtException;
import me.ilyaselaissi.linechatapi.util.TokenGenerator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    AuthenticationManager authenticationManager;
    private final String jwtSecretKey;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, String jwtSecretKey) {
        this.authenticationManager = authenticationManager;
        this.jwtSecretKey = jwtSecretKey;
        setFilterProcessesUrl("/api/v1/account/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        LoginRequest loginRequest = null;
        // Parse the request body as JSON
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            loginRequest = objectMapper.readValue(request.getReader(), LoginRequest.class);
        } catch (IOException e) {
            log.error("Error while parsing login request body");
        }

        // get username and password from the request body
        String username = (loginRequest != null && loginRequest.getUsername() != null) ? loginRequest.getUsername() : "";
        String password = (loginRequest != null && loginRequest.getPassword() != null) ? loginRequest.getPassword() : "";

        // Create an authentication object with the provided credentials
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);

        // Use the authentication manager to authenticate the user
        Authentication authenticatedUser = authenticationManager.authenticate(authentication);

        return authenticatedUser;

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        try {
            // Grab the authenticated user
            UserDetails principal = (UserDetails) authResult.getPrincipal();
            // Create a new JWT
            String jwt = TokenGenerator.generateJwtToken(principal.getUsername(), jwtSecretKey);

            // Add the JWT to the response
            response.addHeader("Authorization", "Bearer " + jwt);
            response.getWriter().write("Authentication successful");
        }catch (Exception e) {
            log.error("Error while generating JWT token");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        if (failed instanceof AuthenticationServiceException) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(failed.getMessage());
            return;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Authentication failed");
    }
}
