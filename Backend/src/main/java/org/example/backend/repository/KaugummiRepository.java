package org.example.backend.repository;

import org.example.backend.Model.Kaugummi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KaugummiRepository extends JpaRepository<Kaugummi,Long> {

}
