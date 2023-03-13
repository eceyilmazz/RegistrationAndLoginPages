import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "pages/LoginPage.js";
import HomePage from "pages/Home.js";
import RegisterPage from "pages/Register.js";

import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <GlobalStyles />

      <ToastContainer theme="colored"></ToastContainer>

      <Router>
        <Routes>
       
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>

        </Routes>
      </Router>
    </>
  );
}