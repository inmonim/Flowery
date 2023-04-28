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

export default function WritingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useRecoilState<File | null>(imageState);
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);
  const [letterContent, setLetterContent] =
    useRecoilState<string>(totalTextState);
  const [totalText, setTotalText] = useState<Array<string[]>>([]);
  const [currentText, setCurrentText] = useState<string[]>([""]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      setImage(file[0]);
    }
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

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    const { scrollHeight, clientHeight } = textarea;
    if (scrollHeight > clientHeight) {
      textarea.style.height = "100%";
      [textarea.value] = currentText;
    } else {
      setCurrentText([event.target.value]);
    }
  };

  // 이전 페이지 버튼
  const prevPage = () => {
    // if (totalText.length < currentPage) {
    //   totalText.push(currentText);
    // } else {
    totalText[currentPage - 1] = currentText;
    // }
    setCurrentText(totalText[currentPage - 2]);
    setCurrentPage(currentPage - 1);
  };

  // 다음 페이지 버튼
  const nextPage = () => {
    if (totalText.length < currentPage + 1) {
      totalText[currentPage - 1] = currentText;
      totalText.push([""]);
      setCurrentText([""]);
    } else {
      totalText[currentPage - 1] = currentText;
      setCurrentText(totalText[currentPage]);
    }
    setCurrentPage(currentPage + 1);
  };

  // 편지 내용
  const currentLetter = () => {
    return (
      <textarea
        autoFocus
        rows={14}
        onChange={handleTextareaHeight}
        value={currentText}
        className={`${styles[`letterContent${letterPaper}`]} ${
          styles[`letterFont${letterFont}`]
        }`}
      ></textarea>
    );
  };

  // 다음으로 버튼
  const submitButton = () => {
    // if (totalText.length < currentPage+1) {
    //   totalText.push(currentText);
    // } else {
    totalText[currentPage - 1] = currentText;
    // }
    const totalContent = totalText.map((subArr) => subArr[0]).join("^.^");
    setLetterContent(totalContent);
    setShowModal(true);
  };

  return (
    // 전체 페이지
    <div className={styles.layout}>
      {/* 페이지 내용 */}
      <div className={styles.contents}>
        {/* 이미지 or 영상 */}
        <div className={styles.uploadImage}>
          <input
            type="file"
            ref={imageInput}
            onChange={handleFileChange}
            className={styles.imageInput}
          ></input>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              onClick={onCickImageUpload}
              className={styles.image}
            ></img>
          ) : (
            <img
              src={require("../../assets/letters/ImageUpload.png")}
              onClick={onCickImageUpload}
              className={styles.image}
            ></img>
          )}
        </div>
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
            <div className={styles.button}>
              {currentPage - 1 > 0 && (
                <button onClick={prevPage}>이전 페이지</button>
              )}
            </div>
            <div className={styles[`letterPaper${letterPaper}`]}>
              {currentLetter()}
              <div className={styles.currentPage}>{currentPage}page</div>
            </div>
            <div className={styles.button}>
              {currentPage + 1 < 6 && (
                <button onClick={nextPage}>다음 페이지</button>
              )}
            </div>
          </div>
        </div>
        {/* 글씨체 고르기 */}
        <div className={styles.selectLetterFont}>
          <button
            disabled={startIndex === 0}
            onClick={() => setStartIndex(startIndex - 1)}
          >
            &lt;
          </button>
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
                  className={`${styles.select} ${
                    styles[`letterFont${startIndex + i + 1}`]
                  } `}
                >
                  {font}
                </div>
              </div>
            ))}
          <button
            disabled={startIndex + visibleFontsCount >= letterFonts.length}
            onClick={() => setStartIndex(startIndex + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
      {/* 페이지 이동 */}
      <div className={styles.handlePage}>
        <input type="button" value="이전으로" />
        <input type="button" value="건너뛰기" onClick={submitButton} />
        <input type="button" value="다음으로" onClick={submitButton} />
        {showModal && (
          <PreviewModal ref={modalRef} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}
