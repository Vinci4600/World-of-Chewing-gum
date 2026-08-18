package org.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Kunde")
public class Kunde extends Benutzer {
    @Column(unique = true)
    private String kundennummer;

    public Kunde() {
        super();
    }

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
}
