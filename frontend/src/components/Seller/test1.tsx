import React, { useState } from "react";
import axios from "axios";

export default function ImageRecognition() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseCode, setResponseCode] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
    setResponseCode(null);
  };

  const handleImageSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image as File);
    try {
      const response = await axios.post("/api/image-recognition", formData);
      setResponseCode(response.status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>인식 중입니다.</div>;
  } else if (responseCode === 200) {
    componentToRender = <div>인식이 완료되었습니다.</div>;
  } else if (responseCode === 300) {
    componentToRender = <div>다시 인식해주세요.</div>;
  } else {
    componentToRender = (
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageSubmit}>인식 시작</button>
      </div>
    );
  }

  return <div>{componentToRender}</div>;
}


/*
function handlePrintClick() {
    if (photoUrl1 && photoUrl2) {
      // create image elements to save
      const image1 = new Image();
      const image2 = new Image();
      image1.src = photoUrl1;
      image2.src = photoUrl2;

      // wait for images to load
      Promise.all([image1.decode(), image2.decode()])
        .then(() => {
          // create canvas element for the first image
          const canvas1 = document.createElement("canvas");
          canvas1.width = image1.naturalWidth;
          canvas1.height = image1.naturalHeight;

          // draw first image on canvas
          const context1 = canvas1.getContext("2d");
          context1?.drawImage(image1, 0, 0);

          // convert canvas to blob and save as file
          canvas1.toBlob(
            (blob1) => {
              if (blob1) {
                saveAs(blob1, "test1.jpg");

                // create canvas element for the second image
                const canvas2 = document.createElement("canvas");
                canvas2.width = image2.naturalWidth;
                canvas2.height = image2.naturalHeight;

                // draw second image on canvas
                const context2 = canvas2.getContext("2d");
                context2?.drawImage(image2, 0, 0);

                // convert canvas to blob and save as file
                canvas2.toBlob(
                  (blob2) => {
                    if (blob2) {
                      saveAs(blob2, "test2.jpg");

                      // set the stepOne and stepTwo states to true
                      setStepOne(true);
                      setStepTwo(true);
                    }
                  },
                  "image/jpeg",
                  1
                );
              }
            },
            "image/jpeg",
            1
          );
        })
        .catch((err) => console.log(err));
    }
  }
  */