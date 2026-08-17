package org.example.backend.Model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends Benutzer {



    public Admin() {
        super();
        setRole(Role.ADMIN); // Falls Role ein Enum ist, direkt im Konstruktor setzen
    }




    // zusätzliche Eigenschaften des Kunden

}
