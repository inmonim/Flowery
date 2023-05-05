import React, { useState, useEffect, useRef } from "react";
import PreviewModal from "./PreviewModal";
import ImageInput from "../../components/User/Writing/ImageInput";
import LetterPaper from "../../components/User/Writing/LetterPaper";
import LetterFont from "../../components/User/Writing/LetterFont";
import LetterContent from "../../components/User/Writing/LetterContent";
import VideoInput from "../../components/User/Writing/VideoInput";

export default function WritingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLetterInput, setShowLetterInput] = useState<boolean>(true);
  const [showImageInput, setShowImageInput] = useState<boolean>(true);
  const [isDrag, setIsDrag] = useState(false);

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

  // Drag시 배경 어두워지게
  const handleDragOverPage = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(true);
    event.currentTarget.classList.add("cursor-no-drop");
  };

  const handleDropPage = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
    event.currentTarget.classList.remove("cursor-no-drop");
  };

  // 다음으로 버튼
  const submitButton = () => {
    setShowModal(true);
  };

  return (
    // 전체 페이지
    <div
      onDragOver={handleDragOverPage}
      onDragLeave={handleDropPage}
      onDrop={handleDropPage}
      className={`${isDrag && "bg-gray-300"}`}
      onDragStart={(event) => event.preventDefault()}
      draggable="false"
    >
      {/* 미리보기 모달 */}
      {showModal && (
        <PreviewModal ref={modalRef} onClose={() => setShowModal(false)} />
      )}
      {/* 페이지 내용 */}
      <div
        onClick={() => {
          setShowLetterInput(!showLetterInput);
        }}
        className="flex h-[70px] items-center justify-center border-b-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <div className="flex h-[50px] mr-[7rem] justify-center items-center p-2">
          {showLetterInput ? (
            <img
              src={require("../../assets/letters/letter_open.png")}
              alt=""
              className="w-[50px] items-center"
            />
          ) : (
            <img
              src={require("../../assets/letters/letter_close.png")}
              alt=""
              className="w-[50px] items-center"
            />
          )}
          <h1 className="text-3xl ml-6 w-[20rem]">편지입력</h1>
        </div>
        {showLetterInput ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-[50px] w-[50px] ml-[7rem]"
          >
            <path
              fill="currentColor"
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-[50px] w-[50px] ml-[7rem]"
          >
            <path
              fill="currentColor"
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
            />
          </svg>
        )}
      </div>
      {showLetterInput && (
        <div>
          <div className="flex justify-center">
            <LetterContent />
          </div>
          <LetterFont />
        </div>
      )}
      {/* 영상, 이미지 첨부 */}
      <div
        onClick={() => {
          setShowImageInput(!showImageInput);
        }}
        className="flex h-[70px] items-center mt-10 justify-center border-b-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <div className="flex h-[50px] mr-[7rem] justify-center items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <g fill="none">
              <path
                fill="#000"
                d="M44 24C44 22.8954 43.1046 22 42 22C40.8954 22 40 22.8954 40 24H44ZM24 8C25.1046 8 26 7.10457 26 6C26 4.89543 25.1046 4 24 4V8ZM39 40H9V44H39V40ZM8 39V9H4V39H8ZM40 24V39H44V24H40ZM9 8H24V4H9V8ZM9 40C8.44772 40 8 39.5523 8 39H4C4 41.7614 6.23857 44 9 44V40ZM39 44C41.7614 44 44 41.7614 44 39H40C40 39.5523 39.5523 40 39 40V44ZM8 9C8 8.44772 8.44771 8 9 8V4C6.23858 4 4 6.23857 4 9H8Z"
              />
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M6 35L16.6931 25.198C17.4389 24.5143 18.5779 24.4953 19.3461 25.1538L32 36"
              />
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M28 31L32.7735 26.2265C33.4772 25.5228 34.5914 25.4436 35.3877 26.0408L42 31"
              />
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M30 12L42 12"
              />
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M36 6V18"
              />
            </g>
          </svg>
          <h1 className="text-3xl ml-6 w-[20rem]">사진/동영상 첨부</h1>
        </div>
        {showImageInput ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-[50px] w-[50px] ml-[7rem]"
          >
            <path
              fill="currentColor"
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-[50px] w-[50px] ml-[7rem]"
          >
            <path
              fill="currentColor"
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
            />
          </svg>
        )}
      </div>
      {showImageInput && (
        <div className="p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="card m-2  border-gray-400 rounded-lg transform transition-all duration-200">
              <div className="m-3">
                {/* 영상 업로드 */}
                <div className="mb-7">
                  <VideoInput />
                </div>
                {/* 이미지 업로드 */}
                <div className="mb-7">
                  <ImageInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 페이지 이동 */}
      <div className="relative h-[15vh]">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="flex">
            <div className="cursor-pointer font-bold py-2 px-4 mx-4 rounded-full bg-[#eed3b5] hover:bg-[#eed3b5]">
              <input type="button" value="건너뛰기" onClick={submitButton} />
            </div>
            <div className="cursor-pointer font-bold py-2 px-4 mx-4 rounded-full bg-[#eed3b5] hover:bg-[#eed3b5]">
              <input
                type="button"
                value="미리보기"
                onClick={submitButton}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
