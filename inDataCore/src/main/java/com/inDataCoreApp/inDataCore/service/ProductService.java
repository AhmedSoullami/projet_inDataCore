package com.inDataCoreApp.inDataCore.service;

import com.inDataCoreApp.inDataCore.entities.Product;
import com.inDataCoreApp.inDataCore.repositories.ProductRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductService implements IServiceProduct{
    @Autowired
    private ProductRepositorie productRepositorie;
    @Override
    public List<Product> getAllProducts() {
        return productRepositorie.findAll();
    }

    @Override
    public Product ajouterProduit(Product product) {
        productRepositorie.save(product);
        return product;
    }

    @Override
    public void ajouterAleatoireProduit() {

    }
}
