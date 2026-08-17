package org.example.backend.service;

import org.example.backend.model.Benutzer;
import org.example.backend.model.Kunde;
import org.example.backend.model.Role;
import org.example.backend.dto.LoginRequestDTO;
import org.example.backend.dto.RegisterRequestDTO;
import org.example.backend.repository.BenutzerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AppUserService {

    private final BenutzerRepository benutzerRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(BenutzerRepository benutzerRepository, PasswordEncoder passwordEncoder) {
        this.benutzerRepository = benutzerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registriert einen neuen Benutzer und speichert das Passwort gehasht.
     */


    @Transactional
    public Benutzer login(LoginRequestDTO dto) {
        // 1. Benutzer suchen
        Benutzer user = benutzerRepository.findByBenutzernameOrEmail(dto.getUsernameOrEmail(), dto.getUsernameOrEmail())
                .orElseThrow(() -> new IllegalArgumentException("Ungültige Anmeldedaten"));

        // 2. Passwort prüfen (Klartext aus DTO, Hash aus der DB)
        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswort())) {
            throw new IllegalArgumentException("Ungültige Anmeldedaten");
        }

        return user;
    }

    @Transactional
    public Benutzer registrieren(RegisterRequestDTO dto) {

        if (benutzerRepository.existsByBenutzername(dto.getUsername())) {
            throw new IllegalArgumentException("Benutzername ist bereits vergeben!");
        }

        if (benutzerRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("E-Mail ist bereits vergeben!");
        }
        // 1. Echte Instanz erstellen (ohne {{ ... }})
        Kunde user = new Kunde();
        user.setBenutzername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPasswort(passwordEncoder.encode(dto.getPassword()));

        // 2. Echte User-Instanz speichern
        return benutzerRepository.save(user);


    }

    @Transactional
    public Optional<Benutzer> findByUsernameOrEmail(String usernameOrEmail) {
        return benutzerRepository.findByBenutzernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    @Transactional(readOnly = true)
    public Optional<Benutzer> findByBenutzername(String username) {
        return benutzerRepository.findByBenutzername(username);
    }

    @Transactional(readOnly = true)
    public Optional<Benutzer> findByEmail(String email) {
        return benutzerRepository.findByEmail(email);
    }

    /**
     * Prüft das rohe Passwort gegen den BCrypt-Hash aus der Datenbank.
     */
    public Optional<Benutzer> authenticateUser(Benutzer user, String rawPassword) {
        if (passwordEncoder.matches(rawPassword, user.getPasswort())) {
            return Optional.of(user);
        }
        return Optional.empty();
    }



}
