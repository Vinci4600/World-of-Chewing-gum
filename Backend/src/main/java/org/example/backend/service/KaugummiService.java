package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.Model.Benutzer;
import org.example.backend.Model.Bewertung;
import org.example.backend.Model.Kaugummi;
import org.example.backend.Model.Kommentar;
import org.example.backend.repository.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.example.backend.dto.KaugummiDTO;

import java.util.List;

@Service
public class KaugummiService {


    private final KaugummiRepository kaugummiRepository;
    private final BewertungRepository bewertungRepository;
    private final Kommentarrepository kommentarRepository;
    private final BenutzerRepository benutzerRepository;
    private  final KaugummiMapper kaugummimapper;

    public KaugummiService(KaugummiRepository kaugummiRepository, BewertungRepository bewertungRepository, Kommentarrepository kommentarRepository, BenutzerRepository benutzerRepository, KaugummiMapper kaugummimapper) {
        this.kaugummiRepository = kaugummiRepository;
        this.bewertungRepository = bewertungRepository;
        this.kommentarRepository = kommentarRepository;
        this.benutzerRepository = benutzerRepository;
        this.kaugummimapper = kaugummimapper;
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
    public void addFavoritToKaugummi(Long kaugummiId, Long userId) {
        Kaugummi kaugummi = kaugummiRepository.findById(kaugummiId)
                .orElseThrow(() -> new EntityNotFoundException("Kaugummi nicht gefunden mit ID: " + kaugummiId));

        Benutzer  user = benutzerRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User nicht gefunden mit ID: " + userId));

        // Hilfsmethode hält beide Seiten im Speicher synchron
        kaugummi.addFavorisiertVon(user);
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
        kaugummi.setShopUrl(kaugummiDTO.shopUrl());
        kaugummi.setHerstellungsland(kaugummiDTO.herstellungsland());
        kaugummi.setNebenwirkungen(kaugummiDTO.nebenwirkungen());

        Kaugummi savedKaugummi = kaugummiRepository.save(kaugummi);

        return new KaugummiDTO(
                savedKaugummi.getId(),
                savedKaugummi.getName(),
                savedKaugummi.getImageUrl(),
                savedKaugummi.getMarke(),
                savedKaugummi.getGeschmack(),
                savedKaugummi.getZuckerfrei(),
                savedKaugummi.getInhaltsstoffe(),
                savedKaugummi.getShopUrl(),
                savedKaugummi.getHerstellungsland(),
                savedKaugummi.getNebenwirkungen()
        );
    }

    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return kaugummiRepository.existsById(id);
    }

    @Transactional
    public void deleteKaugummi(Long id) {
        kaugummiRepository.deleteById(id);
    }

    @Transactional
    public KaugummiDTO updateKaugummi(Long id, KaugummiDTO kaugummiDTO) {
        Kaugummi kaugummi = kaugummiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kaugummi mit ID " + id + " nicht gefunden"));

        kaugummi.setName(kaugummiDTO.name());
        kaugummi.setImageUrl(kaugummiDTO.imageUrl());
        kaugummi.setMarke(kaugummiDTO.marke());
        kaugummi.setGeschmack(kaugummiDTO.geschmack());
        kaugummi.setZuckerfrei(kaugummiDTO.zuckerfrei());
        kaugummi.setInhaltsstoffe(kaugummiDTO.inhaltsstoffe());
        kaugummi.setShopUrl(kaugummiDTO.shopUrl());
        kaugummi.setHerstellungsland(kaugummiDTO.herstellungsland());

        Kaugummi updatedKaugummi = kaugummiRepository.save(kaugummi);

        return new KaugummiDTO(
                updatedKaugummi.getId(),
                updatedKaugummi.getName(),
                updatedKaugummi.getImageUrl(),
                updatedKaugummi.getMarke(),
                updatedKaugummi.getGeschmack(),
                updatedKaugummi.getZuckerfrei(),
                updatedKaugummi.getInhaltsstoffe(),
                updatedKaugummi.getShopUrl(),
                updatedKaugummi.getHerstellungsland(),
                updatedKaugummi.getNebenwirkungen()
        );
    }
}
