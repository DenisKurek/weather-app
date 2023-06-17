package pl.ans.weatherapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ans.weatherapp.dao.WeatherDataRepository;
import pl.ans.weatherapp.entity.WeatherData;

import java.util.List;

@Service
public class WeatherDataService {

    private final WeatherDataRepository repository;

    @Autowired
    public WeatherDataService(WeatherDataRepository repository) {
        this.repository = repository;
    }

    public List<WeatherData> getDataForStation(String stationId, String beginDate, String endDate) {
        return repository.findAllDataBetweenDatesIds(stationId,beginDate,endDate);
    }

    public List<Integer> fieldInfo(String stationId, String field, String beginDate, String endDate) {
        field =field.toLowerCase();
        System.out.println(repository.dataInfoForTemperatureBetweenDatesIds(stationId,beginDate,endDate));
        return switch (field){
            case "temperature"->repository.dataInfoForTemperatureBetweenDatesIds(stationId,beginDate,endDate);
            default -> List.of();
        };
    }
}
