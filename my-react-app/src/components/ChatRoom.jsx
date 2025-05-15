// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import UserList from "../components/UserList";
// import ChatRoom from "../components/ChatRoom";
// import { useAuth } from "../context/AuthContext";

// function ChatPage() {
//   const { user } = useAuth();
//   const [receiver, setReceiver] = useState(null);

//   if (!user) return <div className="p-10">Not logged in.</div>;

//   return (
//     <div className="h-screen flex flex-col">
//       <Navbar />
//       <div class   Name="flex flex-1">
//         <div className="w-1/3 border-r">
//           <UserList onSelect={setReceiver} />
//         </div>
//         <div className="w-2/3">
//           {receiver ? (
//             <ChatRoom currentUserId={user.userId} receiverId={receiver.userId} />
//           ) : (
//             <div className="p-10 text-gray-600">Select a user to start chatting</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

import React, { useState } from "react";

const ChatRoom = ({ messages, onSend, currentUserId, receiver }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto border rounded p-2 space-y-2 mb-4 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.senderId === currentUserId ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"
            } max-w-xs`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded p-2 mr-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${receiver.username}`}
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
