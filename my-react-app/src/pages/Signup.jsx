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
            stompClientRef.subscribe(`/user/${user.username}/queue/topic`, (message) => {
                const receivedUser = JSON.parse(message.body);
                console.log("📥 Received user from topic:", receivedUser);
                login(receivedUser); // Save user in global state
                navigate("/chat");   // Redirect to chat
            });
        });
    }, [login, navigate, user.username]);

    const handleSignup = () => {
        if (stompClientRef && stompClientRef.connected) {
            stompClientRef.publish({
                destination: "/app/user.addUser",
                body: JSON.stringify(user),
            });
            console.log("📨 Sent signup user:", user);
        } else {
            console.error("⚠️ STOMP client is not connected");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Sign Up</h2>
                
                <input
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <input
                    value={user.nickname}
                    onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                    placeholder="Nickname"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <input
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <input
                    value={user.number}
                    onChange={(e) => setUser({ ...user, number: e.target.value })}
                    placeholder="Phone Number"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <button
                    onClick={handleSignup}
                    className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Sign Up
                </button>
                
                <p className="mt-4 text-sm text-center">
                    Already have an account? 
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
