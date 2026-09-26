package org.example.backend.controller;

import org.example.backend.Model.Kaugummi;
import org.example.backend.Model.Kunde;
import org.example.backend.service.KaugummiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kunde")
@PreAuthorize("hasRole('KUNDE')")

@CrossOrigin(origins = "http://localhost:5174", allowedHeaders = "*", allowCredentials = "true")

public class KundeController {

    private final KaugummiService kaugummiService;

    public KundeController(KaugummiService kaugummiService) {
        this.kaugummiService = kaugummiService;
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

