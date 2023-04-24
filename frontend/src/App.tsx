import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/UserMainPage/UserMainPage";
import MyGarden from "./pages/MyGarden/MyGarden";
import Landing from "./pages/Landing/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/flowery" element={<Landing />} />
        <Route path="/flowery/usermain" element={<UserMainPage />} />
        <Route path="/flowery/mygarden" element={<MyGarden />} />
      </Routes>
    </BrowserRouter>
  );
}
