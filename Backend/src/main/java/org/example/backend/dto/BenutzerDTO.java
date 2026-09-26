package org.example.backend.dto;

public record BenutzerDTO (
        Long id,
        String benutzername,
        String email,
        org.example.backend.Model.Role role
)

{
}
