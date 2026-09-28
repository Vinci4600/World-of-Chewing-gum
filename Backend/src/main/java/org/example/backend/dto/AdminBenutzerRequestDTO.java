package org.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.backend.Model.Role;

public record AdminBenutzerRequestDTO(
        @NotBlank(message = "Benutzername darf nicht leer sein")
        @Size(min = 3, max = 50, message = "Benutzername muss zwischen 3 und 50 Zeichen lang sein")
        String username,

        @NotBlank(message = "E-Mail darf nicht leer sein")
        @Email(message = "Ungültige E-Mail-Adresse")
        String email,

        @NotBlank(message = "Passwort darf nicht leer sein")
        @Size(min = 6, message = "Passwort muss mindestens 6 Zeichen lang sein")
        String password,

        @NotNull(message = "Rolle ist erforderlich")
        Role role
) {
}
