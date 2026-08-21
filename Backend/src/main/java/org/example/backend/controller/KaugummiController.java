package org.example.backend.controller;

import org.example.backend.model.Kaugummi;
import org.example.backend.service.KaugummiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kaugummi")
@CrossOrigin(origins = "http://localhost:5173") // Für React Frontend

public class KaugummiController {


    private final KaugummiService kaugummiService;

    public KaugummiController(KaugummiService kaugummiService) {
        this.kaugummiService = kaugummiService;
    }


    @GetMapping
    public ResponseEntity<List<Kaugummi>> alleKaugummisAnzeigen() {
        return ResponseEntity.ok(kaugummiService.alleKaugummisAnzeigen());
    }


    /**
     * Kaugummi aus ArrayListe anhand id anzeigen
     * @param id
     * @return Kaugummi ArrayListe
     */

    @GetMapping("/{id}")
    public ResponseEntity<Kaugummi> kaugummiAnzeigen(@PathVariable Long id) {
        return ResponseEntity.ok(kaugummiService.kaugummiAnzeigen(id));
    }



    @PostMapping("/{id}/bewertung")
    public ResponseEntity<org.example.backend.model.Bewertung> bewertungAbgeben(@PathVariable Long id,
                                                                                @RequestParam Long benutzerId,
                                                                                @RequestBody org.example.backend.model.Bewertung bewertungData) {
        return ResponseEntity.ok(kaugummiService.bewertungAbgeben(id, benutzerId, bewertungData));
    }

    /**
     *  Kommentar hinzufügen
     * @param id
     * @param benutzerId
     * @param text
     * @return
     */
    @PostMapping("/{id}/kommentar")
    public ResponseEntity<org.example.backend.model.Kommentar> kommentarHinzufuegen(@PathVariable Long id,
                                                                                    @RequestParam Long benutzerId,
                                                                                    @RequestBody String text) {
        return ResponseEntity.ok(kaugummiService.kommentarHinzufuegen(id, benutzerId, text));
    }

    /**
     * Benutzer favorisieren
     * @param id
     * @param benutzerId
     * @return
     */

    @PostMapping("/{id}/favorit")
    public ResponseEntity<Void> favoritHinzufuegen(@PathVariable Long id,
                                                   @RequestParam Long benutzerId) {
        kaugummiService.favoritHinzufuegen(id, benutzerId);
        return ResponseEntity.ok().build();
    }
}

