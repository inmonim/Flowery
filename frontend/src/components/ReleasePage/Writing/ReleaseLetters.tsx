import React, { useState, useEffect, useRef } from "react";
import ReleaseLetterPreview from "./ReleaseLetterPreview";

export default function ReleaseLetters() {
  return (
    <div className=" flex flex-col mt-[15%] mb-[15%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[1.2rem] font-namyeong">편지</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong pt-2">
          소중한 사람이 선물한 꽃다발과 편지입니다.
        </p>
      </div>
      <ReleaseLetterPreview />
    </div>
  );
}
