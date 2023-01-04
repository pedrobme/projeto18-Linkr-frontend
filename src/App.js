import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Cadastro />}/>
      </Routes>
    </BrowserRouter>
  );
}


