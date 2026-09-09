package org.example.backend.dto;

public record KaugummiDTO(
        Long id,
        String name,
        String imageUrl,
        String marke,
        String geschmack,
        Boolean zuckerfrei,
        String inhaltsstoffe,
        String shopUrl
) {

}
