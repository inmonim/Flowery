import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 로그인 여부
export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 인증된 전화번호
export const phoneNumberState = atom<string>({
  key: "phoneNumberState",
  default: "0",
  effects_UNSTABLE: [persistAtom],
});

// 카드 이미지
export const cardImg = atom<string>({
  key: "cardImgState",
  default: "",
});

// 카드 종류
export const cardState = atom<number>({
  key: "cardState",
  default: 0,
});

// 카드 보내는 이름
export const cardName = atom<string>({
  key: "cardNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 카드 보내는 이름 입력 여부
export const isCardName = atom<boolean>({
  key: "isCardNameState",
  default: true,
});

// 카드 한줄글
export const cardContent = atom<string>({
  key: "cardContentState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 카드 한줄글 입력 여부
export const isCardContent = atom<boolean>({
  key: "isCardContentState",
  default: true,
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
  default: 1,
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

//예약 정보
export const reservationInfo = atom({
  key: "resrvationInfo",
  default: {
    userId: 1,
    storeId: 1,
    messageId: "1",
    goodsName: "장미다발",
    price: 10000,
    demand: "여기 요청사항이 적혀진다 이말이야",
    date: "2023-05-04T11:44:30.32795",
    reservationName: "예약명",
    phrase: "구매자 입력하는 짧은 카드 문구",
  },
});

// 예약 최종 제출 모달 오픈 여부
export const reservationConfirmState = atom<boolean>({
  key: "reservationConfirmState",
  default: false,
});

//가게 리스트 (창근)
export const shopListState = atom({
  key: "shopListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//가게 정보(창근)
export const shopDataState = atom({
  key: "shopDataState",
  default: [],
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

// 예약 시간 (창근)
export const reservationTimeState = atom<string>({
  key: "storeTimeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 예약 날짜 (창근)
export const reservatonDayState = atom<string>({
  key: "storeDayState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 상품 선택 (창근)
export const goodsState = atom({
  key: "goodsState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const storeInfo = atom<any>({
  key: "storeInfo",
  default: {
    storeId: 0,
    storeName: "",
    storePhone: "",
    permit: 0,
    open: 0,
    close: 0,
    address: "",
    info: "",
    image: "",
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});
