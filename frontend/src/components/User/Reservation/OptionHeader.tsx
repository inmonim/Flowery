import React from "react";
import back_btn from "../../../assets/back_btn.png";
import menu_btn from "../../../assets/menu_button.png";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";
import { shopDataState } from "../../../recoil/atom";
import { useRecoilValue } from "recoil";

export default function OptionHeader() {
  const shopData = useRecoilValue(shopDataState);

  return (
    <div className="w-100vh bg-user_sol flex justify-between items-center  border-solid border- border-b-black">
      <img src={back_btn} alt="back" className="w-10 p-3" />
      <div className="mr-auto ml-[38%]">
        <p className=" font-bold font-nasq text-user_black ">
          {shopData.storeName}
        </p>
      </div>
    </div>
  );
}
