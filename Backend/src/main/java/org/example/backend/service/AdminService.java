package org.example.backend.service;

<<<<<<< HEAD
import jakarta.persistence.EntityNotFoundException;
import org.example.backend.Model.Benutzer;
import org.example.backend.Model.Kaugummi;
||||||| 248477e
import org.example.backend.Model.Kaugummi;
=======
import org.example.backend.model.Kaugummi;
>>>>>>> 3488a3369dffc11db7640f3a70cbdd394ee35cc9
import org.example.backend.model.Kommentar;
import org.example.backend.repository.BenutzerRepository;
import org.example.backend.repository.KaugummiRepository;
import org.example.backend.repository.Kommentarrepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {
    private final KaugummiRepository kaugummiRepository;
    private final Kommentarrepository kommentarRepository;
    private final BenutzerRepository benutzerRepository;

    public AdminService(KaugummiRepository kaugummiRepository, Kommentarrepository kommentarRepository,BenutzerRepository benutzerRepository) {
        this.kaugummiRepository = kaugummiRepository;
        this.kommentarRepository = kommentarRepository;
        this.benutzerRepository = benutzerRepository;
    }


    @Transactional(readOnly = true)
    public Kaugummi kaugummianzeigen(Long id) {
        return kaugummiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kaugummi mit ID " + id + " nicht gefunden"));
    }

    @Transactional
    public Kaugummi kaugummiErstellen(Kaugummi kaugummiData) {
        return kaugummiRepository.save(kaugummiData);
    }

    @Transactional
    public Kaugummi kaugummiBearbeiten(Long id, Kaugummi kaugummiData) {
        var existing = kaugummiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kaugummi nicht gefunden"));

        existing.setName(kaugummiData.getName());
        existing.setMarke(kaugummiData.getMarke());
        existing.setGeschmack(kaugummiData.getGeschmack());
        existing.setZuckerfrei(kaugummiData.getZuckerfrei());
        existing.setImageUrl(kaugummiData.getImageUrl());

        return kaugummiRepository.save(existing);
    }

    @Transactional
    public void kaugummiLoeschen(Long id) {
        kaugummiRepository.deleteById(id);
    }
    @Transactional
    public Kommentar updateKommentar(Long id, String neuerText) {
        Kommentar kommentar = kommentarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kommentar nicht gefunden"));

        kommentar.setText(neuerText);
        return kommentarRepository.save(kommentar);
        // Speichert die Änderung
    }






    @Transactional
    public Kommentar kommentarHinzufuegen(Long kaugummiId, Long benutzerId, String text) {
        // 1. Kaugummi & Benutzer aus der Datenbank laden
        Kaugummi kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new EntityNotFoundException("Kaugummi nicht gefunden mit ID: " + kaugummiId));

        Benutzer benutzer = benutzerRepository.findById(benutzerId)
                .orElseThrow(() -> new EntityNotFoundException("Benutzer nicht gefunden mit ID: " + benutzerId));

        // 2. Neuen Kommentar erstellen und Verknüpfungen setzen
        Kommentar kommentar = new Kommentar();
        kommentar.setText(text);
        kommentar.setBenutzer(benutzer);

        // 3. Speichern und zurückgeben
        return kommentarRepository.save(kommentar);
    }

    @Transactional
    public Kommentar kommentarBearbeitenUndSpeichern(Long kommentarId, Long benutzerId, String neuerText) {
        Kommentar kommentar = kommentarRepository.findById(kommentarId)
                .orElseThrow(() -> new EntityNotFoundException("Kommentar nicht gefunden"));

        kommentar.setText(neuerText);
        kommentarRepository.save(kommentar); // Speichert die aktualisierte Entität
        return kommentar;
    }


    @Transactional
    public void kommentarLoeschen(Long kommentarId) {
        kommentarRepository.deleteById(kommentarId);
    }
}
