import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useStompClient} from "../stomp-client";

function Signup() {
  // const navigate = useNavigate();
  // const { login } = useAuth();
  // const [form, setForm] = useState({ username: "", nickname: "", password: "" });

  // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSignup = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:8080/signup", form);
  //     login(res.data); // assumes { username, userId }
  //     navigate("/chat");
  //   } catch (err) {
  //     alert("Signup failed");
  //   }
  // };
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", nickname: "", password: "" });
  
  // WebSocket client for sending messages
  const stompClient = useStompClient();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    if (!stompClient) return alert("WebSocket client not connected!");

    const message = { username: form.username, nickname: form.nickname, password: form.password };

    // Send the signup data to the WebSocket server
    stompClient.send("/topic/user.addUser", {}, JSON.stringify(message));

    // Listen for the server response and handle successful login
    stompClient.connect({}, () => {
      stompClient.subscribe("/User/topic", (message) => {
        const user = JSON.parse(message.body);
        login(user); // Assuming { username, userId }
        navigate("/chat"); // Redirect to chat
      });
    });
  };




  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input name="username" value={form.username} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Username" />
        <input name="nickname" value={form.nickname} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Nickname" />
        <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Password" />
        <button onClick={handleSignup} className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
        <p className="mt-3 text-sm">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/")}>Sign In</span></p>
      </div>
    </div>
  );
}

export default Signup;
