import React, { useState } from "react";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const [user, setUser] = useState({
    userId: "user1",
    username: "JohnDoe",
    nickname: "johnny",
  });

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen font-sans bg-gray-50 text-gray-800">
      {/* Left sidebar - User List */}
      <div className="w-1/3 border-r border-gray-300 bg-white shadow-sm overflow-y-auto">
        <header className="p-4 border-b border-gray-300 font-semibold text-lg">
          Contacts
        </header>
        <UserList onSelect={(user) => setSelectedUser(user)} />
      </div>

      {/* Right side - Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedUser ? (
          <ChatBox currentUser={user} selectedUser={selectedUser} />
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500 italic text-xl">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
