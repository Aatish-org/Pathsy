package com.example.pathsysts;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Landing {
    @Id
    private int price;
    private String description;
    private String duration;
    private String availability;
    private String grouptype;
    private String imageurl;
    private String tourtype;
    public String getTourtype() {
        return tourtype;
    }
    public void setTourtype(String tourtype) {
        this.tourtype = tourtype;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public String getAvailability() {
        return availability;
    }
    public void setAvailability(String availability) {
        this.availability = availability;
    }
    public String getGrouptype() {
        return grouptype;
    }
    public void setGrouptype(String grouptype) {
        this.grouptype = grouptype;
    }
    public String getImageurl() {
        return imageurl;
    }
    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }



}
