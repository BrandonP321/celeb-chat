import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Authentication, Chat, CreateChat, UserDashboard } from "@/Pages";
import { ChatLayout } from "@/Components";
import { useEffect } from "react";
import { Responsive } from "@/Slices/Responsive/Responsive";

function App() {
  useEffect(() => {
    Responsive.startDataStoreListeners();

    return Responsive.destoryStoreListeners;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Authentication isLogin />} />
        <Route path="/register" element={<Authentication />} />

        <Route element={<ChatLayout />}>
          <Route path="/chat/new" element={<CreateChat />} />
          <Route path="/chat/edit" element={<h1>Edit Chat</h1>} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
