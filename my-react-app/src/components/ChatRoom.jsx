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
//       <div className="flex flex-1">
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
