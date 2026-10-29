package com.ecobug.dto;

import java.util.List;

public class PlantDTO {

    private Long id;
    private String scientificName;
    private String subtitle;
    private String commonNames;
    private String imageUrl;
    private String plantType;
    private String foliageColour;
    private String climaticZone;
    private List<String> keywords;
    private String iucnStatus;
    private String uses;
    private List<PlantAttributeDTO> attributes;
    private List<PlantImageDTO> images;

    // Constructors
    public PlantDTO() {}

    public PlantDTO(Long id, String scientificName, String subtitle, String commonNames,
                    String imageUrl, String plantType, String foliageColour,
                    String climaticZone, List<String> keywords, String iucnStatus,
                    String uses, List<PlantAttributeDTO> attributes) {
        this.id = id;
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
        this.images = List.of();
    }

    public PlantDTO(Long id, String scientificName, String subtitle, String commonNames,
                    String imageUrl, String plantType, String foliageColour,
                    String climaticZone, List<String> keywords, String iucnStatus,
                    String uses, List<PlantAttributeDTO> attributes,
                    List<PlantImageDTO> images) {
        this.id = id;
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
        this.images = images != null ? images : List.of();
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

    public List<PlantAttributeDTO> getAttributes() { return attributes; }
    public void setAttributes(List<PlantAttributeDTO> attributes) { this.attributes = attributes; }

    public List<PlantImageDTO> getImages() {
    return images;
}

    public void setImages(List<PlantImageDTO> images) {
        this.images = images;
    }
}