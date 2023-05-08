import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserMainPage() {
  const navigate = useNavigate();

  return (
    <div>
      이거본문임
      <div onClick={() => navigate("/writing")}>편지쓰는 페이지로</div>
      <div onClick={() => navigate("/signin")}>로그인 페이지로</div>
    </div>
  );
}
