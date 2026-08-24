package org.example.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "kaugummi")
public class Kaugummi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String imageUrl;

    private String marke;

    private String geschmack;

    private Boolean zuckerfrei;

    private String inhaltsstoffe;
// Ein Kaugummi kann mehrere Bewertungen haben
    @OneToMany(mappedBy = "kaugummi", cascade = CascadeType.ALL)
    private List<Bewertung> bewertungen;
// Viele Kaugummis können viele Favoriten haben
    @ManyToMany(mappedBy = "favoriten")
    private List<Benutzer> favorisiertVon;

    public Kaugummi() {
    }

    public Kaugummi(Long id, String name, String imageUrl, String marke, String geschmack, Boolean zuckerfrei) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.marke = marke;
        this.geschmack = geschmack;
        this.zuckerfrei = zuckerfrei;
    }
// Getter und Setter
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

    public List<Bewertung> getBewertungen() {
        return bewertungen;
    }

    public void setBewertungen(List<Bewertung> bewertungen) {
        this.bewertungen = bewertungen;
    }

    public List<Benutzer> getFavorisiertVon() {
        return favorisiertVon;
    }

    public void setFavorisiertVon(List<Benutzer> favorisiertVon) {
        this.favorisiertVon = favorisiertVon;
    }
}
