package com.ecobug.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Embeddable;
import java.util.List;

@Embeddable
public class PlantAttribute {

    private String heading;

    @Convert(converter = StringListJsonConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> lines;

    private Boolean more;

    // Constructors
    public PlantAttribute() {}

    public PlantAttribute(String heading, List<String> lines, Boolean more) {
        this.heading = heading;
        this.lines = lines;
        this.more = more;
    }

    // Getters and Setters
    public String getHeading() { return heading; }
    public void setHeading(String heading) { this.heading = heading; }

    public List<String> getLines() { return lines; }
    public void setLines(List<String> lines) { this.lines = lines; }

    public Boolean getMore() { return more; }
    public void setMore(Boolean more) { this.more = more; }
}