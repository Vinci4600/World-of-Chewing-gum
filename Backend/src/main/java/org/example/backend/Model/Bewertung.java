package org.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bewertung")
public class Bewertung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer sterne;

    private Integer geschmackSterne;

    private Integer haltbarkeitSterne;

    private Integer weichheitSterne;

    private Integer preisLeistungSterne;

    private LocalDateTime datum;

    @ManyToOne
    @JoinColumn(name = "benutzer_id")
    private Benutzer benutzer;

    @ManyToOne
    @JoinColumn(name = "kunde_id")
    private Kunde kunde;

    @ManyToOne
    @JoinColumn(name = "kaugummi_id")
    private Kaugummi kaugummi;

    public Bewertung() {
    }

    public Bewertung(Long id, Integer sterne, Integer geschmackSterne, Integer haltbarkeitSterne, Integer weichheitSterne, Integer preisLeistungSterne, LocalDateTime datum) {
        this.id = id;
        this.sterne = sterne;
        this.geschmackSterne = geschmackSterne;
        this.haltbarkeitSterne = haltbarkeitSterne;
        this.weichheitSterne = weichheitSterne;
        this.preisLeistungSterne = preisLeistungSterne;
        this.datum = datum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSterne() {
        return sterne;
    }

    public void setSterne(Integer sterne) {
        this.sterne = sterne;
    }

    public Integer getGeschmackSterne() {
        return geschmackSterne;
    }

    public void setGeschmackSterne(Integer geschmackSterne) {
        this.geschmackSterne = geschmackSterne;
    }

    public Integer getHaltbarkeitSterne() {
        return haltbarkeitSterne;
    }

    public void setHaltbarkeitSterne(Integer haltbarkeitSterne) {
        this.haltbarkeitSterne = haltbarkeitSterne;
    }

    public Integer getWeichheitSterne() {
        return weichheitSterne;
    }

    public void setWeichheitSterne(Integer weichheitSterne) {
        this.weichheitSterne = weichheitSterne;
    }

    public Integer getPreisLeistungSterne() {
        return preisLeistungSterne;
    }

    public void setPreisLeistungSterne(Integer preisLeistungSterne) {
        this.preisLeistungSterne = preisLeistungSterne;
    }

    public LocalDateTime getDatum() {
        return datum;
    }

    public void setDatum(LocalDateTime datum) {
        this.datum = datum;
    }

    public Benutzer getBenutzer() {
        return benutzer;
    }

    public void setBenutzer(Benutzer benutzer) {
        this.benutzer = benutzer;
    }

    public Kunde getKunde() {
        return kunde;
    }

    public void setKunde(Kunde kunde) {
        this.kunde = kunde;
    }

    public Kaugummi getKaugummi() {
        return kaugummi;
    }

    public void setKaugummi(Kaugummi kaugummi) {
        this.kaugummi = kaugummi;
    }
}
