package com.inDataCoreApp.inDataCore.service;

import com.inDataCoreApp.inDataCore.entities.Product;

import java.util.List;

public interface IServiceProduct {
     List<Product> getAllProducts();
     Product ajouterProduit(Product product);
     void ajouterAleatoireProduit();

}
