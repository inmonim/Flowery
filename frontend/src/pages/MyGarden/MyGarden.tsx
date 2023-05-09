import React from "react";

export default function MyGarden() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {cards.map((card, idx) => {
          return (
            <div key={idx}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${card}.jpg`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
