package org.example.backend.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record KommentarRequestDTO (
        @NotBlank(message = "Kommentar darf nicht leer sein")
        @Size(max = 1000, message = "Kommentar darf maximal 1000 Zeichen lang sein")
        String text
) {
}


