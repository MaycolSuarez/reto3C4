package co.usa.edu.ciclo4.reto2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.usa.edu.ciclo4.reto2.Documents.Product;
import co.usa.edu.ciclo4.reto2.repository.crud.ProductCrudRepository;


@Repository
public class ProductRepository {

    @Autowired
    private ProductCrudRepository productCrudRepository;

    public Product create(Product product) {
        return productCrudRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productCrudRepository.findAll();
    }

    public Optional<Product> getProductByReference(String reference) {
        return productCrudRepository.findProdcutByReference(reference);
    }

    public void deleteProduct(Product product) {
        productCrudRepository.delete(product);
    }

    public List<Product> findByDescriptionLikeIgnoreCase(String description){
        return productCrudRepository.findByDescriptionLikeIgnoreCase(description);
    }

    public List<Product> getProductByPrice(Double price){
        return productCrudRepository.findProdcutByPrice(price);
    }

    
}
