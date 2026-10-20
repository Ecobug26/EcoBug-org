package com.ecobug.controller;

import com.ecobug.dto.BlogPostDTO;
import com.ecobug.entity.BlogPost;
import com.ecobug.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @GetMapping
    public ResponseEntity<List<BlogPostDTO>> getAllBlogs() {
        List<BlogPost> posts = blogPostRepository.findAll();
        List<BlogPostDTO> dtos = posts.stream().map(this::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPostDTO> getBlogBySlug(@PathVariable String slug) {
        Optional<BlogPost> post = blogPostRepository.findBySlug(slug);
        return post.map(p -> ResponseEntity.ok(toDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private BlogPostDTO toDTO(BlogPost post) {
        return new BlogPostDTO(
                post.getId(),
                post.getSlug(),
                post.getTitle(),
                post.getCategory(),
                post.getReadTime(),
                post.getImageUrl(),
                post.getExcerpt(),
                post.getBody(),
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }
}