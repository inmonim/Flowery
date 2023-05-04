import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
////////////////// pages/SignInSelectPage/NonMemberModal.tsx
// 인증된 전화번호
export const phoneNumberState = atom<string>({
  key: "phoneNumberState",
  default: "0",
  effects_UNSTABLE: [persistAtom],
});

////////////////// pages/WritingPage/WritingPage.tsx
// 업로드한 이미지
export const imageState = atom<File | null>({
  key: "imageState",
  default: null,
  //   effects_UNSTABLE: [persistAtom],
});

// 업로드한 영상
export const videoState = atom<File | null>({
  key: "videoState",
  default: null,
  //   effects_UNSTABLE: [persistAtom],
});

// 편지지 종류
export const letterPaperState = atom<number>({
  key: "letterPaperState",
  default: 2,
  effects_UNSTABLE: [persistAtom],
});

// 편지 글씨체
export const letterFontState = atom<number>({
  key: "letterFontState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 편지 내용
export const totalTextState = atom<string>({
  key: "totalTextState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
