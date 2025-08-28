package app.jorket.services;

import app.jorket.entities.Product;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.jorket.repositories.ProductRepository;

@Service
public class ProductService {


    @Autowired
    ProductRepository repo;

    // List<Product> products = new ArrayList<>(Arrays.asList(new Product(101,"iphone",25000), new Product(102,"samsung",20000)));

    public List<Product> getAllProducts() {
        return repo.findAll(); 
    }

    public Product getProductById(int id){
        return repo.findById(id).orElse(new Product());
    }

    public void addProduct(Product product){
        repo.save(product);
    }   

    public void updateProduct(Product product){
        repo.save(product);
    }


    public void deleteProduct(int id){
        repo.deleteById(id);
    }
}
