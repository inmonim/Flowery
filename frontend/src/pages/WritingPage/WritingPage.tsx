import React, { useState, useRef } from "react";
import styles from "./WritingPage.module.scss";

export default function WritingPage() {
  const [image, setImage] = useState<File | null>(null);
  const [letterPaper, setLetterPaper] = useState<number>(1);
  const [letterFont, setLetterFont] = useState<number>(1);
  const [totalText, setTotalText] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 4;

  const imageInput = useRef<HTMLInputElement>(null);

  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      setImage(file[0]);
    }
  };

  const letterPapers: number[] = [];
  for (let i = 1; i <= 3; i++) {
    letterPapers.push(i);
  }

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
      textarea.value = currentText;
    } else {
      setCurrentText(event.target.value);
    }
  };

  const nextPage = () => {
    setTotalText([...totalText, currentText]);
    setCurrentText("");
    setCurrentPage(currentPage);
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
            편지지 고르기
            <div>
              {letterPapers.map((i) => (
                <div
                  key={i}
                  onClick={() => setLetterPaper(i)}
                  className={styles.select}
                >
                  <img
                    src={require(`../../assets/letters/Letter${i}.png`)}
                    className={styles.letterImg}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* 편지지 */}
          <button>이전 페이지</button>
          <div className={styles[`letterPaper${letterPaper}`]}>
            <textarea
              autoFocus
              rows={14}
              onChange={handleTextareaHeight}
              value={currentText}
              className={`${styles[`letterContent${letterPaper}`]} ${
                styles[`letterFont${letterFont}`]
              }`}
            ></textarea>
          </div>
          <button onClick={nextPage}>다음 페이지</button>
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
        <input type="button" value="건너뛰기" />
        <input type="button" value="다음으로" />
      </div>
    </div>
  );
}
