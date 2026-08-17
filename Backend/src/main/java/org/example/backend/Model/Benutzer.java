package org.example.backend.model;
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
    private List<Kommentar> kommentare = new ArrayList<>();

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



    protected Benutzer() {
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

    public Role getRole() {
        return role;
    }


    public Set<Kaugummi> getFavoriten() {
        return favoriten;
    }

    public void setFavoriten(Set<Kaugummi> favoriten) {
        this.favoriten = favoriten;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }

    @Override
    public String toString() {
        return "Benutzer{" +
                "id=" + id +
                ", benutzername='" + benutzername + '\'' +
                ", email='" + email + '\'' +
                ", passwort='" + passwort + '\'' +
                ", role=" + role +
                ", favoriten=" + favoriten +
                '}';
    }
}










