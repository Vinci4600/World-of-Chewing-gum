package org.example.backend.repository;

import org.example.backend.Model.Bewertung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BewertungRepository extends JpaRepository<Bewertung,Long> {
}
