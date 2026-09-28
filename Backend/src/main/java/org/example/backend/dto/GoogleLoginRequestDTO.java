package org.example.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class GoogleLoginRequestDTO {
    @NotBlank
    private String token;

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}