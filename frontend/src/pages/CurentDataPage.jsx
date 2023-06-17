import WebsocketDemo from "../components/WbsocketDemo";
import WeatherPanel from "../components/weatherPanel/WeatherPanel";

export default function CurentDataPage(props) {
  return (
    <div
      className="d-flex"
      style={{ flexGrow: 1, backgroundColor: "lightblue" }}
    >
      <WeatherPanel />
      <WebsocketDemo />
    </div>
  );
}
