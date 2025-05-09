import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { connect } from '../WebSocket'; // Assuming WebSocket connection helper

function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();  // Using Auth context for handling login state
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);  // To show any login errors
  const stompClientRef = useRef(null);  // Ref to hold the STOMP client instance
  const [isConnected, setIsConnected] = useState(false);  // Track WebSocket connection status

  useEffect(() => {
    // Establish WebSocket connection on component mount
    connect(
      (client) => {
        stompClientRef.current = client; // Store socket client in ref
        setIsConnected(true);  // Mark as connected

        console.log("✅ Connected to WebSocket server");
      },
      (error) => {
        setIsConnected(false); // Mark as disconnected
        setError("Failed to connect to the server.");
        console.error("WebSocket connection failed:", error);
      }
    );

    return () => {
      // Cleanup on component unmount
      if (stompClientRef.current) {
        stompClientRef.current.deactivate(); // Correct cleanup for STOMP client
      }
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = () => {
    if (!form.username || !form.password) {
      setError("Username and password are required.");
      return;
    }

    if (stompClientRef.current && stompClientRef.current.connected) {
      // Create user object from form state
      const user = {
        username: form.username,
        password: form.password,
      };

      // Publish login credentials to the backend via WebSocket
      stompClientRef.current.publish({
        destination: "/topic/user.loginUser",  // Ensure this endpoint exists on your backend
        body: JSON.stringify(user),
      });

      console.log("📨 Sent login request for user:", user);

      // Listen for response (Success or failure)
      stompClientRef.current.subscribe("/user/topic", (message) => {
        const response = JSON.parse(message.body);
        if (response.success) {
          // Login successful, redirect to dashboard or home page
          login(response.token);  // Assuming the backend sends a token or session info
          navigate("/chat");  // Or wherever you want to redirect
        } else {
          // If login fails, show the error
          setError(response.message || "Login failed. Please try again.");
        }
      });
    } else {
      console.error("⚠️ STOMP client is not connected");
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}  {/* Show error if any */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
        />
        <button
          onClick={handleSignin}
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={!isConnected}  // Disable button if WebSocket is not connected
        >
          Sign In
        </button>
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
