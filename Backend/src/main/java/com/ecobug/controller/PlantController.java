
package com.ecobug.controller;

import com.ecobug.dto.PlantAttributeDTO;
import com.ecobug.dto.PlantDTO;
import com.ecobug.dto.PlantImageDTO;
import com.ecobug.entity.Plant;
import com.ecobug.repository.PlantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "*")
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> getAllPlants(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String colour,
            @RequestParam(required = false) String zone,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Plant> plantPage;

        if (type != null || colour != null || zone != null) {
            plantPage = plantRepository.findPlantsWithFilters(type, colour, zone, pageable);
        } else {
            plantPage = plantRepository.findAll(pageable);
        }

        List<PlantDTO> dtos = plantPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("plants", dtos);
        response.put("totalElements", plantPage.getTotalElements());
        response.put("totalPages", plantPage.getTotalPages());
        response.put("currentPage", plantPage.getNumber());
        response.put("pageSize", plantPage.getSize());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<PlantDTO> getPlantById(@PathVariable Long id) {
        Optional<Plant> plant = plantRepository.findById(id);

        return plant.map(p -> ResponseEntity.ok(toDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/scientific-name/{scientificName}")
    @Transactional(readOnly = true)
    public ResponseEntity<PlantDTO> getPlantByScientificName(
            @PathVariable String scientificName) {

        Optional<Plant> plant =
                plantRepository.findByScientificNameIgnoreCase(scientificName);

        return plant.map(p -> ResponseEntity.ok(toDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private PlantDTO toDTO(Plant plant) {
        // Initialize lazy collections while the Hibernate session is still open
        // (spring.jpa.open-in-view=false, so serialization happens after session close)
        if (plant.getKeywords() != null) plant.getKeywords().size();
        if (plant.getAttributes() != null) plant.getAttributes().size();
        if (plant.getImages() != null) plant.getImages().size();

        List<PlantAttributeDTO> attrDTOs =
                plant.getAttributes() != null
                        ? plant.getAttributes().stream()
                                .map(a -> new PlantAttributeDTO(
                                        a.getHeading(),
                                        a.getLines(),
                                        a.getMore()))
                                .collect(Collectors.toList())
                        : null;

        List<PlantImageDTO> imageDTOs =
                plant.getImages() != null
                        ? plant.getImages().stream()
                                .map(img -> new PlantImageDTO(
                                        img.getId(),
                                        img.getImageUrl(),
                                        img.getImageType(),
                                        img.getSourceRow(),
                                        img.getSourceColumn()))
                                .collect(Collectors.toList())
                        : List.of();

        PlantDTO dto = new PlantDTO(
                plant.getId(),
                plant.getScientificName(),
                plant.getSubtitle(),
                plant.getCommonNames(),
                plant.getImageUrl(),
                plant.getPlantType(),
                plant.getFoliageColour(),
                plant.getClimaticZone(),
                plant.getKeywords(),
                plant.getIucnStatus(),
                plant.getUses(),
                attrDTOs,
                imageDTOs
        );
        return dto;
    }
}
