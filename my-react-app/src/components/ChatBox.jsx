import React, { useState, useEffect, useRef } from "react";
import { connect, sendMessage } from "../WebSocket";

const ChatBox = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    connect((client) => {
      client.subscribe("/user/queue/messages", (msg) => {
        const received = JSON.parse(msg.body);
        // Check if message is from/to current selected user
        if (
          (received.senderId === selectedUser.userId && received.receiverId === currentUser.userId) ||
          (received.senderId === currentUser.userId && received.receiverId === selectedUser.userId)
        ) {
          setMessages((prev) => [...prev, received]);
        }
      });
    });
  }, [currentUser, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const msg = {
      senderId: currentUser.userId,
      receiverId: selectedUser.userId,
      content: input,
      timestamp: new Date(),
    };

    sendMessage(msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex items-center px-4 py-2 border-b bg-gray-100 font-semibold">
        Chat with: {selectedUser.username} ({selectedUser.nickname})
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs px-3 py-2 rounded shadow ${
              msg.senderId === currentUser.userId ? "ml-auto bg-blue-100" : "mr-auto bg-gray-100"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-2 border-t bg-gray-50">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
