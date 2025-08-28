package app.jorket.services;

import app.jorket.entities.Product;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProductService {

    List<Product> products = new ArrayList<>(Arrays.asList(new Product(101,"iphone",25000), new Product(102,"samsung",20000)));

    public List<Product> getAllProducts() {
        return products; 
    }

    public Product getProductById(int id){
        return products.stream()
                .filter(p -> p.getProd_id() == id)
                .findFirst().get();
    }

    public void addProduct(Product product){
        products.add(product);
    }   
}
