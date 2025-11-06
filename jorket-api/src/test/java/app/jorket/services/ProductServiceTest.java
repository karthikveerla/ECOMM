package app.jorket.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import app.jorket.entities.Product;
import app.jorket.repositories.ProductRepository;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    ProductRepository productrepository;

    @InjectMocks
    ProductService productservice;

    @Test
    public void addProduct_Successfully(){
    Product product = new Product();
    product.setProd_id(1);
    product.setProd_name("phone");
    product.setProd_desc("something");
    product.setProd_price(200);

    when(productrepository.save(product)).thenReturn(product);
    Product addedproduct = productservice.addProduct(product);
    assertEquals(product.getProd_id(), addedproduct.getProd_id());
    }


    // @Test
    // void deleteProduct_callsRepositoryDeleteById_withGivenId() {
    //     int id = 123;
    //     service.deleteProduct(id);
    //     verify(repo, times(1)).deleteById(id);
    //     verifyNoMoreInteractions(repo);
    // }

    // @Test
    // void deleteProduct_propagatesException_fromRepository() {
    //     int id = 999;
    //     doThrow(new EmptyResultDataAccessException(1)).when(repo).deleteById(id);
    //     assertThrows(EmptyResultDataAccessException.class, () -> service.deleteProduct(id));
    //     verify(repo).deleteById(id);
    // }
}