package com.inDataCoreApp.inDataCore.controllers;

import com.inDataCoreApp.inDataCore.dto.ProductDto;
import com.inDataCoreApp.inDataCore.entities.Product;
import com.inDataCoreApp.inDataCore.repositories.ProductRepositorie;
import com.inDataCoreApp.inDataCore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepositorie productRepositorie;
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
    @PostMapping("/ajouterProduit")
    public ResponseEntity cretaeProducte(@RequestBody ProductDto productDto) {
        String name=productDto.getName();
        String description=productDto.getDescription();
        double price=productDto.getPrice();
        if(productRepositorie.existsByName(name) &&  productRepositorie.existsByDescription(description)
                && productRepositorie.existsByPrice(price)){
          return ResponseEntity.ok().body("deja exist");
        }
        Product product=new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        Product savedProduct = productService.ajouterProduit(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }
    @DeleteMapping("/supprimerProduit/{id}")
    public ResponseEntity<String> supprimerProduit(@PathVariable("id") Long id) {
        try {
             Product product = productRepositorie.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Product non trouvée"));

            productRepositorie.delete(product);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("erreur de suppression");
        }
    }
    @PutMapping("/modifierProduit/{id}")
    public Product updateProduct(@PathVariable("id") Long id, @RequestBody ProductDto productDto) {
        String name = productDto.getName();
        String description =productDto.getDescription();
        double price=productDto.getPrice();
        Product product = productRepositorie.findById(id).orElseThrow(() -> new IllegalArgumentException("Produit non trouvé"));
        if (!product.getName().equals(name) && !product.getDescription().equals(description) && !(product.getPrice() ==price)) {
            throw new IllegalArgumentException("modifier echoue");
        }

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
       return productService.ajouterProduit(product);
    }

    @GetMapping("/getProduct/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> productl = productRepositorie.findById(id);

        if (productl.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(productl.get());
    }

}
