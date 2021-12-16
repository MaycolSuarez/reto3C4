package co.usa.edu.ciclo4.reto2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.edu.ciclo4.reto2.Documents.Product;
import co.usa.edu.ciclo4.reto2.exceptions.ResourceNotFoundException;
import co.usa.edu.ciclo4.reto2.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product create(Product prod) {
        // Verificar si el Id viene Null
        // Verifico si el Id existe en la base de DAtos
        if (prod.getReference() == null) {
            return prod;            
        }else {
            Optional<Product> consulta = productRepository.getProductByReference(prod.getReference());
            if (consulta.isEmpty()) {
                    return productRepository.create(prod);
            }else{
                return prod;
            }           
        }
        
    }

    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    public Product getProduct(String reference) {
        Optional<Product> consulta = productRepository.getProductByReference(reference);
        if (consulta.isPresent()) {
            return consulta.get();
        }else{
            throw new ResourceNotFoundException("Product with reference: "+reference+" NotFound");
        }
    }

    public Product update( Product product){
        Optional<Product> productInDB = productRepository.getProductByReference(product.getReference());
        if(productInDB.isPresent()){
            Product productUpdate = productInDB.get();
            productUpdate.setReference(product.getReference());
            productUpdate.setCategory(product.getCategory());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setAvailability(product.getAvailability());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setQuantity(product.getQuantity());
            productUpdate.setPhotography(product.getPhotography());
            return productRepository.create(productUpdate);
        }else{
            throw new ResourceNotFoundException("Book with id: "+product.getReference()+" NotFound");
        }
    }

    public void deleteProduct(String reference){
        Optional<Product> consulta = productRepository.getProductByReference(reference);
        if (consulta.isPresent()) {
            productRepository.deleteProduct(consulta.get());
        }else{
            throw new ResourceNotFoundException("Product with reference "+reference+" Not found");
        }
    }

    public Product getProductByDescription(String description) {
        Optional<Product> consulta = productRepository.getProductByDescription(description);
        if (consulta.isPresent()) {
            return consulta.get();
        }else{
            throw new ResourceNotFoundException("Product with reference: "+description+" NotFound");
        }
    }

    
    public Product getProductByPrice(Double price) {
        Optional<Product> consulta = productRepository.getProductByPrice(price);
        if (consulta.isPresent()) {
            return consulta.get();
        }else{
            throw new ResourceNotFoundException("Product with reference: "+price+" NotFound");
        }
    }
    
}
