// src/App.jsx
// import React, { useState } from 'react';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ChatPage from "./pages/ChatPage";
// import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import './App.css';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Signin />} /> */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}
      </Routes>
    </Router>

    </>
  );
}

export default App;
