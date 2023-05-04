import React from "react";
import bouquet from "../../../assets/ReleasePage/flower_sample.jpg";

export default function ProtoIntro() {
  return (
    <div className="bg-[#FEF7F1] flex flex-col items-center h-[100vh]">
      <header className="fixed">fuckyou</header>
      <section className="h-[19%]">logo & 설명</section>
      <section className="flex w-[80%]">
        <img src={bouquet} alt="bouqeut" />
      </section>
      <section>logo & 설명</section>
    </div>
  );
}
