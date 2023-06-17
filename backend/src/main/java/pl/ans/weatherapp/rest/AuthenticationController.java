package pl.ans.weatherapp.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class AuthenticationController {

    @PostMapping("signUp")
    public String signUp(@RequestBody() SignUpReuest  request){//@RequestParam("username") String username, @RequestParam("password") String password){
        return "%s->%s".formatted(request.username,request.password);
    }

    private record SignUpReuest(String username, String password){}

}
