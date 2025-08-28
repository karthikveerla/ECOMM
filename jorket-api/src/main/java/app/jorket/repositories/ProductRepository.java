package app.jorket.repositories;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.jorket.entities.Product;


@Repository
public interface ProductRepository extends JpaRepository< Product,Integer> {

    
} 
