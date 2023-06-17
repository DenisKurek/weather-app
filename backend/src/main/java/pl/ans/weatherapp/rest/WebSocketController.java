package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import pl.ans.weatherapp.utils.RandomNumberGenerator;

import java.net.URI;

@Controller
public class WebSocketController {

    @Value("${opewatherapp.appid}")
    private String appid;

    private double temp = 20;
    private double humidity = 30;
    private double pressure = 1000;
    private final SimpMessagingTemplate messagingTemplate;
    private final WebClient webClient = WebClient.create();

    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private final URI uri = UriComponentsBuilder
            .fromUriString("https://api.openweathermap.org/data/2.5/weather")
            .queryParam("lat", "24")
            .queryParam("lon", "35")
            .queryParam("appid",  appid)
            .build()
            .toUri();

//    @MessageMapping("/hello")
//    public void greeting(String message) throws Exception {
//        System.out.println("message = " + message);
//        //scheduleResponseSending();
//        scheduleDummyDataResponseSending();
//    }
    @Scheduled(fixedDelay = 10000)
    public void scheduleDummyDataResponseSending(){
        temp = RandomNumberGenerator.modify(temp);
        humidity = RandomNumberGenerator.modify(humidity);
        pressure = RandomNumberGenerator.modify(pressure);

        String dummyResponse = """
                {
                "main":
                    {
                         "temp": %s,
                         "pressure": %s,
                         "humidity": %s
                     },
                 "dt": "dummyData"
                }
                """.formatted(temp,pressure,humidity);

        //System.out.println("dummyResponse = " + dummyResponse);
        messagingTemplate.convertAndSend("/topic/greetings", dummyResponse);
    }

//    @Scheduled(fixedDelay = 65000)
//    public void scheduleResponseSending() {
//        String response = webClient.get()
//                .uri(uri)
//                .retrieve()
//                .bodyToMono(String.class)
//                .block();
//        System.out.println(" sending Request " + response );
//        messagingTemplate.convertAndSend("/topic/greetings", response);
//    }
}