import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { videoState } from "../../../recoil/atom";

export default function VideoInput() {
  const [video, setVideo] = useRecoilState<File | null>(videoState);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const imageInput = useRef<HTMLInputElement>(null);
  // 이미지 업로드
  const onClickVideoUpload = () => {
    imageInput.current?.click();
  };

  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileType = file[0].type;
      const maxSize = 50 * 1024 * 1024;
      const fileSize = file[0].size;

      if (
        fileType.startsWith("video/")
      ) {
        if (fileSize > maxSize) {
          alert("최대 50MB까지 업로드 가능합니다.");
        } else {
          setVideo(file[0]);
        }
      } else {
        alert("동영상 파일만 업로드 가능합니다.");
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
      const maxSize = 50 * 1024 * 1024;
      const fileSize = file[0].size;

      if (
        fileType.startsWith("video/")
      ) {
        if (fileSize > maxSize) {
          alert("최대 50MB까지 업로드 가능합니다.");
        } else {
          setVideo(file[0]);
        }
      } else {
        alert("동영상 파일만 업로드 가능합니다.");
      }
    }
  };

  return (
    <div
      onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
      draggable="false"
      className="flex items-center justify-center w-full"
    >
      {/* 영상 업로드*/}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex justify-center border-2 border-dotted w-[50em]   "
      >
        {/* input 대신에 클릭 또는 drag & drop을 통해 파일 업로드 하는 코드 */}
        {video ? (
          <video src={URL.createObjectURL(video)} onClick={onClickVideoUpload} className="cursor-pointer"></video>
        ) : (
          <label
            htmlFor="dropzoneVideo"
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
                보내고 싶은 영상을 업로드하세요!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                (영상은 최대 50MB, 약 20초 내외로 가능합니다)
              </p>
            </div>
          </label>
        )}
        <input
          id="dropzoneVideo"
          type="file"
          multiple
          accept="video/*"
          ref={imageInput}
          onChange={handleVideoInput}
          className="hidden"
        />
      </div>
    </div>
  );
}
