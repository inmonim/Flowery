import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { imageState } from "../../../recoil/atom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ImageInput() {
  const [images, setImages] = useRecoilState<Array<File>>(imageState);
  const [selectIdx, setSelectIdx] = useState<number>(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const imageInput = useRef<HTMLInputElement>(null);
  // 이미지 업로드
  const onClickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (images.length > 4) {
      alert("최대 5장까지 업로드 가능합니다.");
    } else {
      if (file && file.length > 0) {
        const fileType = file[0].type;
        const maxSize = 6 * 1024 * 1024;
        const fileSize = file[0].size;

        if (fileType.startsWith("image/") || fileType.startsWith("gif/")) {
          if (fileSize > maxSize) {
            alert("최대 6MB까지 업로드 가능합니다.");
          } else {
            if (images.length > selectIdx) {
              const newImages = [...images];
              newImages[selectIdx] = file[0];
              setImages(newImages);
            } else {
              setImages([...images, file[0]]);
              setSelectIdx(selectIdx + 1);
            }
          }
        } else {
          alert("이미지 파일만 업로드 가능합니다.");
        }
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
    if (images.length > 4) {
      alert("최대 5장까지 업로드 가능합니다.");
    } else {
      if (file && file.length > 0) {
        const fileType = file[0].type;
        const maxSize = 6 * 1024 * 1024;
        const fileSize = file[0].size;

        if (fileType.startsWith("image/") || fileType.startsWith("gif/")) {
          if (fileSize > maxSize) {
            alert("최대 6MB까지 업로드 가능합니다.");
          } else {
            if (images.length > selectIdx) {
              const newImages = [...images];
              newImages[selectIdx] = file[0];
              setImages(newImages);
            } else {
              setImages([...images, file[0]]);
              setSelectIdx(selectIdx + 1);
            }
          }
        } else {
          alert("이미지 파일만 업로드 가능합니다.");
        }
      }
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((image, idx) => idx !== index));
  };

  return (
    <div
      onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
      draggable="false"
      className="flex items-center justify-center w-full"
    >
      {/* 이미지 업로드*/}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex justify-center border-2 border-dotted w-[50rem]"
      >
        {/* input 대신에 클릭 또는 drag & drop을 통해 파일 업로드 하는 코드 */}
        {images.length > 0 ? (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="flex flex-col items-center justify-center pt-5 pb-6"
          >
            {images.map((image: File, index: number) => (
              <SwiperSlide>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  onClick={() => {
                    setSelectIdx(index);
                    onClickImageUpload();
                  }}
                  className="cursor-pointer flex justify-center"
                ></img>
                <div
                  onClick={() => {
                    deleteImage(index);
                  }}
                  className="flex justify-end cursor-pointer hover:z-10"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <label
            htmlFor="dropzoneImage"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center pt-5 pb-6"
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                보내고 싶은 사진을 업로드하세요!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                (한 장당 6MB씩 최대 5장 가능합니다)
              </p>
            </div>
          </label>
        )}
        <input
          id="dropzoneImage"
          type="file"
          multiple
          accept="image/*, gif/*"
          ref={imageInput}
          onChange={handleImageInput}
          className="hidden"
        />
      </div>
      <div
        onClick={() => {
          setSelectIdx(images.length);
          onClickImageUpload();
        }}
        className="cursor-pointer"
      >
        사진 추가하기
      </div>
    </div>
  );
}
