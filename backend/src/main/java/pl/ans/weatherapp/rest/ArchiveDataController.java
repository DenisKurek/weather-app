package pl.ans.weatherapp.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.ans.weatherapp.entity.City;
import pl.ans.weatherapp.entity.WeatherData;
import pl.ans.weatherapp.service.CityService;
import pl.ans.weatherapp.service.WeatherDataService;

import java.util.List;


@RestController
@RequestMapping("/api/")
public class ArchiveDataController {

    private  final WeatherDataService weatherDataService;
    private  final CityService cityService;

    @Autowired()
    public ArchiveDataController(WeatherDataService weatherDataService, CityService cityService) {
        this.weatherDataService = weatherDataService;
        this.cityService = cityService;
    }

    @GetMapping("data")
    public List<WeatherData> getData(@RequestParam() String stationId, @RequestParam() String beginDate, @RequestParam() String endDate){
        return weatherDataService.getDataForStation(stationId,beginDate, endDate);
    }

    @GetMapping("dataInfo")
    public List<Integer> fieldInfo(@RequestParam() String stationId,@RequestParam() String field, @RequestParam() String beginDate, @RequestParam() String endDate){
        return weatherDataService.fieldInfo(stationId,field,beginDate,endDate);
    }

    @GetMapping("citiesForDateRange")
    public List<City> getCities(@RequestParam() String beginDate, @RequestParam() String endDate){
        System.out.println("beginDate = " + beginDate+"endDate = " + endDate);
        return cityService.getCitiesFromDateRange(beginDate,endDate);
    }

}
