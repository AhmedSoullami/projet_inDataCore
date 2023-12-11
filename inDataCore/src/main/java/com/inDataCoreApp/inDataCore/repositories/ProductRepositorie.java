package com.inDataCoreApp.inDataCore.repositories;

import com.inDataCoreApp.inDataCore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepositorie extends JpaRepository<Product,Long> {
    Boolean existsByName(String name);
    Boolean existsByDescription(String name);
    Boolean existsByPrice(double price);

}
