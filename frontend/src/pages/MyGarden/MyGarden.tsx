import axios from "axios";
import React, { useEffect, useState } from "react";
import GardenCard from "../../components/User/MyGarden/GardenCard";

export default function MyGarden() {
  const [messages, setMessages] = useState<Array<string>>([]);

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

  useEffect(() => {}, [messages]);

  console.log(messages);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {messages.map((message, idx) => {
          return (
            <div key={idx}>
              <GardenCard />
              {/* <img
                className="h-auto max-w-full rounded-lg"
                src={}
                alt=""
              /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
