import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Authentication,
  Chat,
  CreateChat,
  EditChat,
  PasswordReset,
  RequestPasswordReset,
  UserDashboard,
  Home,
  ChatHome,
  PageNotFound,
} from "@/Pages";
import { EmailBody, PasswordResetEmailBody } from "@/Pages/DevPages";
import {
  LoadingContainer,
  AppLayout,
  AuthenticatedAppLayout,
} from "@/Components";
import { useEffect } from "react";
import { Responsive } from "@/Slices/Responsive/Responsive";
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
          <Route element={<AppLayout showChatNavLink />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/login" element={<Authentication isLogin />} />
            <Route path="/register" element={<Authentication />} />

            <Route path="/password/reset" element={<PasswordReset />} />
            <Route
              path="/password/reset/request"
              element={<RequestPasswordReset />}
            />
          </Route>

          <Route element={<AuthenticatedAppLayout withChatSidebar />}>
            <Route path="/chats" element={<ChatHome />} />
            <Route path="/chat/new" element={<CreateChat />} />
            <Route path="/chat/:chatId/edit" element={<EditChat />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* DEV PAGES */}
          <Route element={<EmailBody />}>
            <Route
              path="/_dev/email/password-reset"
              element={<PasswordResetEmailBody />}
            />
          </Route>

          <Route element={<AppLayout showChatNavLink />}>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
