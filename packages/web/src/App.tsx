import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Authentication,
  Chat,
  CreateChat,
  EditChat,
  UserDashboard,
} from "@/Pages";
import { ChatLayout, LoadingContainer } from "@/Components";
import { useEffect } from "react";
import { Responsive } from "@/Slices/Responsive/Responsive";
import { Home } from "pages/Home/Home";
import { useUser } from "@/Hooks";
import styles from "./App.module.scss";

function App() {
  const { isFetching } = useUser({ fetchIfNotExists: true });

  useEffect(() => {
    Responsive.startDataStoreListeners();

    return Responsive.destoryStoreListeners;
  }, []);

  return (
    <>
      <LoadingContainer
        loading={isFetching}
        classes={{ root: styles.pageLoadingSpinner }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Authentication isLogin />} />
          <Route path="/register" element={<Authentication />} />

          <Route element={<ChatLayout />}>
            <Route path="/chat/new" element={<CreateChat />} />
            <Route path="/chat/:chatId/edit" element={<EditChat />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
