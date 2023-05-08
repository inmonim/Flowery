import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";

export default function Timeselect() {
  const open = 900;
  const close = 2100;

  const rezBefore = [];
  const rezAfter = [];
  for (let i = open; i < close; i += 30) {
    let hour = Math.floor(i / 100);
    let minute = i % 100;
    if (minute >= 60) {
      minute = 0;
      hour += 1;
      i += 40;
    }
    const rezTime = `${hour}:${minute === 0 ? "00" : minute}`;
    if (hour >= 12) {
      rezAfter.push(rezTime);
    } else {
      rezBefore.push(rezTime);
    }
  }

  // console.log(rezAfter, "오후");
  // console.log(rezBefore, "오전");

  return (
    <div className="flex flex-col justify-center align-middle mb-[15%]">
      <p className="ml-11">오전</p>
      <div className="flex flex-row flex-wrap ml-11  text-left gap-1">
        {rezBefore.map((time, index) => (
          <div
            key={index}
            className="w-[4.5rem] p-1 text-center border-solid border-2 border-b_bottom hover:bg-b_bottom"
          >
            {time}
          </div>
        ))}
      </div>
      <p className="ml-11 mt-[10%]">오후</p>
      <div className="flex flex-row flex-wrap ml-11 gap-1">
        {rezAfter.map((time, index) => (
          <div
            key={index}
            className="w-[4.5rem] p-1 text-center border-solid border-2 border-b_bottom  hover:bg-b_bottom"
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}
