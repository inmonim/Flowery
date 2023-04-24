import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/UserMainPage/UserMainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usermain" element={<UserMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
