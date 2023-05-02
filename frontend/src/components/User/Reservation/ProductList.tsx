import React from "react";
import selectImg from "../../../assets/circle_select.png";
import basisImg from "../../../assets/circle_basis.png";

export default function ProductList() {
  const productList = [];

  return (
    <div className="flex flex-wrap">
      <div>
        <img src={basisImg} alt="basis" />
      </div>
    </div>
  );
}
