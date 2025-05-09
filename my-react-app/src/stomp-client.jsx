// import { useEffect, useState } from 'react';
// import { Client } from '@stomp/stompjs'; // Import STOMP Client
// import SockJS from 'sockjs-client'; // Import SockJS

// // Custom hook for managing WebSocket (STOMP) connection
// export const useStompClient = () => {
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     // Initialize STOMP client
//     const [isConnected, setIsConnected] = useState(false);

//     const stompClient = new Client({
//       brokerURL: 'http: //localhost:8080/endPoint', // WebSocket endpoint in Spring Boot
//       connectHeaders: {},
//       debug: (str) => {
//         console.log(str);
//       },
//       reconnectDelay: 5000, // Reconnect after 5 seconds
//       webSocketFactory: () => new SockJS('http://localhost:8080/endPoint'), // SockJS fallback for WebSocket

//       onConnect: (frame) => {
//         console.log('Connected: ', frame);
//         console.log('Server Info: ', frame.headers['server']);

//         stompClient.subscribe('/topic/messages', (message) => {
//           console.log('Received: ', message.body);
//           setMessages(prev => [...prev, message.body]);
//         });
//       },
//       onStompError: (frame) => {
//         console.error('STOMP error: ', frame.headers['message']);
//         console.error('Details: ', frame.body);
//       },
//     });

//     // Connect to WebSocket
//     stompClient.activate();
//     setClient(stompClient);

//     // Set the client in state for use in components
//   //   setClient(stompClient);
//   //   client.connect({}, function(frame) {
//   //     console.log("Connected: " + frame);
//   //     console.log("Server: " + frame.server);  // Check if server info is provided here
//   // });

//     // Cleanup on unmount (disconnect WebSocket)
//     return () => {
//       stompClient.deactivate();
//     };
//   }, []);

//   return client;
// };

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { connect } from '../WebSocket'; // Import WebSocket connection function

function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Auth context to store login state (e.g., token)
  
  // Form state for user input
  const [form, setForm] = useState({ username: "", password: "" });
  
  // Error message state
  const [error, setError] = useState(null);

  // Tracks whether WebSocket is connected
  const [isConnected, setIsConnected] = useState(false);

  // Ref to store STOMP client instance
  const stompClientRef = useRef(null);

  // Ref to store subscription so we don't re-subscribe multiple times
  const subscriptionRef = useRef(null);

  // Establish WebSocket connection on component mount
  useEffect(() => {
    connect((client) => {
      // Save the connected STOMP client
      stompClientRef.current = client;

      // Mark WebSocket as connected so UI and login can proceed
      setIsConnected(true);

      // Subscribe only once to the response topic
      if (!subscriptionRef.current) {
        subscriptionRef.current = client.subscribe("/user/topic", (message) => {
          const response = JSON.parse(message.body);

          if (response.success) {
            // Successful login: save token and navigate
            login(response.token);
            navigate("/chat");
          } else {
            // Show backend error message if login failed
            setError(response.message || "Login failed. Please try again.");
          }
        });
      }
    });

    // Cleanup on unmount: disconnect STOMP client
    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  // Handle input changes in form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle sign-in button click
  const handleSignin = () => {
    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }

    // If STOMP client is not connected, show error
    if (!isConnected || !stompClientRef.current?.connected) {
      setError("WebSocket not connected. Please wait...");
      return;
    }

    // Prepare user object to send to backend
    const user = {
      username: form.username,
      password: form.password,
    };

    // Send login message via STOMP WebSocket
    stompClientRef.current.publish({
      destination: "/topic/user.addUser", // Must match your backend route
      body: JSON.stringify(user),
    });

    console.log("📨 Login request sent:", user);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        {/* Show error message if any */}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Username input */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
        />

        {/* Password input */}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
        />

        {/* Sign In button (disabled if not connected) */}
        <button
          onClick={handleSignin}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={!isConnected}
        >
          {isConnected ? "Sign In" : "Connecting..."}
        </button>

        {/* Link to Sign Up page */}
        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
