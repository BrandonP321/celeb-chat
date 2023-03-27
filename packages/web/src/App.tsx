import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Chat } from "@/Pages";
import { AppLayout } from "@/Components";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App;
