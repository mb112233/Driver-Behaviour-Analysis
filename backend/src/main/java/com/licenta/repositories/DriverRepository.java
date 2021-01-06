package com.licenta.repositories;

import com.licenta.entities.DriverEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<DriverEntity, Integer> {

    @Query(value = "SELECT * FROM driver", nativeQuery = true)
    List<DriverEntity> findAllDrivers();
}
