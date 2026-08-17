package org.example.backend.repository;

import org.example.backend.model.Kommentar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface Kommentarrepository extends JpaRepository<Kommentar,Long> {

    void deleteById(Long id);
    /**
     * Methode um KOmmentar upzudaten anhand Id
     * @param id
     * @param text
     * @return
     */
    @Transactional
    @Modifying
    @Query("UPDATE Kommentar k SET k.text = :text WHERE k.id = :id")
    int updateKommentarText(@Param("id") Long id, @Param("text") String text);
}
