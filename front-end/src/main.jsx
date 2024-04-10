import React from "react";
import ReactDOM from "react-dom/client";
import Home from "../components/home/Home.jsx";
import Contact from "../components/contact-us/Contact.jsx"
import "./index.css";
import Navbar from "../components/navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
