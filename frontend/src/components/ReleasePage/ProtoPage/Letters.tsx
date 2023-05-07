import React, { useState } from "react";
import letterOpen from "../../../assets/ReleasePage/letter_open.png";
import letterClose from "../../../assets/ReleasePage/letter_close.png";
import PrintCard from "../../Seller/PrintCard";

export default function Letters() {
  const nickname = "창근";

  const [showModal, setShowModal] = useState(false); // 모달 상태 초기값은 false로 설정합니다.

  function handleModal() {
    setShowModal(true); // 모달을 열기 위해 상태를 true로 변경합니다.
  }

  function closeModal() {
    setShowModal(false); // 모달을 닫기 위해 상태를 false로 변경합니다.
  }

  return (
    <div className=" flex flex-col mt-[15%] mb-[30%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[1.2rem] font-namyeong">편지</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong">
          {nickname}님이 선물해주신 꽃다발과 편지입니다.
        </p>
      </div>
      <div className="flex justify-center mt-[20%]">
        <img
          src={letterClose}
          alt="o"
          className="w-1/4 animate-heartBeat"
          onClick={handleModal}
        />
      </div>
      {showModal && <PrintCard closeModal={closeModal} />}
    </div>
  );
}
