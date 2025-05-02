// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-3">
//       <h1 className="font-bold text-xl">Schat</h1>
//       <div className="flex items-center space-x-4">
//         <span>{user?.username}</span>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
