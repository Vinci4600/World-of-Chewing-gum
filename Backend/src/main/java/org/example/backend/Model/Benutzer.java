package org.example.backend.Model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "benutzer")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public abstract class Benutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String benutzername;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwort;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private org.example.backend.model.Role role;


    @OneToMany(mappedBy = "benutzer", cascade = CascadeType.ALL)
    private List<org.example.backend.Model.Kommentar> kommentare;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "benutzer_favoriten",
            joinColumns = @JoinColumn(name = "benutzer_id"),
            inverseJoinColumns = @JoinColumn(name = "kaugummi_id")
    )
    private List<org.example.backend.Model.Kaugummi> favoriten;

    protected Benutzer() {
    }

    public Benutzer(Long id, String benutzername, String email, String passwort, org.example.backend.model.Role role) {
        this.id = id;
        this.benutzername = benutzername;
        this.email = email;
        this.passwort = passwort;
        this.role = role;
    }

    public Long getId() {
        return id;
    }


// In der Klasse User.java:

    // Kaugummi zu den eigenen Favoriten hinzufügen

    public void setId(Long id) {
        this.id = id;
    }

    public String getBenutzername() {
        return benutzername;
    }

    public void setBenutzername(String benutzername) {
        this.benutzername = benutzername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswort() {
        return passwort;
    }

    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }

    public org.example.backend.model.Role getRole() {
        return role;
    }

    public void setRole(org.example.backend.model.Role role) {
        this.role = role;
    }

    public List<org.example.backend.Model.Kommentar> getKommentare() {
        return kommentare;
    }

    public void setKommentare(List<org.example.backend.Model.Kommentar> kommentare) {
        this.kommentare = kommentare;
    }

    public List<org.example.backend.Model.Kaugummi> getFavoriten() {
        return favoriten;
    }

    public void setFavoriten(List<org.example.backend.Model.Kaugummi> favoriten) {
        this.favoriten = favoriten;
    }
}
