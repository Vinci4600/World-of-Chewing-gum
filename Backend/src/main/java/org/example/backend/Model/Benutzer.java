package org.example.backend.Model;
import jakarta.persistence.*;

import java.util.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
    public class Benutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String benutzername;
    private String email;
    private String passwort;

    @Enumerated(EnumType.STRING)
    private Role role;




    @OneToMany(mappedBy = "benutzer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<org.example.backend.model.Kommentar> kommentare = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "benutzer_favoriten",
            joinColumns = @JoinColumn(name = "benutzer_id"),
            inverseJoinColumns = @JoinColumn(name = "kaugummi_id")
    )

    private Set<Kaugummi> favoriten = new HashSet<>();

    public Benutzer(Long id, String benutzername, String email, String passwort, Role role) {
        this.id = id;
        this.benutzername = benutzername;
        this.email = email;
        this.passwort = passwort;
        this.role = role;

    }

    public Benutzer(String username, String email, String hashedPassword, org.example.backend.Model.Role zugewieseneRolle) {
    }

    public Benutzer() {

    }

    public Long getId() {
        return id;
    }

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

    public Role getRole() {
        return role;
    }

    public List<org.example.backend.model.Kommentar> getKommentare() {
        return kommentare;
    }

    public void setKommentare(List<org.example.backend.model.Kommentar> kommentare) {
        this.kommentare = kommentare;
    }

    public Set<Kaugummi> getFavoriten() {
        return favoriten;
    }

    public void setFavoriten(Set<Kaugummi> favoriten) {
        this.favoriten = favoriten;
    }


    public void setRole(org.example.backend.Model.Role role) {
    }
}










