package org.example.backend.Model;

import org.example.backend.Model.Role;
import org.example.backend.Model.Benutzer;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("KUNDE")

public class Kunde extends Benutzer {
    // zusätzliche Eigenschaften des Kunden

    private String kundennummer;

    public Kunde() {
        super();
    }

    public Kunde(String username, String email, String hashedPassword, Role zugewieseneRolle, String kundennummer) {
        super(username, email, hashedPassword, zugewieseneRolle);
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