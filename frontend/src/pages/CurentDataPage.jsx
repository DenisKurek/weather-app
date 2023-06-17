import { useState } from "react";
import LineChart from "./../components/LineChart";
import WebsocketDemo from "./../components/WbsocketDemo";
import axios from "axios";

export default function CurentDataPage(props) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState([]);

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //handleDatasubmit();
  };

  function handleReceivedData(data) {
    console.log("data = ", data);
    const { humidity, pressure, temp } = data.main;
    const dateId = data.dt;
    const dataObject = { dateId, temp, humidity, pressure };
    console.log(dataObject);
    setData((prev) => {
      return [...prev, dataObject];
    });
  }

  return (
    <div
      className="d-flex"
      style={{ flexGrow: 1, backgroundColor: "lightblue" }}
    >
      <form className="m-2" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="number"
              className="form-control"
              id="latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="number"
              className="form-control"
              id="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <WebsocketDemo onDataReceived={handleReceivedData} />
      <LineChart data={data} />
    </div>
  );
}
