package com.ecobug.entity;
import java.util.ArrayList;
import jakarta.persistence.*;
import java.util.List;

import java.util.Map;
import java.util.HashMap;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "plants")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "scientific_name", nullable = false)
    private String scientificName;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "common_names")
    private String commonNames;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "plant_type")
    private String plantType;

    @Column(name = "foliage_colour")
    private String foliageColour;

    @Column(name = "climatic_zone")
    private String climaticZone;

    @ElementCollection
    @CollectionTable(name = "plant_keywords", joinColumns = @JoinColumn(name = "plant_id"))
    @Column(name = "keyword")
    @BatchSize(size = 100)
    private List<String> keywords;

    @Column(name = "iucn_status")
    private String iucnStatus;

    @Column(name = "uses", columnDefinition = "TEXT")
    private String uses;

    
@Column(name = "plant_form", columnDefinition = "TEXT")
private String plantForm;

@Column(name = "habitat_system", columnDefinition = "TEXT")
private String habitatSystem;

@Column(name = "habitat_type", columnDefinition = "TEXT")
private String habitatType;

@Column(name = "natural_habitat", columnDefinition = "TEXT")
private String naturalHabitat;

@Column(name = "foliage_habitat", columnDefinition = "TEXT")
private String foliageHabitat;

@Column(name = "flower_colour", columnDefinition = "TEXT")
private String flowerColour;

@Column(name = "flower_characteristic", columnDefinition = "TEXT")
private String flowerCharacteristic;

@Column(name = "flowering_fruit_season", columnDefinition = "TEXT")
private String floweringFruitSeason;

@Column(name = "fruit", columnDefinition = "TEXT")
private String fruit;

@Column(name = "seed_bearing_structure", columnDefinition = "TEXT")
private String seedBearingStructure;

@Column(name = "fruit_description", columnDefinition = "TEXT")
private String fruitDescription;

@Column(name = "climate_condition", columnDefinition = "TEXT")
private String climateCondition;

@Column(name = "agro_climatic_zone", columnDefinition = "TEXT")
private String agroClimaticZone;

@Column(name = "soil_type", columnDefinition = "TEXT")
private String soilType;

@Column(name = "growth_habit", columnDefinition = "TEXT")
private String growthHabit;

@Column(name = "growth_height", columnDefinition = "TEXT")
private String growthHeight;

@Column(name = "canopy_spread", columnDefinition = "TEXT")
private String canopySpread;

@Column(name = "leaf_description", columnDefinition = "TEXT")
private String leafDescription;

@Column(name = "typical_lifespan", columnDefinition = "TEXT")
private String typicalLifespan;

@Column(name = "source_urls", columnDefinition = "TEXT")
private String sourceUrls;

@JdbcTypeCode(SqlTypes.JSON)
@Column(name = "source_data", columnDefinition = "jsonb")
private Map<String, Object> sourceData = new HashMap<>();


    @ElementCollection
    @CollectionTable(name = "plant_attributes", joinColumns = @JoinColumn(name = "plant_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "heading", column = @Column(name = "heading")),
        @AttributeOverride(name = "more", column = @Column(name = "more"))
    })
    @BatchSize(size = 100)
    private List<PlantAttribute> attributes;

    // Constructors
    public Plant() {}

    public Plant(String scientificName, String subtitle, String commonNames, String imageUrl,
                 String plantType, String foliageColour, String climaticZone,
                 List<String> keywords, String iucnStatus, String uses,
                 List<PlantAttribute> attributes) {
        this.scientificName = scientificName;
        this.subtitle = subtitle;
        this.commonNames = commonNames;
        this.imageUrl = imageUrl;
        this.plantType = plantType;
        this.foliageColour = foliageColour;
        this.climaticZone = climaticZone;
        this.keywords = keywords;
        this.iucnStatus = iucnStatus;
        this.uses = uses;
        this.attributes = attributes;
    }
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL,
           orphanRemoval = true)
    @BatchSize(size = 100)
private List<PlantImage> images = new ArrayList<>();

public List<PlantImage> getImages() {
    return images;
}

public void setImages(List<PlantImage> images) {
    this.images = images;
}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getCommonNames() { return commonNames; }
    public void setCommonNames(String commonNames) { this.commonNames = commonNames; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getPlantType() { return plantType; }
    public void setPlantType(String plantType) { this.plantType = plantType; }

    public String getFoliageColour() { return foliageColour; }
    public void setFoliageColour(String foliageColour) { this.foliageColour = foliageColour; }

    public String getClimaticZone() { return climaticZone; }
    public void setClimaticZone(String climaticZone) { this.climaticZone = climaticZone; }

    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

    public String getIucnStatus() { return iucnStatus; }
    public void setIucnStatus(String iucnStatus) { this.iucnStatus = iucnStatus; }

    public String getUses() { return uses; }
    public void setUses(String uses) { this.uses = uses; }

    public List<PlantAttribute> getAttributes() { return attributes; }
    public void setAttributes(List<PlantAttribute> attributes) { this.attributes = attributes; }
    
public String getPlantForm() { return plantForm; }
public void setPlantForm(String value) { this.plantForm = value; }

public String getHabitatSystem() { return habitatSystem; }
public void setHabitatSystem(String value) { this.habitatSystem = value; }

public String getHabitatType() { return habitatType; }
public void setHabitatType(String value) { this.habitatType = value; }

public String getNaturalHabitat() { return naturalHabitat; }
public void setNaturalHabitat(String value) { this.naturalHabitat = value; }

public String getFoliageHabitat() { return foliageHabitat; }
public void setFoliageHabitat(String value) { this.foliageHabitat = value; }

public String getFlowerColour() { return flowerColour; }
public void setFlowerColour(String value) { this.flowerColour = value; }

public String getFlowerCharacteristic() { return flowerCharacteristic; }
public void setFlowerCharacteristic(String value) { this.flowerCharacteristic = value; }

public String getFloweringFruitSeason() { return floweringFruitSeason; }
public void setFloweringFruitSeason(String value) { this.floweringFruitSeason = value; }

public String getFruit() { return fruit; }
public void setFruit(String value) { this.fruit = value; }

public String getSeedBearingStructure() { return seedBearingStructure; }
public void setSeedBearingStructure(String value) { this.seedBearingStructure = value; }

public String getFruitDescription() { return fruitDescription; }
public void setFruitDescription(String value) { this.fruitDescription = value; }

public String getClimateCondition() { return climateCondition; }
public void setClimateCondition(String value) { this.climateCondition = value; }

public String getAgroClimaticZone() { return agroClimaticZone; }
public void setAgroClimaticZone(String value) { this.agroClimaticZone = value; }

public String getSoilType() { return soilType; }
public void setSoilType(String value) { this.soilType = value; }

public String getGrowthHabit() { return growthHabit; }
public void setGrowthHabit(String value) { this.growthHabit = value; }

public String getGrowthHeight() { return growthHeight; }
public void setGrowthHeight(String value) { this.growthHeight = value; }

public String getCanopySpread() { return canopySpread; }
public void setCanopySpread(String value) { this.canopySpread = value; }

public String getLeafDescription() { return leafDescription; }
public void setLeafDescription(String value) { this.leafDescription = value; }

public String getTypicalLifespan() { return typicalLifespan; }
public void setTypicalLifespan(String value) { this.typicalLifespan = value; }

public String getSourceUrls() { return sourceUrls; }
public void setSourceUrls(String value) { this.sourceUrls = value; }

public Map<String, Object> getSourceData() { return sourceData; }
public void setSourceData(Map<String, Object> value) { this.sourceData = value; }

}