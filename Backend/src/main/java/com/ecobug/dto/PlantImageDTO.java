
package com.ecobug.dto;

public class PlantImageDTO {

    private Long id;
    private String imageUrl;
    private String imageType;
    private Integer sourceRow;

    public PlantImageDTO() {}

    public PlantImageDTO(Long id, String imageUrl,
                         String imageType, Integer sourceRow) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.sourceRow = sourceRow;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }

    public Integer getSourceRow() { return sourceRow; }
    public void setSourceRow(Integer sourceRow) { this.sourceRow = sourceRow; }
}
