package com.hcl.stocksmart.service;

import com.hcl.stocksmart.model.Product;
import com.hcl.stocksmart.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setSku(product.getSku());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setBarcode(product.getBarcode());

        return productRepository.save(existingProduct);
    }
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> searchBySku(String sku) {
        return productRepository.findBySkuContainingIgnoreCase(sku);
    }
    public List<Product> searchByCategory(String category) {
        return productRepository.findByCategoryContainingIgnoreCase(category);
    }
    public List<Product> searchByBarcode(String barcode) {
        return productRepository.findByBarcodeContainingIgnoreCase(barcode);
    }
}