package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ans.weatherapp.entity.User;
import pl.ans.weatherapp.service.UserService;
import pl.ans.weatherapp.utils.TokenGenerator;

@RestController
@RequestMapping("/api/")
public class AuthenticationController {
    @Value("${jwt.secret}")
    private  String SECRET_KEY;

    private final UserService userService;
    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("signUp")
    public ResponseEntity<String> signUp(@RequestBody() SignUpReuest  request){
        User user = userService.getUser(request.username);
        if(user.getPassword().equals(request.password)) {
            return ResponseEntity.ok(TokenGenerator.generateToken(user, SECRET_KEY));
        }
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad Credentials");
        }

    private record SignUpReuest(String username, String password){}

}
