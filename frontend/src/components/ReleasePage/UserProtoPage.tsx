import React, { useState, useEffect } from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ReleaseLetter from "./ProtoPage/ReleaseLetter";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";
import More from "./ProtoPage/More";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./UserProtoPage.module.scss";
import mobile from "../../assets/pleasemobile.png";

export default function UserProtoPage() {
  const [letterData, setLetterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { messageId } = useParams() as { messageId: string };
  const [isMobileView, setIsMobileView] = useState(false);
  const [isPictures, setIsPictures] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [flowerData, setFlowerData] = useState<string>("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://flowery.duckdns.org/api/messages/get-card",
          {
            messageId: messageId,
          }
        );
        if (response) {
          if (response.data.pictures) {
            setIsPictures(true);
          }
          if (response.data.video) {
            setIsVideo(true);
          }
        }
        setLetterData(response.data);
        setFlowerData(response.data.flowerPicture);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth > 500);
    };

    handleWindowResize(); // 페이지 로드 시 초기 너비에 따라 모바일 뷰 설정

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (isMobileView) {
    return (
      <div className={styles.photo11}>
        <img src={mobile} alt="Mobile" />
      </div>
    );
  }

  return (
    <div className={styles.customclass}>
      <ProtoIntro />
      {isPictures || isVideo ? <Memories letterData={letterData} /> : null}
      <ReleaseLetter letterData={letterData} flowerData={flowerData} />
      <More letterData={letterData} />
      <Survey />
    </div>
  );
}
