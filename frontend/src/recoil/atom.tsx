import { atom } from "recoil";

////////////////// pages/SignInSelectPage/NonMemberModal.tsx
// 인증된 전화번호
export const phoneNumberState = atom<string>({
    key: 'phoneNumberState',
    default: '0'
})


////////////////// pages/WritingPage/WritingPage.tsx
// 업로드한 이미지(영상)
export const imageState = atom<File | null>({
    key: 'imageState',
    default: null
})

// 편지지 종류
export const letterPaperState = atom<number>({
    key: 'letterPaperState',
    default: 1
})

// 편지 글씨체
export const letterFontState = atom<number>({
    key: 'letterFontState',
    default: 1
})

// 편지 내용
export const totalTextState = atom<string>({
    key: 'totalTextState',
    default: ""
})