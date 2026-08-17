package org.example.backend.service;

import org.example.backend.Model.Kaugummi;
import org.example.backend.model.Kommentar;
import org.example.backend.repository.KaugummiRepository;
import org.example.backend.repository.Kommentarrepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {
    private final KaugummiRepository kaugummiRepository;
    private final Kommentarrepository kommentarRepository;

    public AdminService(KaugummiRepository kaugummiRepository, Kommentarrepository kommentarRepository) {
        this.kaugummiRepository = kaugummiRepository;
        this.kommentarRepository = kommentarRepository;
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
    public void kommentarLoeschen(Long kommentarId) {
        kommentarRepository.deleteById(kommentarId);
    }
}
