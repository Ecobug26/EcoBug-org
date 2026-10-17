package com.ecobug.controller;

import com.ecobug.dto.ContactRequest;
import com.ecobug.dto.ContactResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${contact.email:connect.ecobug@gmail.com}")
    private String contactEmail;

    public ContactController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping("/send")
    public ResponseEntity<ContactResponse> sendContact(@Valid @RequestBody ContactRequest request) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(contactEmail);
            message.setFrom(fromEmail);
            message.setSubject("Website enquiry" +
                    (request.getSubject() != null && !request.getSubject().trim().isEmpty()
                            ? ": " + request.getSubject().trim()
                            : ""));
            message.setText("Name: " + request.getName() + "\n" +
                    "Email: " + request.getEmail() + "\n\n" +
                    request.getMessage());

            mailSender.send(message);

            return ResponseEntity.ok(new ContactResponse(true, "Message sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ContactResponse(false, "Failed to send message: " + e.getMessage()));
        }
    }
}