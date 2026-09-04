package org.example.backend.service;

import org.example.backend.model.Bewertung;
import org.example.backend.model.Kaugummi;
import org.example.backend.model.Kommentar;
import org.example.backend.repository.BenutzerRepository;
import org.example.backend.repository.BewertungRepository;
import org.example.backend.repository.KaugummiRepository;
import org.example.backend.repository.Kommentarrepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.example.backend.dto.KaugummiDTO;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

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
                .orElseThrow(() -> new RuntimeException("Benutzer wurde nicht gefunden"));

        Kommentar kommentar = new Kommentar();
        kommentar.setText(text);
        kommentar.setBenutzer(benutzer);
        kommentar.setKaugummi(kaugummi);
        return kommentarRepository.save(kommentar);
    }
    public boolean existsById(Long id) {
        return kaugummiRepository.existsById(id);
    }

    public void deleteKaugummi(Long id) {
        kaugummiRepository.deleteById(id);
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

        if (!benutzer.getFavoriten().contains(kaugummi)) {
            throw new RuntimeException("Kaugummi ist nicht in den Favoriten vorhanden");
        }

        benutzer.getFavoriten().remove(kaugummi);
        benutzerRepository.save(benutzer);
    }

    public void favoritHinzufuegen(Long id, Long benutzerId) {
    }
    @Transactional
    public KaugummiDTO createKaugummi(KaugummiDTO kaugummiDTO) {

        Kaugummi kaugummi = new Kaugummi();

        kaugummi.setName(kaugummiDTO.name());
        kaugummi.setImageUrl(kaugummiDTO.imageUrl());
        kaugummi.setMarke(kaugummiDTO.marke());
        kaugummi.setGeschmack(kaugummiDTO.geschmack());
        kaugummi.setZuckerfrei(kaugummiDTO.zuckerfrei());
        kaugummi.setInhaltsstoffe(kaugummiDTO.inhaltsstoffe());

        Kaugummi savedKaugummi = kaugummiRepository.save(kaugummi);

        return new KaugummiDTO(
                savedKaugummi.getId(),
                savedKaugummi.getName(),
                savedKaugummi.getImageUrl(),
                savedKaugummi.getMarke(),
                savedKaugummi.getGeschmack(),
                savedKaugummi.getZuckerfrei(),
                savedKaugummi.getInhaltsstoffe(),
                savedKaugummi.getShopUrl()
        );
    }
    // Kaugummi Bearbeiten
    @Transactional
    public KaugummiDTO updateKaugummi(KaugummiDTO kaugummiDTO){
        //Kaugummi nach ID Suchen
        Kaugummi kaugummi = kaugummiRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Kaugummi mit ID " + id + " nicht gefunden"));
        //Attribute
        kaugummi.setName(kaugummiDTO.name());
        kaugummi.setImageUrl(kaugummiDTO.imageUrl());
        kaugummi.setMarke(kaugummiDTO.marke());
        kaugummi.setGeschmack(kaugummiDTO.geschmack());
        kaugummi.setZuckerfrei(kaugummiDTO.zuckerfrei());
        kaugummi.setInhaltsstoffe(kaugummiDTO.inhaltsstoffe());

        Kaugummi savedKaugummi = kaugummiRepository.save(kaugummi);

        return new KaugummiDTO(
                savedKaugummi.getId(),
                savedKaugummi.getName(),
                savedKaugummi.getImageUrl(),
                savedKaugummi.getMarke(),
                savedKaugummi.getGeschmack(),
                savedKaugummi.getZuckerfrei(),
                savedKaugummi.getInhaltsstoffe(),
                savedKaugummi.getShopUrl()
        );


    }
}
