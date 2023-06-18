package pl.ans.weatherapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "users")
@Getter
public class User {

    public User(){}

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    @Id
    @Column(name="username", nullable = false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;
}
