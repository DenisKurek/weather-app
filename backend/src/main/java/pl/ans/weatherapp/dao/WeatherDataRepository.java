package pl.ans.weatherapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.ans.weatherapp.entity.WeatherData;

import java.util.List;


@Repository
public interface WeatherDataRepository extends JpaRepository<WeatherData,Integer> {
    @Query("SELECT wd FROM WeatherData wd WHERE wd.stationId = :stationId AND wd.dateId >= :startDate AND wd.dateId  <= :endDate ORDER BY wd.dateId")
    List<WeatherData> findAllDataBetweenDatesIds(String stationId,String startDate, String endDate);

    @Query("SELECT DISTINCT (wd.stationId) FROM WeatherData wd")
    List<String> findAllDistinctStationIds();
    @Query("SELECT min(wd.temperature),max(wd.temperature),avg(wd.temperature) FROM WeatherData wd WHERE wd.stationId = :stationId AND wd.dateId >= :startDate AND wd.dateId  <= :endDate")
    List<Integer> dataInfoForTemperatureBetweenDatesIds(String stationId, String startDate, String endDate);
}
