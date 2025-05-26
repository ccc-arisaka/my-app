import { Message } from "../types/chat"

export const questionnaireFlow: Message[] = [
  {
    id: 1,
    type: "agent",
    content: "毎月の電気代を教えてください",
    inputType: "button",
    options: ["20,000円以上", "15,000円〜19,999円", "10,000円〜14,999円", "9,999円以下"],
  },
  {
    id: 2,
    type: "agent",
    content: "住宅について教えてください",
    inputType: "button",
    annotation: "月々の電気代を大幅に削減、または0円になる可能性があります！",
    options: ["平屋", "２階建て", "２世帯住宅", "狭小住宅", "その他"],
  },
  {
    id: 3,
    type: "agent",
    content: "設置場所の郵便番号を教えてください",
    inputType: "text",
    validation: (value: string) => {
      // Japanese postal code validation (XXX-XXXX or XXXXXXX)
      return /^\d{3}-?\d{4}$/.test(value)
    },
  },
  {
    id: 4,
    type: "agent",
    content: "続いて住所をご入力ください",
    inputType: "text",
    supplementary: "※正確な診断を実施するため番地までご記入ください",
    additionalContent: "販促物の送付や訪問による営業は一切ございませんのでご安心ください♪",
    autoFill: true,
  },
  {
    id: 5,
    type: "agent",
    content: "お家の図面をアップロードしてください",
    inputType: "file",
  },
  {
    id: 6,
    type: "agent",
    content: "現在太陽光・蓄電池は導入されていますか？",
    inputType: "radio",
    options: ["どちらも導入していない", "太陽光のみ導入している", "太陽光・蓄電池を導入している"],
  },
  {
    id: 7,
    type: "agent",
    content: "お名前を教えてください",
    inputType: "text",
  },
  {
    id: 8,
    type: "agent",
    content: "電話番号を教えてください",
    inputType: "text",
    validation: (value: string) => {
      // 11-digit phone number validation (no hyphens)
      return /^\d{11}$/.test(value)
    },
  },
  {
    id: 9,
    type: "agent",
    content: "電気代減額診断をする",
    inputType: "button",
    options: ["電気代減額診断をする"],
    color: "#FFFA5A",
  },
] 