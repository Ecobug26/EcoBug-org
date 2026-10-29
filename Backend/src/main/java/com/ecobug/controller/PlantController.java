
package com.ecobug.controller;

import com.ecobug.dto.PlantAttributeDTO;
import com.ecobug.dto.PlantDTO;
import com.ecobug.dto.PlantImageDTO;
import com.ecobug.entity.Plant;
import com.ecobug.repository.PlantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<List<PlantDTO>> getAllPlants(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String colour,
            @RequestParam(required = false) String zone) {

        List<Plant> plants;

        if (type != null || colour != null || zone != null) {
            plants = plantRepository.findPlantsWithFilters(type, colour, zone);
        } else {
            plants = plantRepository.findAll();
        }

        List<PlantDTO> dtos = plants.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
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
