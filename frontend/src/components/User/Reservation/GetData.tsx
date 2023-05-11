import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { shopInfo } from "../../../recoil/atom";

export default function GetData() {
  const [shopList, setShopList] = useRecoilState(shopInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://flowery.duckdns.org/api/stores"
        );
        setShopList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    getData();

    return setShopList([]);
  }, []);

  if (loading) {
    return <div className="w-full h-full bg-[red]">Fuck yuo</div>; // 로딩 중일 때 보여줄 UI
  }
  return shopList;
}
