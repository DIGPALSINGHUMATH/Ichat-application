import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs'; // Import STOMP Client
import SockJS from 'sockjs-client'; // Import SockJS

// Custom hook for managing WebSocket (STOMP) connection
export const useStompClient = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Initialize STOMP client
    const stompClient = new Client({
      brokerURL: 'http: //localhost:8080/endPoint', // WebSocket endpoint in Spring Boot
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // Reconnect after 5 seconds
      webSocketFactory: () => new SockJS('http://localhost:8080/endPoint'), // SockJS fallback for WebSocket

      onConnect: (frame) => {
        console.log('Connected: ', frame);
        console.log('Server Info: ', frame.headers['server']);

        stompClient.subscribe('/topic/messages', (message) => {
          console.log('Received: ', message.body);
          setMessages(prev => [...prev, message.body]);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error: ', frame.headers['message']);
        console.error('Details: ', frame.body);
      },
    });

    // Connect to WebSocket
    stompClient.activate();
    setClient(stompClient);

    // Set the client in state for use in components
  //   setClient(stompClient);
  //   client.connect({}, function(frame) {
  //     console.log("Connected: " + frame);
  //     console.log("Server: " + frame.server);  // Check if server info is provided here
  // });

    // Cleanup on unmount (disconnect WebSocket)
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return client;
};
