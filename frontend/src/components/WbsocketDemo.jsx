import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";
import { getAuthToken } from "../utils/Auth";
import LineChart from "./LineChart";

export default function WebSocketComponent() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  let lastBody = " ";

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

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      function (frame) {
        setConnected(true);
        setError(null);
        console.log("Connected: " + frame);
        stompClient.subscribe("/topic/greetings", function sendData(frame) {
          if (lastBody !== frame.body) {
            lastBody = frame.body;
            handleReceivedData(JSON.parse(frame.body));
          }
        });
      },
      (error) => {
        setConnected(false);
        setError("WebSocket connection error: " + error);
      }
    );

    return () => {
      if (connected) {
        setConnected(false);
        console.log("Disconecting");
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <div className=".d-flex" style={{ flexGrow: 1 }}>
      {error && <ErrorMessage message={error} />}
      {!error && data.length === 0 ? <Loader /> : <LineChart data={data} />}
    </div>
  );
}
