package org.example.backend.controller;

import org.example.backend.dto.BenutzerDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @GetMapping("/all")
    public ResponseEntity<List<BenutzerDTO>> alleBenutzerAnzeigen() {
        return ResponseEntity.ok(benutzerService.alleBenutzerAnzeigen());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BenutzerDTO> benutzerAnzeigen(@PathVariable Long id) {
        return ResponseEntity.ok(benutzerService.benutzerAnzeigen(id));
    }
}
