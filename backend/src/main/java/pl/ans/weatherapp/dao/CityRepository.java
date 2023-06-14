package pl.ans.weatherapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.ans.weatherapp.entity.City;

import java.util.Collection;
import java.util.List;


@Repository
public interface CityRepository extends JpaRepository<City,Integer> {
    List<City> findAllByIdArchiveIn(Collection<String> data);

    @Query("select distinct c from City c inner join WeatherData wd on wd.stationId = c.idArchive WHERE wd.dateId >= :beginDate AND wd.dateId <= :endDate")
    List<City> getCitiesFromRange(String beginDate, String endDate);
}
