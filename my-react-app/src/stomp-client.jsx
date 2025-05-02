import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs'; // Import STOMP Client
import SockJS from 'sockjs-client'; // Import SockJS

// Custom hook for managing WebSocket (STOMP) connection
export const useStompClient = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Initialize STOMP client
    const stompClient = new Client({
      brokerURL: 'http://localhost:8080/endPoint', // WebSocket endpoint in Spring Boot
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // Reconnect after 5 seconds
      webSocketFactory: () => new SockJS('http://localhost:8080/endPoint'), // SockJS fallback for WebSocket
    });

    // Connect to WebSocket
    stompClient.activate();

    // Set the client in state for use in components
    setClient(stompClient);

    // Cleanup on unmount (disconnect WebSocket)
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return client;
};
