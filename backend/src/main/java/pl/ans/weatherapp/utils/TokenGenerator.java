package pl.ans.weatherapp.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import pl.ans.weatherapp.entity.User;

public class TokenGenerator {

    public static String generateToken(User user ,String secretKey) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }
}
