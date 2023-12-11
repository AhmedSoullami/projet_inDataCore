package com.inDataCoreApp.inDataCore;

import com.inDataCoreApp.inDataCore.entities.Product;
import com.inDataCoreApp.inDataCore.entities.Utilisateur;
import com.inDataCoreApp.inDataCore.service.ProductService;
import com.inDataCoreApp.inDataCore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@SpringBootApplication
public class InDataCoreApplication {


	public static void main(String[] args) {
		SpringApplication.run(InDataCoreApplication.class, args);
	}
	@Autowired
	ProductService productService;
	@PostConstruct
	public void init() {
		try {
			BufferedReader bufferedReader = new BufferedReader(new FileReader("src/file.csv"));
			String line;


			bufferedReader.readLine();

			while ((line = bufferedReader.readLine()) != null) {
				String[] attributes = line.split(",");
				Product product = new Product();


				product.setName(attributes[1].trim());
				product.setDescription(attributes[2].trim());

				if (!attributes[3].trim().isEmpty()) {
					product.setPrice(Double.parseDouble(attributes[3].trim()));
				}

				productService.ajouterProduit(product);
			}

			bufferedReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
