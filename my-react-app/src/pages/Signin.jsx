// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// function Signin() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ username: "", password: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSignin = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/signin", form);
//       login(res.data); // assumes { username, userId }
//       navigate("/chat");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//         <input name="username" value={form.username} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Username" />
//         <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" placeholder="Password" />
//         <button onClick={handleSignin} className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
//         <p className="mt-3 text-sm">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</span></p>
//       </div>
//     </div>
//   );
// }

// export default Signin;
