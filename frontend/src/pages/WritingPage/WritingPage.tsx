import React, { useState, useEffect, useRef } from "react";
import styles from "./WritingPage.module.scss";
import { useRecoilState } from "recoil";
import {
  imageState,
  letterPaperState,
  letterFontState,
  totalTextState,
} from "../../recoil/atom";
import PreviewModal from "./PreviewModal";
import ImageInput from "../../components/User/Writing/ImageInput";

export default function WritingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useRecoilState<File | null>(imageState);
  const [isDrag, setIsDrag] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);
  const [letterContent, setLetterContent] =
    useRecoilState<string>(totalTextState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 4;

  const imageInput = useRef<HTMLInputElement>(null);
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

  // 이미지 업로드
  const onClickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileType = file[0].type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        setImage(file[0]);
      } else {
        alert("이미지 또는 동영상 파일만 업로드 가능합니다.");
      }
    }
  };

  // Drag & Drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files;
    if (file && file.length > 0) {
      const fileType = file[0].type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        setImage(file[0]);
      } else {
        alert("이미지 또는 동영상 파일만 업로드 가능합니다.");
      }
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

  // 편지지 종류 갯수
  const letterPapers: number[] = [];
  for (let i = 1; i <= 3; i++) {
    letterPapers.push(i);
  }

  // 글씨체 종류
  const letterFonts: string[] = [
    "삼립호빵체",
    "김정철명조",
    "안성탕면체",
    "고령딸기체",
    "제주돌담체",
    "평창평화체",
    "조선100년체",
    "가나초콜릿체",
  ];

  // 편지 길이 제한
  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    const { scrollHeight, clientHeight } = textarea;
    if (scrollHeight > clientHeight) {
      textarea.style.height = "100%";
      textarea.value = letterContent;
    } else {
      setLetterContent(event.target.value);
    }
  };

  // 편지 내용
  const currentLetter = () => {
    return (
      <textarea
        autoFocus
        rows={14}
        onChange={handleTextareaHeight}
        value={letterContent}
        className={`${styles[`letterContent${letterPaper}`]} ${
          styles[`letterFont${letterFont}`]
        }`}
      ></textarea>
    );
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
      {isDrag && <div className="absolute w-100 h-100 z-50 bg-gray-300"></div>}
      {/* 미리보기 모달 */}
      {showModal && (
        <PreviewModal ref={modalRef} onClose={() => setShowModal(false)} />
      )}
      {/* 페이지 내용 */}
      <div className={styles.contents}>
        {ImageInput()}
        {/* 편지 */}
        <div className={styles.letter}>
          {/* 편지지 고르기 */}
          <div className={styles.selectLetterPaper}>
            <div>
              {letterPapers.map((i) => (
                <div key={i} className={styles.select}>
                  <img
                    src={require(`../../assets/letters/Letter${i}.png`)}
                    onClick={() => setLetterPaper(i)}
                    className={styles.letterImg}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* 편지지 */}
          <div className={styles.paper}>
            <div className={styles[`letterPaper${letterPaper}`]}>
              {currentLetter()}
            </div>
          </div>
        </div>
        {/* 글씨체 고르기 */}
        <div className={styles.selectLetterFont}>
          {/* 왼쪽 화살표 */}
          {startIndex !== 0 && (
            <button
              disabled={startIndex === 0}
              onClick={() => setStartIndex(startIndex - 1)}
            >
              &lt;
            </button>
          )}
          {/* 글씨체 목록 */}
          {letterFonts
            .slice(startIndex, startIndex + visibleFontsCount)
            .map((font: string, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setLetterFont(startIndex + i + 1);
                }}
                className={styles.letterFonts}
              >
                <div
                  className={`${styles.cursor} ${
                    styles[`letterFont${startIndex + i + 1}`]
                  } `}
                >
                  {font}
                </div>
              </div>
            ))}
          {/* 오른쪽 화살표 */}
          {startIndex + visibleFontsCount < letterFonts.length && (
            <button onClick={() => setStartIndex(startIndex + 1)}>&gt;</button>
          )}
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
