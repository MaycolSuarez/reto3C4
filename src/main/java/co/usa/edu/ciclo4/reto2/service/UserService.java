package co.usa.edu.ciclo4.reto2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.edu.ciclo4.reto2.Documents.User;
import co.usa.edu.ciclo4.reto2.exceptions.ResourceNotFoundException;
import co.usa.edu.ciclo4.reto2.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        
        //obtiene el maximo id existente en la coleccion
        Optional<User> userIdMaximo = userRepository.lastUserId();
        
        //si el id del Usaurio que se recibe como parametro es nulo, entonces valida el maximo id existente en base de datos
        if (user.getId() == null) {
            //valida el maximo id generado, si no hay ninguno aun el primer id sera 1
            if (userIdMaximo.isEmpty())
                user.setId(1);
            //si retorna informacion suma 1 al maximo id existente y lo asigna como el codigo del usuario
            else
                user.setId(userIdMaximo.get().getId() + 1);
        }
        
        Optional<User> e = userRepository.getUser(user.getId());
        if (e.isEmpty()) {
            if (emailExists(user.getEmail())==false){
                return userRepository.create(user);
            }else{
                return user;
            }
        }else{
            return user;
        }
        
    }

    public List<User> getAllUsers(){
        return userRepository.getAll();
    }

    // public Optional<User> getUser(int id) {
        
    //     return userRepository.getUser(id);
    // }

    public Optional<User> getUser(int id){
        Optional<User> consulta = userRepository.getUser(id);
        if (consulta.isEmpty()) {
            throw new ResourceNotFoundException("User with id: "+id+" Not found");
        } else {
            return consulta;
        }
    }

    public boolean emailExists(String email) {
        return userRepository.emailExists(email);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> usuario = userRepository.authenticateUser(email, password);

        if (usuario.isEmpty()) {
            return new User();
        } else {
            return usuario.get();
        }
    }

    public User updateUser(User user){
        if (user.getId() != null) {
            Optional<User> userDb = userRepository.getUser(user.getId());
            if (!userDb.isEmpty()) {
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }
                
                userRepository.update(userDb.get());
                return userDb.get();
            }else{
                throw new ResourceNotFoundException("User with email: "+user.getEmail()+" NotFound");
            }
        }else{
            return user;
        }
    }

    public boolean delete(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public Optional<User> findUserByBirthday(String day){
        Optional<User> consulta = userRepository.findUserByBirthday(day);
        if (consulta.isEmpty()) {
            throw new ResourceNotFoundException("User with day: "+day+" Not found");
        } else {
            return consulta;
        }
    }

}