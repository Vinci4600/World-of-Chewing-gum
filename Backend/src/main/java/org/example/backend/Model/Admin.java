package org.example.backend.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends Benutzer {
    
    protected Admin() {
        super();
    }

    public Admin(Long id, String benutzername, String email, String passwort, org.example.backend.model.Role role) {
        super(id, benutzername, email, passwort, role);
    }
}
