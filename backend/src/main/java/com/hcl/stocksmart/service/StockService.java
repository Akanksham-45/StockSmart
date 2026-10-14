package com.hcl.stocksmart.service;

import com.hcl.stocksmart.model.Stock;
import com.hcl.stocksmart.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock stock) {
        Stock existingStock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        existingStock.setProductId(stock.getProductId());
        existingStock.setLocationId(stock.getLocationId());
        existingStock.setQuantity(stock.getQuantity());

        return stockRepository.save(existingStock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}