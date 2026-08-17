package org.example.backend.model;

import org.example.backend.model.Benutzer;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends Benutzer {
    public Admin(Long id, String benutzername, String email, String passwort, Role role) {
        super(id, benutzername, email, passwort, role);
    }

    public Admin() {
        super();
        setRole(Role.ADMIN); // Falls Role ein Enum ist, direkt im Konstruktor setzen
    }




    // zusätzliche Eigenschaften des Kunden

}
