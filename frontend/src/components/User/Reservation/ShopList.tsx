import React, { useEffect, useState } from "react";
import selectBtn from "../../../assets/select_button.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ShopList() {
  //response.data를 담을 변수
  const [shopList, setShopList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://flowery.duckdns.org/api/stores"
        );
        // console.log(response.data[0]);
        setShopList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    //첫 렌더링에만 실행
    getData();
  }, []);

  if (loading) {
    return <div className="w-full h-full bg-[red]">Fuck yuo</div>; // 로딩 중일 때 보여줄 UI
  }

  console.log(shopList);

  return (
    <div className="flex flex-col">
      <p className="text-xl font-medium p-3  bg-user_beige text-user_green font-namyeong border-b border-user_green">
        가게선택
      </p>
      {shopList.map((shop, index) => (
        <div
          key={index}
          className="gap-2 bg-user_beige border-solid border-b border-user_green"
        >
          <div className="flex space-x-4 ">
            <div className="flex-none w-20 h-20 overflow-hidden rounded-full border-solid border-[1px] border-user_green mb-2">
              {/* <img src={shop.image} alt={shop.store_name} /> */}
            </div>
            <div className="flex flex-col font-bold justify-center ">
              {/* <div>{shop.store_name}</div>
              <div className="text-xs ">{shop.address}</div> */}
            </div>
            <Link to={"/reservationoption"}>
              <div className="flex justify-center items-center bg-user_beige border w-[4rem] h-[2.5rem] rounded-[20px] border-[1.75px] border-user_green ">
                <p className=" font-nasq font-bold text-user_green">선택</p>
              </div>
            </Link>
          </div>
          <div className="flex-none w-full h-20 border-solid border-2 mb-2">
            <div className="flex flex-row space-10">
              {Array.from({ length: 4 }, (_, index) => (
                <img
                  className="w-1/4"
                  // src={shop.image}
                  alt="shop.title"
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
