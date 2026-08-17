package org.example.backend.model;

import jakarta.persistence.*;
import org.example.backend.Model.Benutzer;
import org.example.backend.Model.Kaugummi;

import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name="kommentar")
public class Kommentar {

    // Einzelner Kommentar
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;


    @ManyToOne
    @JoinColumn(name = "benutzer_id")
    private Benutzer benutzer;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "parent_kommentar_id")


    private List<Kommentar> kommentare = new ArrayList<>();

    public Kommentar(Long id, String text, Benutzer benutzer) {
        this.id = id;
        this.text = text;
        this.benutzer = benutzer;
    }

    public Kommentar(String text, Benutzer benutzer, Kaugummi kaugummi) {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Benutzer getBenutzer() {
        return benutzer;
    }

    public void setBenutzer(Benutzer benutzer) {
        this.benutzer = benutzer;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Kommentar> getKommentare() {
        return kommentare;
    }

    public void setKommentare(List<Kommentar> kommentare) {
        this.kommentare = kommentare;
    }

    @Override
    public String toString() {
        return "Kommentar{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", benutzer=" + benutzer +
                ", kommentare=" + kommentare +
                '}';
    }
}
