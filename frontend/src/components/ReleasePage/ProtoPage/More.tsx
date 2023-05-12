import React, { useState } from "react";
import styles from "./More.module.scss";
import flowerSrc from "../../../assets/ReleasePage/flowerSrc.png";
import cardSrc1 from "../../../assets/ReleasePage/cardSrc1.jpg";

export default function More(props: any) {
  const { letterData } = props; // 구조 분해 할당으로 letterData에 접근

  if (!letterData) {
    return null; // letterData가 없을 경우 컴포넌트를 렌더링하지 않음
  }

  console.log(letterData);

  const flower = "카네이션";

  return (
    <div className=" flex flex-col mb-[5%] mt-[30%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5 mb-[30%] pl-2 pr-2">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">More</p>
        <p className="text-[2rem] font-namyeong">더 보기</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong pt-2 mb-4">
          선물 받은 꽃다발 중 "<span className="text-user_pink">{flower}</span>"
          꽃의 꽃말과 관련 정보들입니다.
        </p>
        <p className="text-[0.8rem] w-[90%] text-[#82877C] font-namyeong pt-2 mb-4">
          ※ 카드에 생성되는 시는 선물받은 꽃의 꽃말을 이용해 ai가 작성한
          시입니다. 시 생성 내용의 정확도와 영화 대사 추출 등 더 나은 서비스는
          추후 개발 예정에 있습니다.
        </p>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div
              className={`h-[200px] absolute w-[85%] flex flex-col justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl`}
            >
              <span className=" font-namyeong text-[2rem] font-bold text-[#322209]">
                꽃말
              </span>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center pb-4">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl">
              <img
                src={flowerSrc}
                alt="flowersrc"
                className="absoulute h-[95%] pr-3 "
              />
              <div className="h-[80%] border-r border-[#322209] border-r-[3px]"></div>
              <p className="text-[1.5rem]  font-namyeong font-bold pl-4 pr-3 text-[#322209] break-words">
                {letterData.mean}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center ">
            <div className="h-[200px] absolute w-[85%]  flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b rounded-2xl">
              <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
                시
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center ">
            <div className="h-[fit-content] min-h-[200px] w-[85%] flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b rounded-2xl">
              <p className=" p-2 overflow-hidden whitespace-pre font-namyeong font-bold text-[#322209]">
                {letterData.poem}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] absolute flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-4 rounded-2xl">
              <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
                명대사
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-4 rounded-2xl">
              <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]  "></p>
              <p className="overflow-hidden whitespace-pre font-namyeong font-bold text-[#322209] hover:animate-typing">
                {line}
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
