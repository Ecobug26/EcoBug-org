package com.ecobug.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.List;

/**
 * Stores PlantAttribute.lines as JSON so it works whether the underlying
 * Postgres column is TEXT (JSON string) or TEXT[] (array literal).
 */
@Converter
public class StringListJsonConverter implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null) return null;
        try {
            return MAPPER.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Could not convert list to JSON", e);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) return List.of();
        String trimmed = dbData.trim();
        try {
            if (trimmed.startsWith("[")) {
                // Works for JSON arrays and Postgres array literals like {a,b};
                // normalise Postgres {..} into JSON [..] first.
                String json = trimmed.startsWith("{") && !trimmed.startsWith("[")
                        ? "[" + trimmed.substring(1, trimmed.length() - 1) + "]"
                        : trimmed;
                return MAPPER.readValue(json, new TypeReference<List<String>>() {});
            }
            return List.of(dbData);
        } catch (JsonProcessingException e) {
            return List.of(dbData);
        }
    }
}