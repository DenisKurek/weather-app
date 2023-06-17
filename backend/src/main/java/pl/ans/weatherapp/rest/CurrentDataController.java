package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/")
public class CurrentDataController {

    @Value("${opewatherapp.appid}")
    private String appId;

    @GetMapping("appid")
    public String getDataForCity(){
       return appId;
    }



}
