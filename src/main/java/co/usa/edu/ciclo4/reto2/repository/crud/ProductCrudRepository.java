package co.usa.edu.ciclo4.reto2.repository.crud;

import java.util.Optional;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import co.usa.edu.ciclo4.reto2.Documents.Product;

public interface ProductCrudRepository extends MongoRepository<Product, String> {

    // SELECT * FROM BOOKS WHERE id = ? -> SQL
    @Query("{reference:?0}")
    Optional<Product> findProdcutByReference(String reference);

}
