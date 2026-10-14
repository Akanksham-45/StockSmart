package com.hcl.stocksmart.controller;

import com.hcl.stocksmart.model.Location;
import com.hcl.stocksmart.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @PostMapping
    public Location addLocation(@RequestBody Location location) {
        return locationService.addLocation(location);
    }

    @PutMapping("/{id}")
    public Location updateLocation(
            @PathVariable Long id,
            @RequestBody Location location) {

        return locationService.updateLocation(id, location);
    }

    @DeleteMapping("/{id}")
    public String deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return "Location deleted successfully";
    }
}