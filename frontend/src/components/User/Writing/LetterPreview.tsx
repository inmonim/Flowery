import React, { useState, useEffect, useRef } from "react";
import styles from "./LetterPreview.module.scss";
import { useRecoilState } from "recoil";
import {
  totalTextState,
  letterPaperState,
  letterFontState,
} from "../../../recoil/atom";

export default function LetterPreview() {
  const [letterContent, setLetterContent] =
    useRecoilState<string>(totalTextState);
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);

  // 편지 내용
  const currentLetter = () => {
    return (
      <textarea
        disabled
        value={letterContent}
        className={`${styles[`letterContent${letterPaper}`]} ${
          styles[`letterFont${letterFont}`]
        }`}
      ></textarea>
    );
  };

  return (
    // 전체 페이지
    <div className={styles[`letterPaper${letterPaper}`]}>{currentLetter()}</div>
  );
}
