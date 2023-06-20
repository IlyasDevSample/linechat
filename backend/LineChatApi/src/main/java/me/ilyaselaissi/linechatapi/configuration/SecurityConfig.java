package me.ilyaselaissi.linechatapi.configuration;

import me.ilyaselaissi.linechatapi.repository.UserRepository;
import me.ilyaselaissi.linechatapi.security.JwtAuthenticationFilter;
import me.ilyaselaissi.linechatapi.security.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.DefaultAuthenticationEventPublisher;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${app.jwt-secret-key}")
    private String jwtSecretKey;

    @Value("${app.frontend-url}")
    private String FRONTEND_URL;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final UserRepository userRepository;
    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, UserRepository userRepository) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), jwtSecretKey))
                .addFilterBefore(new JwtAuthorizationFilter(userRepository, jwtSecretKey), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/account/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(403);
                    response.getWriter().write("Access Denied");
                })
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(401);
                    response.getWriter().write("Unauthorized Access");
                })


        ;
        return http.build();
    }
    @Bean
    DefaultAuthenticationEventPublisher defaultAuthenticationEventPublisher(ApplicationEventPublisher delegate) {
        return new DefaultAuthenticationEventPublisher(delegate);
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(FRONTEND_URL));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);



        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
