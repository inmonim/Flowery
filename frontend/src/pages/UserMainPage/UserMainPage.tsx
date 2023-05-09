import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserMainPage() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/writing");
  }
  return (
    <div>
      <div onClick={() => navigate("/signin")}>로그인 페이지로</div>
      <div onClick={() => navigate("/writing")}>편지쓰는 페이지로</div>
      <div onClick={() => navigate("/reservation")}>에약 페이지로</div>
      <div onClick={() => navigate("/seller/proto")}>판매자 페이지로</div>
      <div onClick={() => navigate("/release")}>
        qr 인식시 이동하는 페이지로
      </div>
    </div>
  );
}
