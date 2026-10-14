package com.hcl.stocksmart.controller;

import com.hcl.stocksmart.model.Stock;
import com.hcl.stocksmart.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    @PutMapping("/{id}")
    public Stock updateStock(
            @PathVariable Long id,
            @RequestBody Stock stock) {

        return stockService.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public String deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return "Stock deleted successfully";
    }
}