package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import pl.ans.weatherapp.entity.User;
import pl.ans.weatherapp.utils.TokenGenerator;

@RestController
@RequestMapping("/api/")
public class AuthenticationController {
    @Value("${jwt.secret}")
    private  String SECRET_KEY;

    @PostMapping("signUp")
    public String signUp(@RequestBody() SignUpReuest  request){
        return TokenGenerator.generateToken(new User("admin","adminPassword"),SECRET_KEY);
    }

    private record SignUpReuest(String username, String password){}

}
