package com.hcl.stocksmart.repository;

import com.hcl.stocksmart.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}