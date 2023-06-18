package pl.ans.weatherapp.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ans.weatherapp.dao.UserRepository;
import pl.ans.weatherapp.entity.User;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.getUsersByRole("USER").stream().toList();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User getUser(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Transactional
    public void deleteUser(String username) {
       userRepository.deleteUserByUsername(username);
    }

}
