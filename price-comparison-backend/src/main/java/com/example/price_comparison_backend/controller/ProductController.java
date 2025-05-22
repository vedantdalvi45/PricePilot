package com.example.price_comparison_backend.controller;

import com.example.price_comparison_backend.model.Product;
import com.example.price_comparison_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*") // Allows frontend access from any origin
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String query) {
        return repository.findByNameContainingIgnoreCase(query);
    }

    @GetMapping("/category")
    public List<Product> getByCategory(@RequestParam String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    // Optional: Add products manually for testing
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return repository.save(product);
    }
}

