import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 로그인 여부
export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 카드
export const cardUrl = atom<string>({
  key: "cardUrl",
  default: "",
});

// 인증된 전화번호
export const phoneNumberState = atom<string>({
  key: "phoneNumberState",
  default: "0",
  effects_UNSTABLE: [persistAtom],
});

// 업로드한 이미지
export const imageState = atom<Array<File>>({
  key: "imageState",
  default: [],
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

export const storeId = atom<number>({
  key: "storeId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const storeName = atom<string>({
  key: "storeName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
