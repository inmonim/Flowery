import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserMainPage() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/writing");
  }
  return <div onClick={handleNavigate}>이거본문임</div>;
}
