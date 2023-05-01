import React from "react";
import Timeselect from "./TImeSelect";
import Dayselect from "./DaySelect";
import OptionHeader from "./OptionHeader";
import ShopInfo from "./ShopInfo";

export default function ReservationOption() {
  return (
    <div className="flex flex-col">
      <OptionHeader />
      <ShopInfo />
      <Dayselect />
      <Timeselect />
    </div>
  );
}
