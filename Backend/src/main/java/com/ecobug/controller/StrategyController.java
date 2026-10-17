package com.ecobug.controller;

import com.ecobug.dto.StrategyDTO;
import com.ecobug.entity.Strategy;
import com.ecobug.repository.StrategyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/strategies")
@CrossOrigin(origins = "*")
public class StrategyController {

    @Autowired
    private StrategyRepository strategyRepository;

    @GetMapping
    public ResponseEntity<List<StrategyDTO>> getAllStrategies(
            @RequestParam(required = false) String category) {

        List<Strategy> strategies;
        if (category != null && !category.isEmpty()) {
            strategies = strategyRepository.findByCategoryIgnoreCase(category);
        } else {
            strategies = strategyRepository.findAll();
        }

        List<StrategyDTO> dtos = strategies.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StrategyDTO> getStrategyById(@PathVariable Long id) {
        Optional<Strategy> strategy = strategyRepository.findById(id);
        return strategy.map(s -> ResponseEntity.ok(toDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private StrategyDTO toDTO(Strategy strategy) {
        return new StrategyDTO(
                strategy.getId(),
                strategy.getTitle(),
                strategy.getCategory(),
                strategy.getSummary(),
                strategy.getImageUrl(),
                strategy.getKeywords(),
                strategy.getFullDescription(),
                strategy.getCreatedAt()
        );
    }
}