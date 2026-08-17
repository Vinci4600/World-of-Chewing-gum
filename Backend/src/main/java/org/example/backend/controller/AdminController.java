package org.example.backend.controller;

import org.example.backend.Model.Kaugummi;


import org.example.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    /**
     * Admin Service with Dependency Injection
     */
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    /**
     * Neuer Kaugummi hinzufügen
     * @param kaugummiData
     * @return
     */
    @PostMapping("/kaugummi")
    public ResponseEntity<Kaugummi> kaugummiErstellen(@RequestBody Kaugummi kaugummiData) {
        return ResponseEntity.ok(adminService.kaugummiErstellen(kaugummiData));
    }


    /**
     * Kaugummi wird angezeigt anhand der Id
     * @param id
     * @return Kaugumi Liste
     */

    @GetMapping("/{id}")
    public ResponseEntity<Kaugummi> kaugummiAnzeigen(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.kaugummianzeigen(id));
    }


    /**
     * Kaugummi hinzufügen
     * @param id
     * @param kaugummiData
     * @return
     */

    @PutMapping("/kaugummi/{id}")
    public ResponseEntity<Kaugummi> kaugummiBearbeiten(@PathVariable Long id,
                                                       @RequestBody Kaugummi kaugummiData) {
        return ResponseEntity.ok(adminService.kaugummiBearbeiten(id, kaugummiData));
    }

    /**
     * Kaugummi löschen
     * @param id
     * @return
     */

    @DeleteMapping("/kaugummi/{id}")
    public ResponseEntity<Void> kaugummiLoeschen(@PathVariable Long id) {
        adminService.kaugummiLoeschen(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/kommentar/{kommentarId}")
    public ResponseEntity<org.example.backend.model.Kommentar> kommentarBearbeiten(@PathVariable Long kommentarId,
                                                                                   @RequestParam Long benutzerId,
                                                                                   @RequestBody String neuerText) {
        org.example.backend.model.Kommentar aktualisierterKommentar = adminService.kommentarBearbeitenUndSpeichern(kommentarId, benutzerId, neuerText);
        return ResponseEntity.ok(aktualisierterKommentar);
    }

    @PostMapping("/kommentar/{id}")
    public ResponseEntity<org.example.backend.model.Kommentar> kommentarHinzufuegen(@PathVariable Long id,
                                                                                    @RequestParam Long benutzerId,
                                                                                    @RequestBody String text) {
        org.example.backend.model.Kommentar neuerKommentar = adminService.kommentarHinzufuegen(id, benutzerId, text);
        return ResponseEntity.status(HttpStatus.CREATED).body(neuerKommentar);
    }


    /**
     * EInzelner Kommentar anhand Attrivur kommentarId löschen
     * @param kommentarId
     * @return  Kommentarid
     *
     */
    @DeleteMapping("/kommentar/{kommentarId}")
    public ResponseEntity<Void> kommentarLoeschen(@PathVariable Long kommentarId) {
        adminService.kommentarLoeschen(kommentarId);
        return ResponseEntity.noContent().build();
    }
}
