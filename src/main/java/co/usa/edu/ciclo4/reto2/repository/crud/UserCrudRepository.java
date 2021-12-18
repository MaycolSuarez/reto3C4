package co.usa.edu.ciclo4.reto2.repository.crud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Query;

import co.usa.edu.ciclo4.reto2.Documents.User;

public interface UserCrudRepository extends MongoRepository<User, Integer> {


    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);
    
    //Para seleccionar el usuario con el id maximo
    Optional<User> findTopByOrderByIdDesc();

    /**
	 * método para hallar usuarios por mes de cumpleaños
	 */
	List<User> findByMonthBirthtDay(String monthBirthtDay);
    //@Query("{monthBirthtDay:?0}")
    Optional<User> findBymonthBirthtDay(String day);
    // @Query("{email: ?0}") //SQL -> select * from Users where email = ?
    // Optional<User> findByEmail(String email);

    // @Query("{email:?0,password:?1}")//SQL -> select * from Users where email = ? and password = ?
    // Optional<User> findByEmailAndPassword(String email,String password);
    // //@Query("{$and:[{email:0?},{password:1?}]}")
    


}
