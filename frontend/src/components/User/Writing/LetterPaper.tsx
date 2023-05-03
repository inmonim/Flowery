import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { letterPaperState } from "../../../recoil/atom";
import styles from "./LetterPaper.module.scss";

export default function LetterPaper() {
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 4;

  // 편지지 종류 갯수
  const letterPapers: number[] = [];
  for (let i = 1; i <= 3; i++) {
    letterPapers.push(i);
  }

  return (
        <div className="h-[80vh] w-[10vw] justify-center align-middle">
          {letterPapers.map((i) => (
            <div key={i} className={styles.select}>
              <img
                src={require(`../../../assets/letters/Letter${i}.png`)}
                onClick={() => setLetterPaper(i)}
                className={styles.letterImg}
              />
            </div>
          ))}
        </div>
  );
}
