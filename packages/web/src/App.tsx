import React, { useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Chat } from "@/Pages";
import { AppLayout } from "@/Components";

function App() {
  const chatCache = useRef<Chat.ChatCache>({});

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/chat/:chatId" element={<Chat chatCache={chatCache} />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App;
