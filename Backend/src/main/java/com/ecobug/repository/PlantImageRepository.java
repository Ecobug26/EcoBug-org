
package com.ecobug.repository;

import com.ecobug.entity.PlantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlantImageRepository
        extends JpaRepository<PlantImage, Long> {

    List<PlantImage> findByPlantId(Long plantId);
}
