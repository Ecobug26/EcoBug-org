package com.ecobug.dto;

import java.time.LocalDateTime;
import java.util.List;

public class StrategyDTO {

    private Long id;
    private String title;
    private String category;
    private String summary;
    private String imageUrl;
    private List<String> keywords;
    private String fullDescription;
    private LocalDateTime createdAt;

    // Constructors
    public StrategyDTO() {}

    public StrategyDTO(Long id, String title, String category, String summary, String imageUrl,
                       List<String> keywords, String fullDescription, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.imageUrl = imageUrl;
        this.keywords = keywords;
        this.fullDescription = fullDescription;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}