package com.hcl.stocksmart.service;

import com.hcl.stocksmart.model.Location;
import com.hcl.stocksmart.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, Location location) {
        Location existingLocation = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        existingLocation.setName(location.getName());
        existingLocation.setAddress(location.getAddress());

        return locationRepository.save(existingLocation);
    }

    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
}