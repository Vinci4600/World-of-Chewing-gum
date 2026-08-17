package org.example.backend.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "kaugummis")
public class Kaugummi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "name")
    private String name;
    @Column(name = "imageUrl")
    private String imageUrl;
    @Column(name = "marke")
    private String marke;
    @Column(name = "geschmack")
    private String geschmack;
    @Column(name = "zuckerfrei")
    private String zuckerfrei;


    @ManyToMany(mappedBy = "favoriten")
    @JsonIgnore
    private Set<Benutzer> favorisiertVon = new HashSet<>();
    //Getter und Setter

    public  Kaugummi() {

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

    public Set<Benutzer> getFavorisiertVon() {
        return favorisiertVon;
    }

    public void setFavorisiertVon(Set<Benutzer> favorisiertVon) {
        this.favorisiertVon = favorisiertVon;
    }

    public String getGeschmack() {
        return geschmack;
    }

    public void setGeschmack(String geschmack) {
        this.geschmack = geschmack;
    }

    public String getZuckerfrei() {
        return zuckerfrei;
    }

    public void setZuckerfrei(String zuckerfrei) {
        this.zuckerfrei = zuckerfrei;
    }


}
