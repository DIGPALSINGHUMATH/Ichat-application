import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/endPoint', // Replace with your server WebSocket URL
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
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

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Messages</h2>
      <ul className="list-disc pl-4">
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatClient;
