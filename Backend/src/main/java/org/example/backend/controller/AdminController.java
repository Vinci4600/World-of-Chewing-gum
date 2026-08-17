package org.example.backend.controller;

import org.example.backend.model.Kaugummi;
import org.example.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

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

    @DeleteMapping("/kommentar/{kommentarId}")
    public ResponseEntity<Void> kommentarLoeschen(@PathVariable Long kommentarId) {
        adminService.kommentarLoeschen(kommentarId);
        return ResponseEntity.noContent().build();
    }
}
