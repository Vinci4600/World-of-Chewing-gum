package org.example.backend.controller;

import org.example.backend.dto.BenutzerDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.example.backend.service.BenutzerService;

import java.util.List;

@RestController
@RequestMapping("/api/benutzer")
@CrossOrigin(origins = "http://localhost:5173") // Für React Frontend
@PreAuthorize("hasRole('ADMIN')")
public class BenutzerController {

    private final BenutzerService benutzerService;


    public BenutzerController(BenutzerService benutzerService) {
        this.benutzerService = benutzerService;

    }

    /**
     * ALle User aus ArrayList anzeigen
     * @return
     */
    @GetMapping("/all")
    public ResponseEntity<List<BenutzerDTO>> alleBenutzerAnzeigen() {
        return ResponseEntity.ok(benutzerService.alleBenutzerAnzeigen());
    }


    /**
     * Spezifischen User aus ArraqyList anzeigen anhand der ID
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public ResponseEntity<BenutzerDTO> benutzerAnzeigen(@PathVariable Long id) {
        return ResponseEntity.ok(benutzerService.benutzerAnzeigen(id));
    }

    /**
     * Spezifischen User aus Benutzer Liste löschen anhand PK (id)
     *
     * @param id
     * @return
     */
    @DeleteMapping("/benutzer/{id}")
    public ResponseEntity<Void> benutzerLöschen(@PathVariable Long id) {
        benutzerService.benutzerLoeschen(id);
        return ResponseEntity.noContent().build();
    }

}
