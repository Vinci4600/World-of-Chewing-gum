package org.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "kommentar")
public class Kommentar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String text;

    @ManyToOne
    @JoinColumn(name = "benutzer_id")
    private Benutzer benutzer;

    @ManyToOne
    @JoinColumn(name = "kaugummi_id")
    private Kaugummi kaugummi;

    public Kommentar() {
    }

    public Kommentar(Long id, String text, Benutzer benutzer, Kaugummi kaugummi) {
        this.id = id;
        this.text = text;
        this.benutzer = benutzer;
        this.kaugummi = kaugummi;
    }

<<<<<<< HEAD
    public Kommentar(String text, Benutzer benutzer, Kaugummi kaugummi) {
    }

    public Kommentar() {

    }


||||||| 248477e
    public Kommentar(String text, Benutzer benutzer, Kaugummi kaugummi) {
    }



=======
>>>>>>> 3488a3369dffc11db7640f3a70cbdd394ee35cc9
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Benutzer getBenutzer() {
        return benutzer;
    }

    public void setBenutzer(Benutzer benutzer) {
        this.benutzer = benutzer;
    }

    public Kaugummi getKaugummi() {
        return kaugummi;
    }

    public void setKaugummi(Kaugummi kaugummi) {
        this.kaugummi = kaugummi;
    }
}
