package pl.ans.weatherapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@Table(name="weather_data")
public class WeatherData {

    @Id
    @Column(name="id_date")
    private String dateId;

    @Column(name="id_station")
    private String stationId;

    @Column(name = "temperature")
    private double temperature;

    @Column(name = "wind_speed")
    private double windSpeed;

    @Column(name = "wind_direction")
    private short  windDirection;

    @Column(name = "humidity")
    private double humidity;

    @Column(name = "pressure")
    private double pressure;

    @Column(name="precipitation")
    private double precipitation;

}