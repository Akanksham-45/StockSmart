package com.hcl.stocksmart.repository;

import com.hcl.stocksmart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findBySkuContainingIgnoreCase(String sku);

    List<Product> findByCategoryContainingIgnoreCase(String category);

    List<Product> findByBarcodeContainingIgnoreCase(String barcode);
}