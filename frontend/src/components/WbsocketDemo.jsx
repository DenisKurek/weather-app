import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Loader from "../UI/Loader";
import LineChart from "./LineChart";

export default function WebSocketComponent() {
  const [connected, setConnected] = useState(false);
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
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      function (frame) {
        setConnected(true);
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
        console.error("WebSocket connection error:", error);
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
      {data.length === 0 ? <Loader /> : <LineChart data={data} />}
    </div>
  );
}
