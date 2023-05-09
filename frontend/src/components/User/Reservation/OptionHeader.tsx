import React from "react";
import back_btn from "../../../assets/back_btn.png";
import menu_btn from "../../../assets/menu_button.png";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";

export default function OptionHeader() {
  const positions = [
    {
      content: "꽃들 info",
      title: "꽃들",
      address: "부산광역시 부산진구 부전동 번지 지하층 호 573-1",
      latlng: { lat: 35.1569, lng: 129.0591 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile3,
    },
  ];
  return (
    <div className="w-100vh bg-user_sol flex justify-between items-center  border-solid border- border-b-black">
      <img src={back_btn} alt="back" className="w-10 p-3" />
      {positions.map((position, index) => (
        <div key={index} className="mr-auto ml-[38%]">
          <p className=" font-bold font-nasq text-user_black ">
            {position.title}
          </p>
        </div>
      ))}
    </div>
  );
}
