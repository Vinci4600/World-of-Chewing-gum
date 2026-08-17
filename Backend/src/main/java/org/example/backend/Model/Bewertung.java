package org.example.backend.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bewertung")
public class Bewertung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int sterne;

    private int geschmackSterne;
    private int haltbarkeitSterne;
    private int weichheitSterne;
    private int preisLeistungSterne;


    @Column(nullable = false)
    private LocalDateTime datum;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kunde_id", nullable = false)
    private Kunde kunde;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kaugummi_id", nullable = false)
    private Kaugummi kaugummi;


    public Bewertung() {
    }

    public Bewertung(Long id, int sterne, int geschmackSterne, int haltbarkeitSterne, int weichheitSterne, int preisLeistungSterne,  LocalDateTime datum) {
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
    public int getSterne() {
        return sterne;
    }
    public void setSterne(int sterne) {
        this.sterne = sterne;
    }

    public int getGeschmackSterne() {
        return geschmackSterne;
    }

    public void setGeschmackSterne(int geschmackSterne) {
        this.geschmackSterne = geschmackSterne;
    }

    public int getHaltbarkeitSterne() {
        return haltbarkeitSterne;
    }

    public void setHaltbarkeitSterne(int haltbarkeitSterne) {
        this.haltbarkeitSterne = haltbarkeitSterne;
    }

    public int getWeichheitSterne() {
        return weichheitSterne;
    }

    public void setWeichheitSterne(int weichheitSterne) {
        this.weichheitSterne = weichheitSterne;
    }

    public int getPreisLeistungSterne() {
        return preisLeistungSterne;
    }

    public void setPreisLeistungSterne(int preisLeistungSterne) {
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

    @Override
    public String toString() {
        return "Bewertung{" +
                "id=" + id +
                ", sterne=" + sterne +
                ", geschmackSterne=" + geschmackSterne +
                ", haltbarkeitSterne=" + haltbarkeitSterne +
                ", weichheitSterne=" + weichheitSterne +
                ", preisLeistungSterne=" + preisLeistungSterne +
                ", datum=" + datum +
                ", benutzer=" + benutzer +
                ", kunde=" + kunde +
                ", kaugummi=" + kaugummi +
                '}';
    }
}
