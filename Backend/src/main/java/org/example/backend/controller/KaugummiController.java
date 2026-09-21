package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.Model.Kommentar;
import org.example.backend.dto.KaugummiDTO;
import org.example.backend.Model.Kaugummi;
import org.example.backend.service.KaugummiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import org.example.backend.dto.KommentarRequestDTO;
import org.springframework.security.core.Authentication;



import java.util.List;

@RestController
@RequestMapping("/api/kaugummi")
@CrossOrigin(origins = "http://localhost:5173") // Für React Frontend

public class KaugummiController {



    private final KaugummiService kaugummiService;

    public KaugummiController(KaugummiService kaugummiService) {
        this.kaugummiService = kaugummiService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Kaugummi>> alleKaugummisAnzeigen() {
        return ResponseEntity.ok(kaugummiService.alleKaugummisAnzeigen());
    }


    /**
     * Einzelne Kaugummissorte anhand id Daten editieren
     * @param id
     * @param kaugummiDTO mit aktualisierten Daten der Kaugummi Entity
     * @return aktualisiertes KaugummiDTO
     */
    @PutMapping({"/{id}", "/update/{id}"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<KaugummiDTO> updateKaugummi(
            @PathVariable Long id,
            @Valid @RequestBody KaugummiDTO kaugummiDTO) {

        KaugummiDTO updatedKaugummi = kaugummiService.updateKaugummi(id, kaugummiDTO);
        return ResponseEntity.ok(updatedKaugummi);
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
    public ResponseEntity<org.example.backend.Model.Bewertung> bewertungAbgeben(@PathVariable Long id,
                                                                                @RequestParam Long benutzerId,
                                                                                @RequestBody org.example.backend.Model.Bewertung bewertungData) {
        return ResponseEntity.ok(kaugummiService.bewertungAbgeben(id, benutzerId, bewertungData));
    }

//
    @PostMapping("/{id}/kommentar")
    public ResponseEntity<Kommentar> kommentarHinzufuegen(
            @PathVariable Long id,
            @Valid @RequestBody KommentarRequestDTO request,
            Authentication authentication) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(kaugummiService.kommentarHinzufuegen(
                        id,
                        authentication.getName(),
                        request.text()
                ));
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
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<KaugummiDTO> createKaugummi(
            @Valid @RequestBody KaugummiDTO kaugummiDTO) {

        KaugummiDTO createdKaugummi =
                kaugummiService.createKaugummi(kaugummiDTO);

        return ResponseEntity.ok(createdKaugummi);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteKaugummi(@PathVariable Long id) {

        if (!kaugummiService.existsById(id)) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Kaugummi not found");
        }

        kaugummiService.deleteKaugummi(id);

        return ResponseEntity.ok("Kaugummi deleted successfully");
    }
}

