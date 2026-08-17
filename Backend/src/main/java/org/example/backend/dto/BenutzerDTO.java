package org.example.backend.dto;

public record BenutzerDTO (
        Long id,
        String benutzername,
        String email,
        String passwort
)

{
}
