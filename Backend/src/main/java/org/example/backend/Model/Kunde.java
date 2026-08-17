package org.example.backend.Model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("KUNDE")

public class Kunde extends Benutzer {
    // zusätzliche Eigenschaften des Kunden

    private String kundennummer;

    public Kunde(Long id, String benutzername, String email, String passwort, Role role, String kundennummer) {
        super(id, benutzername, email, passwort, role);
        this.kundennummer = kundennummer;
    }

    public String getKundennummer() {
        return kundennummer;
    }

    public void setKundennummer(String kundennummer) {
        this.kundennummer = kundennummer;
    }

    @Override
    public String toString() {
        return "Kunde{" +
                "kundennummer='" + kundennummer + '\'' +
                '}';
    }
}