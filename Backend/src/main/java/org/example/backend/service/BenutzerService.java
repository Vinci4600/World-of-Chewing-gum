package org.example.backend.service;

import org.example.backend.Model.Benutzer;
import org.example.backend.dto.BenutzerDTO;
import org.springframework.transaction.annotation.Transactional;
import org.example.backend.repository.BenutzerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BenutzerService {
    private final BenutzerRepository benutzerRepository;

    public BenutzerService(BenutzerRepository benutzerRepository) {
        this.benutzerRepository = benutzerRepository;
    }
// Alle Benutzer Anzeigen Funktion
    @Transactional(readOnly = true)
    public List<BenutzerDTO> alleBenutzerAnzeigen() {
        return benutzerRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BenutzerDTO benutzerAnzeigen(Long id) {
        Benutzer benutzer = benutzerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benutzer mit ID " + id + " nicht gefunden"));
        return toDto(benutzer);
    }
   //Benutzer Löschen Funktion





    //Benutzer Aktualiesieren Funktion





    // falls man es bruch auch noch (Admin Hinzufügen Funktion)

    private BenutzerDTO toDto(Benutzer benutzer) {
        return new BenutzerDTO(
                benutzer.getId(),
                benutzer.getBenutzername(),
                benutzer.getEmail(),
                benutzer.getRole()
        );
    }
}

