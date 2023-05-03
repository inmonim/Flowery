import React from "react";
import ShopInfo from "./ShopInfo";
import OptionHeader from "./OptionHeader";

export default function OrderPage() {
  return (
    <div>
      <OptionHeader />
      <ShopInfo />
      <p>
        주의사항 ex) 사진은 실제 저희 가게에서 제공하는 같은 가격의 꽃다발이지만
        꽃의 종류에 따라 분위기가 달라질 수 있는 점 주의 하지 않으면 할복이다.
      </p>
    </div>
  );
}
