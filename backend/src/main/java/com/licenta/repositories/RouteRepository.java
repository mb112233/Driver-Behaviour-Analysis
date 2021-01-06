package com.licenta.repositories;


import com.licenta.entities.RouteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<RouteEntity, Integer> {
    @Query(value = "SELECT * FROM route r WHERE r.driver_id = ?1", nativeQuery = true)
    List<RouteEntity> findAllRoutes(Integer driverId);



}
