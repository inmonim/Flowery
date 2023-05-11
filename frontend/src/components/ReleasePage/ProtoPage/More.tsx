import React, { useState } from "react";
import styles from "./More.module.scss";
import flowerSrc from "../../../assets/ReleasePage/flowerSrc.png";
import cardSrc1 from "../../../assets/ReleasePage/cardSrc1.jpg";

export default function More() {
  const poem = `부모님의 사랑은 영원한 축복\n끝없이 이어지는 뜨거운 명작\n평생 함께 걸어가는 길도\n언제나 맑은 눈으로 비추네\n그대들의 사랑, 지금도 맑고 푸른데."`;

  const line = `"내 사랑, 당신은 내게 모든 것입니다."
   - 마담 프루스트의 비밀정원 (2006)`;

  const flower = "장미";

  return (
    <div className=" flex flex-col mb-[20%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">More</p>
        <p className="text-[1.2rem] font-namyeong">더 보기</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong pt-2">
          선물 받은 꽃다발 중 "{flower}" 꽃의 꽃말과 관련 정보들입니다.
        </p>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div
              className={`h-[200px] absolute w-[85%] flex flex-col justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl`}
            >
              <span className=" font-namyeong text-[2rem] font-bold text-[#322209] pl-4">
                Words of flower
              </span>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl">
              <img
                src={flowerSrc}
                alt="flowersrc"
                className="absoulute h-[95%] pr-3 "
              />
              <div className="h-[80%] border-r border-[#322209] border-r-[3px]"></div>
              <p className="text-[1.5rem]  font-namyeong font-bold pl-4 pr-3 text-[#322209]">
                사랑과 연민
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div className="h-[200px] absolute w-[85%] flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b rounded-2xl">
              <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
                Poem
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b m-2 rounded-2xl">
              <p className=" overflow-hidden whitespace-pre font-namyeong font-bold text-[#322209] hover:animate-typing">
                {poem}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] absolute flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-2 rounded-2xl">
              <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
                Phrase
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-2 rounded-2xl">
              <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]  ">
                {/* 대사 추출 */}
              </p>
              <p className="overflow-hidden whitespace-pre font-namyeong font-bold text-white hover:animate-typing">
                {line}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
