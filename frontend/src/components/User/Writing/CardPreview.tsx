import React, { useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../../assets/card1234.png";
import { useRecoilState } from "recoil";
import { cardUrl } from "../../../recoil/atom";

export default function CardPreview() {
  const [imgUrl, setImgUrl] = useRecoilState<string>(cardUrl);

  function drawMultilineText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let posY = y;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, posY);
        line = words[i] + " ";
        posY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, posY);
  }

  function mergeImages(
    image1Url: string,
    image2Base64: string,
    text: string,
    text2: string,
    text3: string,
    outputFileName: string
  ) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image1 = new Image();
    image1.onload = () => {
      canvas.width = image1.width;
      canvas.height = image1.height;

      // draw image1
      if (ctx) {
        ctx.drawImage(image1, 0, 0);

        const image2 = new Image();
        image2.onload = () => {
          // draw image2
          ctx.drawImage(
            image2,
            0,
            0,
            image2.width,
            image2.height,
            canvas.width / 2 - 250,
            800,
            500,
            500
          );
          ctx.font = "120px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom"; // 텍스트 기준선을 아래쪽으로 설정
          drawMultilineText(
            ctx,
            text,
            canvas.width / 2,
            canvas.height * 0.555,
            1500,
            180
          );

          // draw additional text
          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text2,
            canvas.width / 2,
            canvas.height * 0.46,
            900,
            100
          );

          const { width: width2, actualBoundingBoxDescent: descent2 } =
            ctx.measureText(text2);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width2 / 2 - 20,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.lineTo(
            canvas.width / 2 + width2 / 2,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.stroke();

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text3,
            canvas.width / 2,
            canvas.height * 0.76,
            900,
            100
          );

          setImgUrl(canvas.toDataURL());
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;

    return (
      <div>
        <img src={imgUrl} alt="" />
      </div>
    );
  }

  const testQr =
    "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAFGUlEQVR4Xu2UMXIkSQwD9f/fnrXexjkKBofJxgIlzViFgAUkUaM29PX3z3/Xpr8YXT/5fqzA92MFvh8r8P1Yge/HCnw/VuD7sQLfjxX4fqzA92MFtj7W18/k7DiPsmJyJr6+2uLmdihnx3mUFZMz8fXVFje3Qzk7zqOsmJyJr6+2uHT06aoSVsLzpokMz4XTK4tLR5+uKmElPG+ayPBcOL2yuHT06aoSVsLzpokMz4XTK4vjaCUUGSas6IluO05CkenvClscRyuhyDBhRU9023ESikx/V9jiOFoJRYYJK3qi246TUGT6u8IWx9FKKDJMWAmmRJhXTCgyHFxtcRythCLDhJVgSoR5xYQiw8HVFsfRSigyTFgJpkSYV0woMhxcbXEcrYQiI5KochgmFBkOrrY4jlZCkRFJVDkME4oMB1dbHEcrociIJKochglFhoOrLS4d9a8Ew6oSUXFHOL2yuHTUvxIMq0pExR3h9Mri0lH/SjCsKhEVd4TTK4ur0TNx533JmWpH2+LmdijuvC85U+1oW9zcDsWd9yVnqh1tl/sVOz+u/QlThD/sj/4C589uH2eK8If90V/g/Nnt40wR/rCzXzB//vZfgwkrYcJtYIoME0f8Gatd7puGWDFhJUy4DUyRYeKIP2O1y33TECsmrIQJt4EpMkwc8WestjiOtoceK+7QhKOE4hPC6ZXFcbQSUXGHJhwlFJ8QTq8sjqOViIo7NOEoofiEcHplce3HTJH5YeJUtAMXQxFebXFzu4nMDxOnoh24GIrwaoub201kfpg4Fe3AxVCEV1vc3Pb+WpqwkzgVLWBRaVsHtc5nmAgTdhKnogUsKm3roNb5DBNhwk7iVLSARaVtHYj1qoQE7FSCocQVE1baFidG24uPErBTCYYSV0xYaVucGG0vPkrATiUYSlwxYaXtcr7FL2g/75FxPFeaBBxVq13Ot/gFVQnG8VxpEnBUrXY53+IXVCUYx3OlScBRtdriOMqEFUWG52QEzIoJK4rwaovjKBNWFBmekxEwKyasKMKrLY6jTFhRZHhORsCsmLCiCK92uW86XD9w+xMe3xKVw4hKOzs4fsZ3PSHeEpXDiEo7Ozh+xnc9Id4SlcOISts6iNYL5tUsmsg4SaT+I89sTUTvtZ83r2bRRMZJIvUfeWZrInqv/bx5NYsmMk4Sqf/IM//ChO/58+Xfz3PCrMgQnoXcedlk9D7P33j6B0QM4VnInZdNRu/z/I2nf0DEEJ6F3HnZZETP7VDODhkmFBkmUaVtcXM7lLNDhglFhklUaVvc3A7l7JBhQpFhElXaFpeO/vMqqpyELsaBTVsTZ++Jq6hyEroYBzZtTZy9J66iyknoYhzYtDXB99pvmCLDRFQiYRVJ7LBabXEcrYQiw0RUImEVSeywWm1xHK2EIsNEVCJhFUnssFptcRythCLDwTOGiuASr0xbl3ymPT1FhoNnDBXBJV6Zti75THt6igwHzxgqgku8Mm1d8pn29BQZJr9eVeJUEfPCM6I5WglFhsmvV5U4VcS88IxojlZCkWHy61UlThUxLzwjOh19uhIJK8GUCIsrVrzStg7O1nklElaCKREWV6x4pW0dnK3zSiSsBFMiLK5Y8UrbOmgvnkgMOpVIhLgszsmstri5HUoMOpVIhLgszsmstri5HUoMOpVIhLgszsmsdrnrv/djRb4fK/D9WIHvxwp8P1bg+7EC348V+H6swPdjBb4fK/D9WIHvxwr8P4HpPiRtdJIDAAAAAElFTkSuQmCC";

  return (
    <div>
      {mergeImages(
        cardframe,
        testQr,
        "문구",
        `From. 이름`,
        `kkotdeul`,
        "test1"
      )}
    </div>
  );
}
