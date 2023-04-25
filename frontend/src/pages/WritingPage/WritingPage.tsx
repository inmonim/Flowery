import { useRef, useState } from "react";
import styles from "./WritingPage.module.scss";

export default function WritingPage() {
  const imageInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      setImage(file[0]);
    }
  };

  const handleResizeHeight = (
    textarea: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    textarea.currentTarget.style.height = "auto";
    textarea.currentTarget.style.height = textarea.target.scrollHeight + "px";
  };

  return (
    // 전체 페이지
    <div className={styles.layout}>
      {/* 페이지 내용 */}
      <div className={styles.contents}>
        {/* 편지지 고르기 */}
        <div className={styles.selectLetterPaper}></div>
        {/* 편지 내용 */}
        <div className={styles.letter}>
          {/* 이미지 or 영상 */}
          <div className={styles.letterImage}>
            <input
              type="file"
              ref={imageInput}
              onChange={handleFileChange}
              className={styles.imageInput}
            ></input>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                onClick={onCickImageUpload}
                className={styles.image}
              ></img>
            ) : (
              <img
                src={require("../../assets/letters/ImageUpload.png")}
                onClick={onCickImageUpload}
                className={styles.image}
              ></img>
            )}
          </div>
          {/* 편지지 */}
          <div className={styles.letterPaper}>
            {/* 내용 */}
            <textarea
              rows={1}
              onChange={handleResizeHeight}
              className={styles.letterContent}
            ></textarea>
          </div>
        </div>
      </div>
      {/* 페이지 이동 */}
      <div className={styles.handlePage}></div>
    </div>
  );
}
