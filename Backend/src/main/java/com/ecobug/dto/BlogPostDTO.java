package com.ecobug.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BlogPostDTO {

    private Long id;
    private String slug;
    private String title;
    private String category;
    private String readTime;
    private String imageUrl;
    private String excerpt;
    private List<String> body;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public BlogPostDTO() {}

    public BlogPostDTO(Long id, String slug, String title, String category, String readTime,
                       String imageUrl, String excerpt, List<String> body,
                       LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.category = category;
        this.readTime = readTime;
        this.imageUrl = imageUrl;
        this.excerpt = excerpt;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public List<String> getBody() { return body; }
    public void setBody(List<String> body) { this.body = body; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}