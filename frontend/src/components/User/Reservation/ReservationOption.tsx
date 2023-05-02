import React from "react";
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
      <div className="">
        <button className="w-[100px] h-30 bg-blue-400 rounded-xl">
          다음단계
        </button>
      </div>
      <OrderPage />
    </div>
  );
}
