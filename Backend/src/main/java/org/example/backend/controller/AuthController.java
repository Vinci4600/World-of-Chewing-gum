package org.example.backend.controller;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.example.backend.Model.Benutzer;
import org.example.backend.dto.ForgotPasswordRequest;

import org.example.backend.dto.LoginRequestDTO;
import org.example.backend.dto.LoginResponseDTO;
import org.example.backend.dto.RegisterRequestDTO;
import org.example.backend.dto.VerifyCodeRequest;
import org.example.backend.dto.RegisterResponseDTO;
import org.example.backend.service.AppUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.example.backend.service.JwtService;
import org.example.backend.repository.BenutzerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Für React Frontend

public class AuthController {


    public static final String ERROR_TEXT_BEGINNING = "error";

    private final AppUserService appUserService;
    private final JwtService jwtService;
    private final BenutzerRepository benutzerRepository;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, ResetTokenInfo> resetTokenStore = new ConcurrentHashMap<>();

    public AuthController(AppUserService appUserService, JwtService jwtService, BenutzerRepository benutzerRepository, PasswordEncoder passwordEncoder) {
        this.appUserService = appUserService;
        this.jwtService = jwtService;
        this.benutzerRepository = benutzerRepository;
        this.passwordEncoder = passwordEncoder;
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
     * Forgot Password Endpoint: Sendet einen Verifizierungscode an die angegebene E-Mail-Adresse, wenn diese existiert.
     * @param request
     * @return
     */

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        Optional<Benutzer> userOptional = benutzerRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            // Sicherheits-Best-Practice: Keine Information preisgeben, ob die E-Mail existiert
            return ResponseEntity.ok(Map.of("message", "Falls die E-Mail existiert, wurde ein Code gesendet."));
        }

        // 6-stelligen zufälligen Code generieren
        String code = String.format("%06d", new SecureRandom().nextInt(1000000));
        
        // Code für 15 Minuten speichern
        resetTokenStore.put(request.getEmail(), new ResetTokenInfo(code, LocalDateTime.now().plusMinutes(15)));

        // TODO: Hier den E-Mail-Versand (z.B. JavaMailSender) aufrufen
        System.out.println("VERIFIZIERUNGSCODE FÜR " + request.getEmail() + ": " + code);

        return ResponseEntity.ok(Map.of("message", "Ein Verifizierungscode wurde an deine E-Mail gesendet."));
    }


    /**
     * Verify Code Endpoint: Überprüft den Verifizierungscode und setzt das Passwort zurück, wenn der Code korrekt ist.
     * @param request
     * @return
     */
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCodeAndResetPassword(@RequestBody VerifyCodeRequest request) {
        ResetTokenInfo tokenInfo = resetTokenStore.get(request.getEmail());

        // Prüfen, ob für die E-Mail ein Code angefordert wurde
        if (tokenInfo == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Kein Verifizierungscode für diese E-Mail gefunden."));
        }

        // Prüfen, ob der Code abgelaufen ist
        if (LocalDateTime.now().isAfter(tokenInfo.getExpirationTime())) {
            resetTokenStore.remove(request.getEmail());
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Der Verifizierungscode ist abgelaufen. Bitte neu anfordern."));
        }

        // Prüfen, ob der Code übereinstimmt
        if (!tokenInfo.getCode().equals(request.getCode())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ungültiger Verifizierungscode."));
        }

        // Benutzer finden und Passwort aktualisieren
        Optional<Benutzer> userOptional = benutzerRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Benutzer nicht gefunden."));
        }

        Benutzer user = userOptional.get();
        user.setPasswort(passwordEncoder.encode(request.getNewPassword()));
        benutzerRepository.save(user);

        // Code nach erfolgreichem Reset löschen
        resetTokenStore.remove(request.getEmail());

        return ResponseEntity.ok(Map.of("message", "Passwort erfolgreich geändert."));
    }

    /**
     * Hilfsklasse, um den Verifizierungscode und dessen Ablaufzeit zu speichern.
     * ResetTokenInfo
     */
    private static class ResetTokenInfo {
        private final String code;
        private final LocalDateTime expirationTime;

        public ResetTokenInfo(String code, LocalDateTime expirationTime) {
            this.code = code;
            this.expirationTime = expirationTime;
        }

        public String getCode() { return code; }

        public LocalDateTime getExpirationTime() {
            return expirationTime;
        }

		@Override
		public String toString() {
			return "ResetTokenInfo [code=" + code + ", expirationTime=" + expirationTime + ", getClass()=" + getClass()
					+ ", getCode()=" + getCode() + ", getExpirationTime()=" + getExpirationTime() + "]";
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
            response.put("role", user != null ? user.getRole().toString() : "USER");

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
