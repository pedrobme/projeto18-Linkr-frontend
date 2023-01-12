import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Timeline from "./Timeline";
import CreatePost from "./components/createPost";
import HashtagPage from "./HashtagPage";
import UserPage from "./UserPage";
import { UserInfoProvider } from "./userInfo";

export default function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}
