package org.example.backend.controller;

import org.example.backend.model.Kaugummi;
import org.example.backend.model.Kunde;
import org.example.backend.service.KaugummiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kunde")
public class KundeController {

    private final KaugummiService kaugummiService;

    public KundeController(KaugummiService kaugummiService) {
        this.kaugummiService = kaugummiService;
    }

    // GET - Alle Kaugummis anschauen
    @GetMapping("/kaugummis")
    public ResponseEntity<List<Kaugummi>> alleKaugummisAnschauen() {
        return ResponseEntity.ok(kaugummiService.alleKaugummisAnzeigen());
    }

    // GET - Einzelnen Kaugummi anschauen
    @GetMapping("/kaugummis/{id}")
    public ResponseEntity<Kaugummi> kaugummiAnschauen(@PathVariable Long id) {
        return ResponseEntity.ok(kaugummiService.kaugummiAnzeigen(id));
    }

    // POST - Kaugummi zu Favoriten hinzufügen
    @PostMapping("/{kundeId}/favoriten/{kaugummiId}")
    public ResponseEntity<Void> kaugummiZuFavoritenHinzufuegen(@PathVariable Long kundeId, 
                                                                @PathVariable Long kaugummiId) {
        kaugummiService.favoritHinzufuegen(kaugummiId, kundeId);
        return ResponseEntity.ok().build();
    }

    // DELETE - Kaugummi aus den Favoriten entfernen
    @DeleteMapping("/{kundeId}/favoriten/{kaugummiId}")
    public ResponseEntity<Void> kaugummiAusFavoritenEntfernen(@PathVariable Long kundeId, 
                                                               @PathVariable Long kaugummiId) {
        kaugummiService.favoritEntfernen(kaugummiId, kundeId);
        return ResponseEntity.noContent().build();
    }
}

