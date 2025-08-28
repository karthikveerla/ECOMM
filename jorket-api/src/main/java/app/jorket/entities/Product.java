package app.jorket.entities;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Component
@Entity
public class Product {
    @Id
    private int prod_id;
    private String prod_name;
    private int prod_price;
    private String prod_desc;


    public Product() {
    }

    public Product(int prod_id, String prod_name, int prod_price) {
        this.prod_id = prod_id;
        this.prod_name = prod_name;
        this.prod_price = prod_price;
    }

    public int getProd_id() {
        return prod_id;
    }
    public void setProd_id(int prod_id) {
        this.prod_id = prod_id;
    }
    public String getProd_name() {
        return prod_name;
    }
    public void setProd_name(String prod_name) {
        this.prod_name = prod_name;
    }
    public int getProd_price() {
        return prod_price;
    }
    public void setProd_price(int prod_price) {
        this.prod_price = prod_price;
    }

    @Override
    public String toString() {
        return "Product [prod_id=" + prod_id + ", prod_name=" + prod_name + ", prod_price=" + prod_price + "]";
    }
}
