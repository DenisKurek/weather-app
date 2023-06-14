package pl.ans.weatherapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ans.weatherapp.dao.CityRepository;
import pl.ans.weatherapp.dao.WeatherDataRepository;
import pl.ans.weatherapp.entity.City;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;
    private final WeatherDataRepository weatherDataRepository;

    @Autowired
    public CityService( CityRepository cityRepository, WeatherDataRepository weatherDataRepository) {
        this.cityRepository = cityRepository;
        this.weatherDataRepository = weatherDataRepository;
    }

    public List<City> getCitiesFromWeatherData() {
        var ids = weatherDataRepository.findAllDistinctStationIds();
        return cityRepository.findAllByIdArchiveIn(ids);
    }

    public List<City> getCitiesFromDateRange(String beginDate, String endDate) {
        return cityRepository.getCitiesFromRange(beginDate, endDate);
    }
}
