import axios from "axios";
import React, { useEffect, useState } from "react";
import GardenCard from "../../components/User/MyGarden/GardenCard";

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

  useEffect(() => {
    const getMessages = async () => {
      await axios
        .post("https://flowery.duckdns.org/api/myGarden/get", { userId: 1 })
        .then((response) => {
          setMessages(response.data);
        });
    };
    getMessages();
  }, []);

  useEffect(() => {
    const getCards = messages.map((message: messageType, idx: number) =>
      axios
        .post("https://flowery.duckdns.org/api/messages/get-card", {
          messageId: message.messageId,
        })
        .then((response) => {
          setCards((prevCards) => [...prevCards, response.data]);
        })
    );
  }, [messages]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {cards.map((card: cardType, idx: number) => {
          return (
            <div key={idx}>
              <GardenCard card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
