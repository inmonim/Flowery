import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { imageState } from "../../../recoil/atom";

export default function ImageInput() {
  const [image, setImage] = useRecoilState<File | null>(imageState);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const imageInput = useRef<HTMLInputElement>(null);

  // 이미지 업로드
  const onClickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileType = file[0].type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        setImage(file[0]);
      } else {
        alert("이미지 또는 동영상 파일만 업로드 가능합니다.");
      }
    }
  };

  // Drag & Drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const file = event.dataTransfer.files;
    if (file && file.length > 0) {
      const fileType = file[0].type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        setImage(file[0]);
      } else {
        alert("이미지 또는 동영상 파일만 업로드 가능합니다.");
      }
    }
  };

  return (
    // 전체 페이지
    <div
      onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
      draggable="false"
    >
      {/* 이미지 or 영상 */}
      <div className="flex justify-center">
        <input
          type="file"
          accept="image/*,video/*"
          ref={imageInput}
          onChange={handleFileChange}
          className="hidden bg-white"
        ></input>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            onClick={onClickImageUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></img>
        ) : (
          <img
            src={require("../../../assets/letters/ImageUpload.png")}
            onClick={onClickImageUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="object-contain cursor-pointer h-[10vh]"
          ></img>
        )}
      </div>
      <div className="flex justify-center">
        {/* 업로드 버튼 */}
        <div className="justify-center m-2 border-2">
          <input
            type="button"
            value="업로드"
            onClick={onClickImageUpload}
            className="cursor-pointer"
          ></input>
        </div>
        {/* 삭제 버튼 */}
        <div className="justify-center m-2 border-2">
          <input
            type="button"
            value="삭제"
            onClick={() => setImage(null)}
            className="cursor-pointer"
          ></input>
        </div>
      </div>
    </div>
  );
}
