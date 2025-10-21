package app.jorket.entities;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    private int prod_id;
    private String prod_name;
    private int prod_price;
    private String prod_desc;

    @Override
    public String toString() {
        return "Product [prod_id=" + prod_id + ", prod_name=" + prod_name + ", prod_price=" + prod_price + "]";
    }
}
