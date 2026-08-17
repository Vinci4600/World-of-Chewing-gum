package org.example.backend.repository;

import org.example.backend.model.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BenutzerRepository extends JpaRepository<Benutzer,Long> {

    Optional<Benutzer> findByBenutzernameOrEmail(String benutzername, String email);

    Optional<Benutzer> findByBenutzername(String benutzername);

    Optional<Benutzer>findByUsernameOrEmail(String benutzername, String email);

    Optional<Benutzer> findByEmail(String email);

    boolean existsByBenutzername(String benutzername);

    boolean existsByEmail(String email);


}
