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
