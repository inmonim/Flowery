import React, { useState, useEffect } from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ReleaseLetter from "./ProtoPage/ReleaseLetter";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";
import More from "./ProtoPage/More";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserProtoPage() {
  const [letterData, setLetterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { messageId } = useParams() as { messageId: string };

  useEffect(() => {
    console.log(messageId);
    async function getData() {
      try {
        const response = await axios.post(
          "https://flowery.duckdns.org/api/messages/get-card",
          {
            messageId: messageId,
          }
        );
        setLetterData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div className="md:w-1/2 md:mx-auto">
      <ProtoIntro />
      <Memories letterData={letterData} />
      <ReleaseLetter letterData={letterData} />
      <More letterData={letterData} />
      <Survey />
    </div>
  );
}
