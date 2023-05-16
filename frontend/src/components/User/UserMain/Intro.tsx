import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Try from "./Try";
import HowTo from "./HowTo";
import All from "./All";

export default function Intro() {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-full pb-[15%]">
      <div className="bg-user_beige">
        <div className="p-4 pt-[10%]">
          <p className="text-[black] text-[5rem] font-ballet text-user_green">
            Flowery
          </p>
          <p className="text-[black] text-[1rem] font-nasq font-bold">
            시들지 않는 추억을 영원히
          </p>
        </div>
        <div className="flex gap-2 m-2 overflow-scroll">
          <button
            className={`${
              activeTab === "all"
                ? "bg-user_green text-white"
                : "bg-user_sol text-user_black"
            }} min-w-[100px] w-[fit-content] p-2 h-[2.5rem] shadow-lg rounded-xl text-white font-nasq font-bold`}
            onClick={() => handleTabClick("all")}
          >
            ALL
          </button>
          <button
            className={`${
              activeTab === "reservation"
                ? "bg-user_green text-white"
                : "bg-user_sol text-user_black"
            }} min-w-[100px] w-[fit-content] p-2 h-[2.5rem] shadow-lg rounded-xl text-white font-nasq font-bold`}
            onClick={() => handleTabClick("reservation")}
          >
            Reservation
          </button>
          <button
            className={`${
              activeTab === "howto"
                ? "bg-user_green text-white"
                : "bg-user_sol text-user_black"
            }} min-w-[100px] w-[fit-content] p-2 h-[2.5rem] shadow-lg rounded-xl text-white font-nasq font-bold`}
            onClick={() => handleTabClick("howto")}
          >
            How To
          </button>
          <button
            className={`${
              activeTab === "Try"
                ? "bg-user_green text-white"
                : "bg-user_sol text-user_black"
            }} min-w-[100px] w-[fit-content] p-2 h-[2.5rem] shadow-lg rounded-xl text-white font-nasq font-bold`}
            onClick={() => handleTabClick("try")}
          >
            Try
          </button>
        </div>
        <div>
          {activeTab === "all" && <All />}
          {activeTab === "howto" && <HowTo />}
          {activeTab === "try" && <Try />}
        </div>
      </div>
    </div>
  );
}
