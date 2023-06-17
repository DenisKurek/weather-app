import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function WebSocketComponent(props) {
  const [connected, setConnected] = useState(false);
  let lastBody = " ";
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
            props.onDataReceived(JSON.parse(frame.body));
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
    <div>
      {/* <button
        onClick={() => stompClient.send("/app/hello", {}, "Hello, World!")}
      >
        Send Greeting
      </button> */}
    </div>
  );
}
