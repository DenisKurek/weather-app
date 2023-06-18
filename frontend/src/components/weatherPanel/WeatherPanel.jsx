import { useState, useEffect } from "react";
import axiosInstance from "../../utils/authInterceptor";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import LocationSelectionForm from "./LocationForm";

import ErrorMessage from "../../UI/ErrorMessage";

export default function WeatherPanel(props) {
  const [appid, setAppid] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAppid() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/appid"
        );
        setAppid(response.data);
      } catch (error) {
        setError("server is not responding");
      }
    }
    getAppid();
  }, []);

  async function getWeatherData(cityName) {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: cityName,
            appid: appid,
          },
        }
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      const { cod, message } = error.response.data;
      setWeatherData(null);
      setError(`${cod}: ${message}`);
    }
  }

  return (
    <div style={{ flexGrow: 2 }}>
      <LocationSelectionForm onSubmit={getWeatherData} />
      {weatherData && <WeatherDisplay data={weatherData} />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
