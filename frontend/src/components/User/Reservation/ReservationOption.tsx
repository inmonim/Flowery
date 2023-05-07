import React from "react";
import { Link } from "react-router-dom";
import Timeselect from "./TImeSelect";
import Dayselect from "./DaySelect";
import OptionHeader from "./OptionHeader";
import ShopInfo from "./ShopInfo";
import ProductList from "./ProductList";
import OrderPage from "./OrderPage";

export default function ReservationOption() {
  return (
    <div className="flex flex-col">
      <OptionHeader />
      <ShopInfo />
      <Dayselect />
      <Timeselect />
      <Link to={"/reservationorder"}>
        <button className="w-[100px] h-30 bg-blue-400 rounded-xl">
          다음단계
        </button>
      </Link>
    </div>
  );
}
