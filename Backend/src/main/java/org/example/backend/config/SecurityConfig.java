  package org.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth

                        // Registrierung und Login
                        .requestMatchers(
                                "/register",
                                "/login",
                                "/api/auth/**"
                        ).permitAll()

                        // Kaugummis ansehen
                        // GET /api/kaugummi/all
                        // GET /api/kaugummi/1
                        // GET /api/kaugummi/2
                        .requestMatchers(
                                "/api/kaugummi/all",
                                "/api/kaugummi/*",
                                "/api/kaugummi/add"
                        ).permitAll()

                        // ALLES andere benötigt Login
                        .anyRequest().authenticated()
                )

                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
}

