package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import pl.ans.weatherapp.utils.RandomNumberGenerator;

import java.time.LocalDateTime;

@Controller
public class WebSocketController {

    @Value("${opewatherapp.appid}")
    private String appid;

    private double temp = 20;
    private double humidity = 30;
    private double pressure = 1000;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 10000)
    public void scheduleDummyDataResponseSending(){
        temp = RandomNumberGenerator.modify(temp);
        humidity = RandomNumberGenerator.modify(humidity);
        pressure = RandomNumberGenerator.modify(pressure);
        var now = LocalDateTime.now();
        String label = "%s:%s:%s".formatted(now.getHour(),now.getMinute(),now.getSecond());

        String dummyResponse = """
                {
                "main":
                    {
                         "temp": %s,
                         "pressure": %s,
                         "humidity": %s
                     },
                 "dt": "%s"
                }
                """.formatted(temp,pressure,humidity,label);

        messagingTemplate.convertAndSend("/topic/greetings", dummyResponse);
    }
}