package org.example.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends Benutzer {
    
    protected Admin() {
        super();
    }

    public Admin(Long id, String benutzername, String email, String passwort, Role role) {
        super(id, benutzername, email, passwort, role);
    }
}
