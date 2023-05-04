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
