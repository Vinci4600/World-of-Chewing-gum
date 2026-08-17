package org.example.backend.service;

import org.example.backend.Model.AppUser;
import org.example.backend.Model.Role;
import org.example.backend.repository.BenutzerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final BenutzerRepository benutzerRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserDetailsService(BenutzerRepository benutzerRepository, PasswordEncoder passwordEncoder) {
        this.benutzerRepository = benutzerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser registrieren(String username, String email, String rawPassword, Role rolle) {
        if (benutzerRepository.existsByBenutzername(username)) {
            throw new IllegalArgumentException("Benutzername '" + username + "' ist bereits vergeben");
        }

        if (benutzerRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("E-Mail '" + email + "' ist bereits registriert");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);
        Role zugewieseneRolle = (rolle != null) ? rolle : Role.User;

        // Normales Objekt erstellen – OHNE anonyme Overrides
        AppUser newUser = new AppUser(username, email, hashedPassword, zugewieseneRolle);

        return benutzerRepository.save(newUser);
    }

    public Optional<AppUser> findByUsernameOrEmail(String usernameOrEmail) {
        return benutzerRepository.findByBenutzernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    public Optional<AppUser> authenticateUser(AppUser user, String rawPassword) {
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public Optional<AppUser> findByBenutzername(String username) {
        return benutzerRepository.findByBenutzername(username);
    }

    public Optional<AppUser> findByEmail(String email) {
        return benutzerRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        return benutzerRepository.findByBenutzernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User mit Username/E-Mail nicht gefunden: " + usernameOrEmail));
    }
}