package org.example.backend.model;
import jakarta.persistence.*;
@Entity
@Table(name = "kaugummis")
public class Kaugummi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "filmgenre_id") // die tatsächliche Spalte in der DB
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

    //Getter und Setter


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

    public String getZuckerfrei() {
        return zuckerfrei;
    }

    public void setZuckerfrei(String zuckerfrei) {
        this.zuckerfrei = zuckerfrei;
    }
}
