package org.example.backend.repository;

import org.example.backend.Model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BenutzerRepository extends JpaRepository<AppUser,Long> {

    Optional<AppUser> findByBenutzernameOrEmail(String benutzername, String email);

    Optional<AppUser> findByBenutzername(String benutzername);

    Optional<AppUser>findByUsernameOrEmail(String benutzername, String email);

    Optional<AppUser> findByEmail(String email);

    boolean existsByBenutzername(String benutzername);

    boolean existsByEmail(String email);


}
