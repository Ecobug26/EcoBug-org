package com.ecobug.entity;

import jakarta.persistence.*;
import java.util.List;

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
    private List<String> keywords;

    @Column(name = "iucn_status")
    private String iucnStatus;

    @Column(name = "uses", columnDefinition = "TEXT")
    private String uses;

    @ElementCollection
    @CollectionTable(name = "plant_attributes", joinColumns = @JoinColumn(name = "plant_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "heading", column = @Column(name = "heading")),
        @AttributeOverride(name = "more", column = @Column(name = "more"))
    })
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
}