export default function WeatherDisplay(props) {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="card-title">Weather Information</h2>
      </div>
      <div className="card-body bg-info">
        <p className="card-text">
          <strong>City:</strong> {props.data.name}
        </p>
        <p className="card-text">
          <strong>Temperature:</strong> {props.data.main.temp}°C
        </p>
        <p className="card-text">
          <strong>Humidity:</strong> {props.data.main.humidity}%
        </p>
        <p className="card-text">
          <strong>Pressure:</strong> {props.data.main.pressure}hPa
        </p>
        <p className="card-text">
          <strong>Weather Description:</strong>{" "}
          {props.data.weather[0].description}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`}
          alt="Weather Icon"
          className="img-fluid"
        />
      </div>
    </div>
  );
}
