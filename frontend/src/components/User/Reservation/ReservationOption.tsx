import React from "react";
import { Link } from "react-router-dom";
import Timeselect from "./TImeSelect";
import Dayselect from "./DaySelect";
import OptionHeader from "./OptionHeader";
import ShopInfo from "./ShopInfo";
import OrderPage from "./OrderPage";

export default function ReservationOption() {
  return (
    <div className="flex flex-col bg-user_beige">
      <OptionHeader />
      <div className="flex flex-col items-center pt-[3%]">
        <div className="w-[95%] mb-[10%] shadow-xl bg-white ">
          <ShopInfo />
          <Dayselect />
          <Timeselect />
          <div className="flex justify-center bg-user_beige"></div>
        </div>
        <Link to={"/reservationorder"}>
          <button className="w-[10rem] h-30 bg-user_green shadow-lg rounded-xl text-white font-nasq font-bold">
            다음단계
          </button>
        </Link>
      </div>
    </div>
  );
}
