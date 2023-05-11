import React, { useState, useEffect, useRef } from "react";
import letterClose from "../../../assets/ReleasePage/letter_close.png";
import ReleaseLetterPreviewModal from "../Writing/ReleaseLetterPreviewModal";
import ReleaseLetterPreview from "../Writing/ReleaseLetterPreview";

export default function Letters() {
  const nickname = "창근";

  const [showModal, setShowModal] = useState(false); // 모달 상태 초기값은 false로 설정합니다.

  function handleModal() {
    setShowModal(true); // 모달을 열기 위해 상태를 true로 변경합니다.
  }

  function closeModal() {
    setShowModal(false); // 모달을 닫기 위해 상태를 false로 변경합니다.
  }
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Modal 이외의 곳을 클릭 하면 Modal 닫힘
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  // esc를 누르면 Modal 닫힘
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setShowModal(false);
    }
  };

  return (
    <div className=" flex flex-col mt-[15%] mb-[15%]">
      {/* {showModal && (
        <ReleaseLetterPreviewModal
          ref={modalRef}
          onClose={() => setShowModal(false)}
        />
      )} */}
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[1.2rem] font-namyeong">편지</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong pt-2">
          {nickname}님이 선물해주신 꽃다발과 편지입니다.
        </p>
      </div>
      <ReleaseLetterPreview />
      {/* <div className="flex justify-center mt-[20%]">
        <img
          src={letterClose}
          alt=""
          className="w-1/4 animate-heartBeat cursor-pointer"
          onClick={handleModal}
        />
      </div> */}
    </div>
  );
}
