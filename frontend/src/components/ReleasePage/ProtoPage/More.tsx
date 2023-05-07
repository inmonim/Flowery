import React from "react";

export default function More() {
  const nickname = "창근";

  const poem = `
  장미의 꽃말은 사랑과 연민입니다.
  "장미여, 네 향기는
  사랑과 연민의 냄새로 가득해
  내 마음을 사로잡았네."`;

  const line = `"내 사랑, 당신은 내게 모든 것입니다."
   - 마담 프루스트의 비밀정원 (2006)`;

  return (
    <div className=" flex flex-col mb-[20%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">More</p>
        <p className="text-[1.2rem] font-namyeong">더 보기</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong">
          {nickname}님이 선물해주신 꽃다발과 관련된 정보들입니다.
        </p>
      </div>
      <div className="h-[200px] flex justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl">
        <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]">
          꽃말
        </p>
        <p className="text-[3rem] font-namyeong font-bold text-white">
          사랑과 연민
        </p>
      </div>
      <div className="h-[200px] flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b m-2 rounded-2xl">
        <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]">
          시 추출
        </p>
        <p className="overflow-hidden whitespace-pre font-namyeong font-bold text-white animate-typing">
          {poem}
        </p>
      </div>
      <div className="h-[200px] flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-2 rounded-2xl">
        <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]">
          대사 추출
        </p>
        <p className="overflow-hidden whitespace-pre font-namyeong font-bold text-white animate-typing">
          {line}
        </p>
      </div>
    </div>
  );
}
