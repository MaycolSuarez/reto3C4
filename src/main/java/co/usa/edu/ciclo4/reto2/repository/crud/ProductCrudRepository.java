package co.usa.edu.ciclo4.reto2.repository.crud;

import java.util.List;
import java.util.Optional;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import co.usa.edu.ciclo4.reto2.Documents.Product;

public interface ProductCrudRepository extends MongoRepository<Product, String> {

    // SELECT * FROM BOOKS WHERE id = ? -> SQL
    @Query("{reference:?0}")
    Optional<Product> findProdcutByReference(String reference);

    @Query("{description:?0}")
    Optional<Product> findProdcutByDescription(String description);

    @Query("{price:?0}")
    List<Product> findProdcutByPrice(Double price);

}
