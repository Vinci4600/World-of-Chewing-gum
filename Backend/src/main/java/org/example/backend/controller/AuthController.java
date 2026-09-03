package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.Model.Benutzer;
import org.example.backend.dto.LoginRequestDTO;
import org.example.backend.dto.LoginResponseDTO;
import org.example.backend.dto.RegisterRequestDTO;
import org.example.backend.dto.RegisterResponseDTO;
import org.example.backend.service.AppUserService;
import org.example.backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Für React Frontend

public class AuthController {


    public static final String ERROR_TEXT_BEGINNING = "error";

    private final AppUserService appUserService;
    private final JwtService jwtService;

    public AuthController(AppUserService appUserService, JwtService jwtService) {
        this.appUserService = appUserService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO dto) {
        try {
            // Übergebe das gesamte DTO-Objekt an den Service
            Benutzer neuerBenutzer = appUserService.registrieren(dto);

            // Verwende den 4-teiligen Konstruktor deines RegisterResponseDTO
            RegisterResponseDTO response = new RegisterResponseDTO(
                    neuerBenutzer.getId(),
                    neuerBenutzer.getBenutzername(),
                    neuerBenutzer.getEmail(),
                    "Benutzer erfolgreich registriert"
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Fehler bei der Registrierung: " + e.getMessage());
        }
    }


    /**
     * Login noch verbessern  mit Benutzer Entity
     * @param request
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            Optional<Benutzer> userOpt = appUserService.findByUsernameOrEmail(request.getUsernameOrEmail());

            if (userOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(ERROR_TEXT_BEGINNING, "Ungültige Anmeldedaten"));
            }

            Benutzer user = userOpt.get();

            Optional<Benutzer> authenticatedUser = appUserService.authenticateUser(user, request.getPassword());

            if (authenticatedUser.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(ERROR_TEXT_BEGINNING, "Ungültige Anmeldedaten"));
            }

            String roleName = user.getRole() != null ? user.getRole().toString() : "USER";

            String token = jwtService.generateToken(
                    user.getBenutzername(),
                    "ROLE_" + roleName
            );

            LoginResponseDTO response = new LoginResponseDTO(
                    token,
                    user.getId(),
                    user.getBenutzername(),
                    user.getEmail(),
                    roleName,
                    86400000L
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(ERROR_TEXT_BEGINNING, "Ein Fehler ist aufgetreten: " + e.getMessage()));
        }


    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(ERROR_TEXT_BEGINNING, "Fehlender oder ungültiger Token Header"));
            }

            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);

            if (username == null || !jwtService.validateToken(token, username)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(ERROR_TEXT_BEGINNING, "Token abgelaufen oder ungültig"));
            }

            Optional<Benutzer> userOpt = appUserService.findByUsernameOrEmail(username);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of(ERROR_TEXT_BEGINNING, "Benutzer nicht gefunden"));
            }

            Benutzer user = userOpt.get();

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getBenutzername());
            response.put("email", user.getEmail());
            response.put("role", user != null ? user.getBenutzername(): "USER");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(ERROR_TEXT_BEGINNING, "Fehler beim Abrufen des Profils: " + e.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth Controller funktioniert!");
    }

}
