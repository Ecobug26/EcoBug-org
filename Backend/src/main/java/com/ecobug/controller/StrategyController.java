package com.ecobug.controller;

import com.ecobug.dto.StrategyDTO;
import com.ecobug.dto.StrategyPaginationResponse;
import com.ecobug.entity.Strategy;
import com.ecobug.repository.StrategyRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional(readOnly = true)
    public ResponseEntity<StrategyPaginationResponse> getAllStrategies(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, limit));

        Page<Strategy> strategyPage;
        if (category != null && !category.isEmpty()) {
            strategyPage = strategyRepository.findByCategoryIgnoreCase(category, pageable);
        } else {
            strategyPage = strategyRepository.findAll(pageable);
        }

        List<StrategyDTO> dtos = strategyPage.getContent().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        boolean hasMore = strategyPage.hasNext();

        StrategyPaginationResponse response = new StrategyPaginationResponse(
                dtos,
                (int) strategyPage.getTotalElements(),
                strategyPage.getNumber() + 1,
                limit,
                hasMore
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<StrategyDTO> getStrategyById(@PathVariable Long id) {
        Optional<Strategy> strategy = strategyRepository.findById(id);
        return strategy.map(s -> ResponseEntity.ok(toDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private StrategyDTO toDTO(Strategy strategy) {
        // Force-initialize lazy keywords collection before serialization
        Hibernate.initialize(strategy.getKeywords());
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