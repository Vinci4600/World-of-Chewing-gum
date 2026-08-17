package org.example.backend.service;

import org.example.backend.Model.Bewertung;
import org.example.backend.Model.Kaugummi;
import org.example.backend.Model.Kommentar;
import org.example.backend.repository.BenutzerRepository;
import org.example.backend.repository.BewertungRepository;
import org.example.backend.repository.KaugummiRepository;
import org.example.backend.repository.Kommentarrepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class KaugummiService {


    private final KaugummiRepository kaugummiRepository;
    private final BewertungRepository bewertungRepository;
    private final Kommentarrepository kommentarRepository;
    private final BenutzerRepository benutzerRepository;

    public KaugummiService(KaugummiRepository kaugummiRepository,
                           BewertungRepository bewertungRepository,
                           Kommentarrepository kommentarRepository,
                           BenutzerRepository benutzerRepository) {
        this.kaugummiRepository = kaugummiRepository;
        this.bewertungRepository = bewertungRepository;
        this.kommentarRepository = kommentarRepository;
        this.benutzerRepository = benutzerRepository;
    }

    @Transactional
    public Bewertung bewertungAbgeben(Long kaugummiId, Long benutzerId, Bewertung bewertungData) {
        var kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new RuntimeException("Kaugummi nicht gefunden"));
        var benutzer = benutzerRepository.findById(benutzerId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        bewertungData.setKaugummi(kaugummi);
        bewertungData.setBenutzer(benutzer);
        return bewertungRepository.save(bewertungData);
    }

    @Transactional
    public Kommentar kommentarHinzufuegen(Long kaugummiId, Long benutzerId, String text) {
        var kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new RuntimeException("Kaugummi nicht gefunden"));
        var benutzer = benutzerRepository.findById(benutzerId)
                .orElseThrow(() -> new RuntimeException("Benutzer wurde  nicht gefunden"));

        Kommentar kommentar = new Kommentar(text, benutzer, kaugummi);
        return kommentarRepository.save(kommentar);
    }

    @Transactional
    public void favoritHinzufuegen(Long kaugummiId, Long benutzerId) {
        var benutzer = benutzerRepository.findById(benutzerId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
        var kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new RuntimeException("Kaugummi nicht gefunden"));

        // Prüfung: Ist das Kaugummi bereits in den Favoriten?
        if (benutzer.getFavoriten().contains(kaugummi)) {
            throw new RuntimeException("Kaugummi ist bereits in den Favoriten enthalten");
        }

        benutzer.getFavoriten().add(kaugummi);
        benutzerRepository.save(benutzer);
    }


    @Transactional(readOnly = true)
    public List<Kaugummi> alleKaugummisAnzeigen() {
        return kaugummiRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Kaugummi kaugummiAnzeigen(Long id) {
        return kaugummiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kaugummi mit ID " + id + " nicht gefunden"));
    }

    @Transactional
    public void favoritEntfernen(Long kaugummiId, Long benutzerId) {
        var benutzer = benutzerRepository.findById(benutzerId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));
        var kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new RuntimeException("Kaugummi nicht gefunden"));

        // Prüfung: Ist das Kaugummi überhaupt in den Favoriten vorhanden?
        if (!benutzer.getFavoriten().contains(kaugummi)) {
            throw new RuntimeException("Kaugummi ist nicht in den Favoriten vorhanden");
        }

        benutzer.getFavoriten().remove(kaugummi);
        benutzerRepository.save(benutzer);
    }

}
