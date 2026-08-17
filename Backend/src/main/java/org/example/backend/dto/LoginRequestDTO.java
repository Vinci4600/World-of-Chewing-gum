package org.example.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {


    @NotBlank(message = "Benutzername oder E-Mail darf nicht leer sein")
    private String usernameOrEmail;

    @NotBlank(message = "Passwort darf nicht leer sein")
    private String password;

    /** Standard-Konstruktor für Deserialisierung. */
    public LoginRequestDTO() {
    }

    /**
     * Konstruktor für direkte Erstellung.
     *
     * @param usernameOrEmail E-Mail oder Anzeigename
     * @param password        Klartext-Passwort
     */
    public LoginRequestDTO(String usernameOrEmail, String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }

    /** Getter-Methode */
    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    /** Setter-Methode */
    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    // Alias für getUsernameOrEmail() – Kompatibilität mit bestehendem AppUserService
    /** Getter-Methode */
    public String getEmail() {
        return usernameOrEmail;
    }

    /** Getter-Methode */
    public String getPassword() {
        return password;
    }

    /** Setter-Methode */
    public void setPassword(String password) {
        this.password = password;
    }
}
