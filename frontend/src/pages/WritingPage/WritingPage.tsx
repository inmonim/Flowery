import React, { useState, useEffect, useRef } from "react";
import styles from "./WritingPage.module.scss";
import PreviewModal from "./PreviewModal";
import ImageInput from "../../components/User/Writing/ImageInput";
import LetterPaper from "../../components/User/Writing/LetterPaper";
import LetterFont from "../../components/User/Writing/LetterFont";
import LetterContent from "../../components/User/Writing/LetterContent";
import VideoInput from "../../components/User/Writing/VideoInput";

export default function WritingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
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
      <div className={styles.contents}>
        {/* 편지 */}
        <div className={styles.letter}>
          {/* 편지지 고르기 */}
          {/* {LetterPaper()} */}
          {/* 편지지 */}
          {LetterContent()}
        </div>
        {/* 글씨체 고르기 */}
        {LetterFont()}
      </div>
      {/* 영상 업로드 */}
      <div className="p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="card m-2  border-gray-400 rounded-lg transform transition-all duration-200">
            <div className="m-3">
              <div className="flex justify-center">{VideoInput()}</div>
            </div>
          </div>
        </div>
      </div>
      {/* 이미지 업로드 */}
      <div className="p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="card m-2  border-gray-400 rounded-lg transform transition-all duration-200">
            <div className="m-3">
              <div className="flex justify-center">{ImageInput()}</div>
            </div>
          </div>
        </div>
      </div>
      {/* 페이지 이동 */}
      <div className={styles.handlePage}>
        <input type="button" value="이전으로" />
        <input type="button" value="건너뛰기" onClick={submitButton} />
        <button onClick={submitButton}>다음으로</button>
      </div>
    </div>
  );
}
