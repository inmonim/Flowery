import axios from "axios";
import React, { useEffect, useState } from "react";
import GardenCard from "../../components/User/MyGarden/GardenCard";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../recoil/atom";

interface messageType {
  gardenId: number;
  messageId: string;
  userId: number;
}

interface cardType {
  flowerPicture: string;
  font: number;
  mean: string;
  message: string;
  messageDate: string;
  messageId: string;
  pictures: string[];
  poem: string;
  video: string;
}

export default function MyGarden() {
  const [messages, setMessages] = useState<Array<messageType>>([]);
  const [cards, setCards] = useState<Array<cardType>>([]);
  const userId = useRecoilValue<number>(userIdState);
  useEffect(() => {
    const getMessages = async () => {
      await axios
        .post("https://flowery.duckdns.org/api/myGarden/get", { userId: 1 })
        .then((response) => {
          console.log(response, userId) 
          setMessages(response.data);
        })
    };
    getMessages();
  }, []);

  useEffect(() => {
    const getCards = async () => {
      messages.map((message: messageType, idx: number) =>
        axios
          .post("https://flowery.duckdns.org/api/messages/get-card", {
            messageId: message.messageId,
          })
          .then((response) => {
            setCards((prevCards) => [...prevCards, response.data]);
          })
      );
    };
    getCards();
  }, [messages]);

  return (
    <div>
      {cards.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3">
          {cards.map((card: cardType, idx: number) => (
              <GardenCard key={idx} card={card} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="pt-4 font-nasq">저장된 카드가 없습니다</p>
        </div>
      )}
    </div>
  );
}
