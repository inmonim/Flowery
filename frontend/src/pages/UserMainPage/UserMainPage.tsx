import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserMainPage() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/writing");
  }
  return (
    <div onClick={handleNavigate} className="flex flex-col">
      <Link to="/reservation">예약 페이지입니다</Link>
      <Link to="/release">qr 체크시 이동하는 페이지입니다</Link>
      <Link to="/seller/proto">판매자 페이지입니다</Link>
    </div>
  );
}
