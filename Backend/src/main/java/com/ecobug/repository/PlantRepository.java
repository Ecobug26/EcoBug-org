package com.ecobug.repository;

import com.ecobug.entity.Plant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long>, JpaSpecificationExecutor<Plant> {

    Optional<Plant> findByScientificNameIgnoreCase(String scientificName);

    Page<Plant> findAll(Pageable pageable);

    @Query("SELECT p FROM Plant p WHERE (:type IS NULL OR p.plantType = :type) " +
           "AND (:colour IS NULL OR p.foliageColour = :colour) " +
           "AND (:zone IS NULL OR p.climaticZone = :zone)")
    Page<Plant> findPlantsWithFilters(
            @Param("type") String plantType,
            @Param("colour") String foliageColour,
            @Param("zone") String climaticZone,
            Pageable pageable);

    boolean existsByScientificNameIgnoreCase(String scientificName);
}