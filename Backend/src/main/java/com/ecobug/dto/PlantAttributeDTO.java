package com.ecobug.dto;

import java.util.List;

public class PlantAttributeDTO {

    private String heading;
    private List<String> lines;
    private Boolean more;

    // Constructors
    public PlantAttributeDTO() {}

    public PlantAttributeDTO(String heading, List<String> lines, Boolean more) {
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