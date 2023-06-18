package pl.ans.weatherapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.ans.weatherapp.entity.User;

import java.util.Collection;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    void deleteUserByUsername(String username);

    User getUserByUsername(String username);

    Collection<User> getUsersByRole(String Role);

}
