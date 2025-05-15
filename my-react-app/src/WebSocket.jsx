import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export function connect(onConnected) {
    stompClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        reconnectDelay: 5000,
        onConnect: (frame) => {
            console.log("✅ Connected to server", frame);
            if (onConnected) onConnected(stompClient);
        },
        onStompError: (frame) => {
            console.error("❌ STOMP error:", frame);
        }
    });

    stompClient.activate();
}

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });
    } else {
      console.error("Not connected to WebSocket");
    }
  };