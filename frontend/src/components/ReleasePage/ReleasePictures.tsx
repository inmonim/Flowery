import React from "react";
import floral from "../../assets/flowershop1.jpg";
import memory1 from "../../assets/profile1.png";
import memory2 from "../../assets/profile2.png";
import memory3 from "../../assets/profile3.png";
import memory4 from "../../assets/profile4.png";
import memory5 from "../../assets/profile5.png";

export default function ReleasePictures() {
  const memories = [memory1, memory2, memory3, memory4, memory5];

  return (
    <div className="bg-[#FEF7F1]">
      <div>
        <img src={floral} alt="shop picture" />
      </div>
      <div className="bg-white h-44444444h border">
        <p className="flex justify-center">our</p>
        <p className="flex justify-center">memories</p>
      </div>
      <div className="flex flex-col justify-center gap-[5rem] pr-[5.33vw] pl-[5.33vw]">
        {memories.map((memory, index) => (
          <img src={memory} key={index} />
        ))}
      </div>
    </div>
  );
}
