import React from "react";
import ShopInfo from "./ShopInfo";
import OptionHeader from "./OptionHeader";
import thumbnail from "../../../assets/example1.jpg";
import { Link } from "react-router-dom";

export default function OrderPage() {
  const productList = [
    {
      title: "[가정의달 행사] 좋은 꽃다발",
      price: "15,000원",
      content: "직경 15cm 정도의 꽃다발",
      thumbnail: thumbnail,
    },
    {
      title: "[가정의달 행사] 좋은 꽃다발",
      price: "15,000원",
      content: "직경 15cm 정도의 꽃다발",
      thumbnail: thumbnail,
    },
    {
      title: "[가정의달 행사] 좋은 꽃다발",
      price: "15,000원",
      content: "직경 15cm 정도의 꽃다발",
      thumbnail: thumbnail,
    },
    {
      title: "[가정의달 행사] 좋은 꽃다발",
      price: "15,000원",
      content: "직경 15cm 정도의 꽃다발",
      thumbnail: thumbnail,
    },
    {
      title: "주문제작",
      price: "가게에 문의",
      content: "기타란에 문의 내역을 입력해 주세요/",
      thumbnail: thumbnail,
    },
  ];

  return (
    <div className=" bg-user_beige ">
      <OptionHeader />
      <div className="flex flex-col items-center pt-[3%]">
        <div className="w-[95%] mb-[10%] shadow-xl bg-white ">
          <ShopInfo />
          <div className="p-3 pt-8 pb-8 text-xs">
            <p className="font-nasq font-bold">
              주의사항 ex) 사진은 실제 저희 가게에서 제공하는 같은 가격의
              꽃다발이지만 꽃의 종류에 따라 분위기가 달라질 수 있는 점 주의 해라
            </p>
          </div>
          <div>
            {productList.map((product, index) => (
              <div
                className="flex border-t border-user_green pb-[1%] "
                key={index}
              >
                <div className="flex flex-col w-3/5 p-3 gap-1">
                  <div className="font-nasq font-bold">{product.title}</div>
                  <div className="font-nasq text-[#8D8E90] text-[0.5rem]">
                    {product.content}
                  </div>
                  <div className="font-bold">{product.price}</div>
                </div>
                <div className="w-2/5">
                  <img
                    src={product.thumbnail}
                    alt="thumbnail"
                    className="p-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center pt-[4%] pb-[15%] bg-user_beige">
          <Link to={"/reservationorder"}>
            <button className="w-[10rem] h-30 shadow-lg rounded-xl bg-user_green text-white font-nasq font-bold">
              다음단계
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
