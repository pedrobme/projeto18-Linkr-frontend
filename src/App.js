import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro";
import Login from "./Login";
import { AuthProvider } from "./auth";
import Timeline from './Timeline';
import CreatePost from "./components/createPost";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
          <Route path="/timeline" element={<Timeline />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
