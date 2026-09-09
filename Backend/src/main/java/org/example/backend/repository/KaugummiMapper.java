package org.example.backend.repository;
import org.example.backend.Model.Kaugummi;
import org.example.backend.dto.KaugummiDTO;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring") // componentModel="spring" ist wichtig für Dependency Injection
public interface KaugummiMapper {

    KaugummiDTO toDto(Kaugummi kaugummi);
}
