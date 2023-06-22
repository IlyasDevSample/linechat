package me.ilyaselaissi.linechatapi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.repository.UserRepository;
import me.ilyaselaissi.linechatapi.util.TokenGenerator;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;
    private final String jwtSecretKey;

    public JwtAuthorizationFilter(UserRepository userRepository, String jwtSecretKey) {
        this.userRepository = userRepository;
        this.jwtSecretKey = jwtSecretKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // get the authorization header token from the request
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            // get the token from the query parameter for websocket connection
            authorizationHeader = request.getParameter("token");
        }
        // check if the authorization header is null or not
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication = getUsernamePasswordAuthentication(authorizationHeader);
        // set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);

    }

    private Authentication getUsernamePasswordAuthentication(String authorizationHeader) {

        try {
            String token = authorizationHeader.replace("Bearer ", "");
            Claims claims = TokenGenerator.parseJwtToken(token, jwtSecretKey);
            String username = claims.getSubject();
            if (username == null) {
                return null;
            }
            User user = userRepository.findByUsername(username);
            if (user == null) {
                return null;
            }
            UserDetails userDetails = new UserDetailsImpl(user);

            // Create an instance of UsernamePasswordAuthenticationToken with the user details and empty authorities
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        } catch (Exception e) {
            return null;
        }
    }
}
