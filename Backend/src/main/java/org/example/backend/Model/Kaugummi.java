package org.example.backend.Model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "kaugummi")
public class Kaugummi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private String imageUrl;

    private String marke;

    private String geschmack;

    private Boolean zuckerfrei;

    @Column(length = 2000)
    private String inhaltsstoffe;

    private String shopUrl;
    private String herstellungsland;
    private String nebenwirkungen;

    // Ein Kaugummi kann mehrere Bewertungen haben
    @OneToMany(
            mappedBy = "kaugummi",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Bewertung> bewertungen = new ArrayList<>();

    // Viele Benutzer können einen Kaugummi favorisieren
    @ManyToMany(mappedBy = "favoriten")
    private Set<Benutzer> favorisiertVon = new HashSet<>();


    // Standard-Konstruktor für JPA
    public Kaugummi() {
    }

    // Konstruktor
    public Kaugummi(
            Long id,
            String name,
            String imageUrl,
            String marke,
            String geschmack,
            Boolean zuckerfrei,
            String inhaltsstoffe,
            String shopUrl,
            String herstellungsland,
            String nebenwirkungen
    ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.marke = marke;
        this.geschmack = geschmack;
        this.zuckerfrei = zuckerfrei;
        this.inhaltsstoffe = inhaltsstoffe;
        this.shopUrl = shopUrl;
        this.herstellungsland = herstellungsland;
        this.nebenwirkungen = nebenwirkungen;
    }


    // Getter und Setter

    public String getNebenwirkungen() {
        return nebenwirkungen;
    }

    public void setNebenwirkungen(String nebenwirkungen) {
        this.nebenwirkungen = nebenwirkungen;
    }

    public String getHerstellungsland() {
        return herstellungsland;
    }

    public void setHerstellungsland(String herstellungsland) {
        this.herstellungsland = herstellungsland;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public String getMarke() {
        return marke;
    }

    public void setMarke(String marke) {
        this.marke = marke;
    }


    public String getGeschmack() {
        return geschmack;
    }

    public void setGeschmack(String geschmack) {
        this.geschmack = geschmack;
    }


    public Boolean getZuckerfrei() {
        return zuckerfrei;
    }

    public void setZuckerfrei(Boolean zuckerfrei) {
        this.zuckerfrei = zuckerfrei;
    }


    public String getInhaltsstoffe() {
        return inhaltsstoffe;
    }

    public void setInhaltsstoffe(String inhaltsstoffe) {
        this.inhaltsstoffe = inhaltsstoffe;
    }


    public String getShopUrl() {
        return shopUrl;
    }

    public void setShopUrl(String shopUrl) {
        this.shopUrl = shopUrl;
    }


    public List<Bewertung> getBewertungen() {
        return bewertungen;
    }

    public void setBewertungen(List<Bewertung> bewertungen) {
        this.bewertungen = bewertungen;
    }


    public Set<Benutzer> getFavorisiertVon() {
        return favorisiertVon;
    }

    public void setFavorisiertVon(Set<Benutzer> favorisiertVon) {
        this.favorisiertVon = favorisiertVon;
    }


    // Benutzer als Favorit hinzufügen
    public void addFavorisiertVon(Benutzer user) {
        this.favorisiertVon.add(user);
        user.getFavoriten().add(this);
    }


    // Benutzer aus Favoriten entfernen
    public void removeFavorisiertVon(Benutzer user) {
        this.favorisiertVon.remove(user);
        user.getFavoriten().remove(this);
    }
}