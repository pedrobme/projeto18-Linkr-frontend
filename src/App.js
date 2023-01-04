import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './Login';
import {AuthProvider} from "./auth"


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<Cadastro />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}


