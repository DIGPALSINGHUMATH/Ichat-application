// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useStompClient} from "../stomp-client";

// function Signup() {
//   // const navigate = useNavigate();
//   // const { login } = useAuth();
//   // const [form, setForm] = useState({ username: "", nickname: "", password: "" });

//   // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // const handleSignup = async () => {
//   //   try {
//   //     const res = await axios.post("http://localhost:8080/signup", form);
//   //     login(res.data); // assumes { username, userId }
//   //     navigate("/chat");
//   //   } catch (err) {
//   //     alert("Signup failed");
//   //   }
//   // };
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ username: "", nickname: "", password: "" });
  
//   // WebSocket client for sending messages
//   const stompClient = useStompClient();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSignup = async () => {
//     if (!stompClient) return alert("WebSocket client not connected!");

//     const message = { username: form.username, nickname: form.nickname, password: form.password };

//     // Send the signup data to the WebSocket server
//     stompClient.send("/topic/user.addUser", {}, JSON.stringify(message));

//     // Listen for the server response and handle successful login
//     stompClient.connect({}, () => {
//       stompClient.subscribe("/User/topic", (message) => {
//         const user = JSON.parse(message.body);
//         login(user); // Assuming { username, userId }
//         navigate("/chat"); // Redirect to chat
//       });
//     });
//   };




//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <input name="username" value={form.username} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Username" />
//         <input name="nickname" value={form.nickname} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Nickname" />
//         <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Password" />
//         <button onClick={handleSignup} className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
//         <p className="mt-3 text-sm">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/")}>Sign In</span></p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React, { useState, useEffect } from 'react';
import { connect } from '../WebSocket'; // Your WebSocket connect function
import { useNavigate } from 'react-router-dom';

let stompClientRef = null;

function Signup({ login }) {
    const [user, setUser] = useState({
        username: '',
        nickname: '',
        email: '',
        number: '',
        password: '',
        status: 'ONLINE',
    });

    const navigate = useNavigate("/chat");

    useEffect(() => {
        connect((client) => {
            stompClientRef = client;

            // Subscribe to topic once connected
            stompClientRef.subscribe("/User/topic", (message) => {
                const receivedUser = JSON.parse(message.body);
                console.log("📥 Received user from topic:", receivedUser);
                login(receivedUser); // Save user in global state
                navigate("/chat");   // Redirect to chat
            });
        });
    }, [login, navigate]);

    const handleSignup = () => {
        if (stompClientRef && stompClientRef.connected) {
            stompClientRef.publish({
                destination: "/topic/user.addUser",
                body: JSON.stringify(user),
            });
            console.log("📨 Sent signup user:", user);
        } else {
            console.error("⚠️ STOMP client is not connected");
        }
    };

    return (
        <div>
            <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <input
                value={user.nickname}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                placeholder="Nickname"
            />
            <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <input
                value={user.number}
                onChange={(e) => setUser({ ...user, number: e.target.value })}
                placeholder="Phone Number"
            />
            <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default Signup;
