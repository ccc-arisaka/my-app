"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Upload } from "lucide-react"
import { FlowSection } from "./components/FlowSection"

// Define the structure for our chat messages
type MessageType = "agent" | "user" | "options" | "annotation" | "supplementary"
type InputType = "button" | "text" | "file" | "radio" | "none"

interface Message {
  id: number
  type: MessageType
  content: string
  inputType?: InputType
  options?: string[]
  annotation?: string
  supplementary?: string
  additionalContent?: string
  validation?: (value: string) => boolean
  color?: string
  autoFill?: boolean
  buttonTextColor?: string
  timestamp?: number
}

interface FileResponse {
  fileName: string
  fileId?: string
  fileUrl?: string
  fileSize?: number
  fileType?: string
}

type UserResponse = string | File | FileResponse

// Define our questionnaire flow
const questionnaireFlow: Message[] = [
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

// Add this function above the Home component
async function fetchAddressFromPostalCode(postalCode: string) {
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode.replace(/-/g, "")}`);
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      const { address1, address2 } = data.results[0];
      return `${address1}${address2}`;
    }
    return '';
  } catch (error) {
    console.error('Error fetching address:', error);
    return '';
  }
}

// Add CSS class for blur effect
const blurStyle = {
  filter: 'blur(4px)',
  userSelect: 'none',
};

export default function Home() {
  const router = useRouter()
  const [activeMessages, setActiveMessages] = useState<Message[]>([])
  const [userResponses, setUserResponses] = useState<Record<number, UserResponse>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [autoFilledAddress, setAutoFilledAddress] = useState<string>("")
  const [selectedRadioOption, setSelectedRadioOption] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize with the first message only once
  useEffect(() => {
    const initializeChat = () => {
      if (activeMessages.length === 0 && questionnaireFlow.length > 0) {
        setActiveMessages([{ ...questionnaireFlow[0], timestamp: Date.now() }]);
        setCurrentStep(0);
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure questionnaireFlow is loaded
    const timer = setTimeout(initializeChat, 100);
    return () => clearTimeout(timer);
  }, []);

  // Add the next question when user answers the previous one
  useEffect(() => {
    if (!isLoading && 
        activeMessages.length > 0 &&
        !isComplete &&
        activeMessages[activeMessages.length - 1].type === "user" &&
        currentStep < questionnaireFlow.length - 1
    ) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setActiveMessages((prev) => [
          ...prev,
          { ...questionnaireFlow[nextStep], timestamp: Date.now() },
        ]);
        setCurrentStep(nextStep);
        setInputValue("");
        setValidationError(null);
        setSelectedFile(null);
        setSelectedRadioOption("");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [activeMessages, isComplete, currentStep, isLoading]);

  const handleOptionSelect = async (questionId: number, option: string) => {
    // Add user response to the chat
    setActiveMessages((prev) => [...prev, { id: Date.now(), type: "user", content: option, timestamp: Date.now() }])

    // Store the response
    setUserResponses((prev) => ({
      ...prev,
      [questionId]: option,
    }))

    // If this is the last question, save to Google Sheets and navigate to results page
    if (questionId === questionnaireFlow[questionnaireFlow.length - 1].id) {
      try {
        // Prepare data for API
        const rowData = {
          timestamp: new Date().toISOString(),
          electricityBill: userResponses[1] || '',
          housingType: userResponses[2] || '',
          postalCode: userResponses[3] || '',
          address: `${autoFilledAddress}${userResponses[4] || ''}`,
          fileUploaded: (userResponses[5] && typeof userResponses[5] === 'object' && 'fileUrl' in userResponses[5] && userResponses[5].fileUrl)
            ? (userResponses[5] as FileResponse).fileUrl
            : '',
          solarStatus: userResponses[6] || '',
          name: userResponses[7] || '',
          phone: userResponses[8] || ''
        }

        // Send data to API
        const response = await fetch('/api/sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rowData),
        })

        if (!response.ok) {
          throw new Error('Failed to save data')
        }

        // Navigate to results page with query params
        const queryParams = new URLSearchParams()
        Object.entries(userResponses).forEach(([id, value]) => {
          if (!(value instanceof File)) {
            const question = questionnaireFlow.find((q) => q.id === Number(id))
            if (question) {
              switch (question.id) {
                case 1: queryParams.set("electricityBill", value as string); break
                case 2: queryParams.set("housingType", value as string); break
                case 3: queryParams.set("postalCode", value as string); break
                case 4: queryParams.set("address", `${autoFilledAddress}${value as string}`); break
                case 7: queryParams.set("name", value as string); break
                case 8: queryParams.set("phone", value as string); break
              }
            }
          }
        })

        router.push(`/results?${queryParams.toString()}`)
      } catch (error) {
        console.error('Error saving to Google Sheets:', error)
        // Fallback - still navigate to results page even if Google Sheets fails
        router.push('/results?error=google_sheets')
      }
    } else {
      // Add the next question immediately
      const nextStep = currentStep + 1;
      setActiveMessages((prev) => [
        ...prev,
        { ...questionnaireFlow[nextStep], timestamp: Date.now() },
      ]);
      setCurrentStep(nextStep);
      setInputValue("");
      setValidationError(null);
      setSelectedFile(null);
      setSelectedRadioOption("");
    }
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const currentQuestion = questionnaireFlow[currentStep]
    if (currentQuestion.validation && !currentQuestion.validation(inputValue)) {
      if (currentQuestion.id === 3) {
        setValidationError("正しい郵便番号形式で入力してください（例：123-4567）")
      } else if (currentQuestion.id === 8) {
        setValidationError("11桁の数字を入力してください（ハイフンなし）")
      } else {
        setValidationError("入力内容を確認してください")
      }
      return
    }
    setValidationError(null)
    setActiveMessages((prev) => [...prev, { id: Date.now(), type: "user", content: inputValue, timestamp: Date.now() }])
    setUserResponses((prev) => ({
      ...prev,
      [questionnaireFlow[currentStep].id]: inputValue,
    }))

    // If this is a postal code input (question ID 3), fetch the address
    if (currentQuestion.id === 3) {
      const address = await fetchAddressFromPostalCode(inputValue);
      if (address) {
        setAutoFilledAddress(address);
      }
    }

    setInputValue("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setSelectedFile(file)
    }
  }

  const handleFileSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      // Upload file to Drive
      const formData = new FormData();
      formData.append('file', selectedFile);
      const uploadRes = await fetch('/api/drive', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      // Add user response to the chat
      setActiveMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "user", content: `ファイルをアップロードしました: ${selectedFile.name}`, timestamp: Date.now() },
      ]);

      // Store the response with file info and Drive link
      setUserResponses((prev) => ({
        ...prev,
        [questionnaireFlow[currentStep].id]: {
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          fileType: selectedFile.type,
          fileUrl: uploadData.fileUrl, // Store the Drive link
        },
      }));

      // Add the next question to the chat
      const nextStep = currentStep + 1;
      if (nextStep < questionnaireFlow.length) {
        setActiveMessages((prev) => [
          ...prev,
          { ...questionnaireFlow[nextStep], timestamp: Date.now() },
        ]);
        setCurrentStep(nextStep);
      }
    } catch (error) {
      console.error('アップロードエラー:', error);
      setActiveMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "agent", content: "ファイルのアップロードに失敗しました。もう一度お試しください。", timestamp: Date.now() },
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  const resetQuestionnaire = () => {
    setActiveMessages([])
    setUserResponses({})
    setCurrentStep(0)
    setIsComplete(false)
    setInputValue("")
    setValidationError(null)
    setSelectedFile(null)
    setAutoFilledAddress("")
    setSelectedRadioOption("")
  }

  // Helper function to organize options into rows of 2
  const organizeOptionsIntoRows = (options: string[]) => {
    const rows = []
    for (let i = 0; i < options.length; i += 2) {
      const row = options.slice(i, i + 2)
      rows.push(row)
    }
    return rows
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Company logo */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto flex justify-center">
            <img src="/images/company-logo.png" alt="SOLA CLOUD" className="h-12 w-auto" />
          </div>
        </div>

        {/* Header banner */}
        <div className="w-full">
          <img 
            src="/images/header-banner.png" 
            alt="Solar Panel Promotion" 
            className="w-full h-auto hidden sm:block" 
          />
          <img 
            src="/images/Asset 1@4x.png" 
            alt="Solar Panel Promotion Mobile" 
            className="w-full h-auto sm:hidden" 
          />
        </div>

        {/* Main content */}
        <div className="w-full relative" style={{ backgroundColor: "#e6f2f3" }}>
          <div className="pt-0 pb-12 md:pb-24 px-4" style={{ marginTop: "-10px" }}>
            <div className="w-full max-w-2xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: "#66B1F9" }}></div>
                </div>
              ) : (
                <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    {/* Chat header */}
                    <div className="p-4 flex justify-center">
                      <img 
                        src="/images/header-logo.svg" 
                        alt="Questionnaire Header" 
                        className="w-full h-auto hidden sm:block" 
                      />
                      <img 
                        src="/images/Asset 3.svg" 
                        alt="Questionnaire Header Mobile" 
                        className="w-full h-auto sm:hidden" 
                      />
                    </div>

                    {/* Chat messages */}
                    <div className="p-4 flex flex-col gap-3">
                      {activeMessages.map((message) => (
                        <div key={`${message.id}-${message.timestamp}`} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                          {message.type === "agent" && (
                            <div className="flex-shrink-0 mr-2">
                              <div className="relative">
                                <img
                                  src="/images/operator.png"
                                  alt="オペレーター"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col">
                            {message.type === "agent" && (
                              <span className="text-xs text-gray-500 mb-1 ml-1">オペレーター</span>
                            )}
                            <div
                              className={`${
                                message.type === "user" ? "whitespace-nowrap" : "max-w-[80%]"
                              } p-3 rounded-lg ${message.type === "user" ? "text-white rounded-br-none" : "rounded-bl-none"}`}
                              style={{
                                backgroundColor: message.type === "user" ? "#68584B" : "#E2F5EE",
                                color: message.type === "user" ? "white" : "#68584B",
                              }}
                            >
                              {message.content}
                              {message.annotation && (
                                <div className="mt-2" style={{ color: message.color || "#F2739D" }}>
                                  {message.annotation}
                                </div>
                              )}
                              {message.supplementary && (
                                <div className="mt-2 text-xs text-gray-500">{message.supplementary}</div>
                              )}
                              {message.additionalContent && <div className="mt-2">{message.additionalContent}</div>}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Options section */}
                      {currentStep < questionnaireFlow.length &&
                        activeMessages.some((m) => m.id === questionnaireFlow[currentStep].id) &&
                        questionnaireFlow[currentStep].inputType === "button" && (
                          <div className="my-4">
                            {questionnaireFlow[currentStep].id === 9 ? (
                              <div className="flex justify-center">
                                <button
                                  className="relative h-[70px] w-[250px] font-bold hover:opacity-90 transition-opacity"
                                  onClick={() =>
                                    handleOptionSelect(
                                      questionnaireFlow[currentStep].id,
                                      questionnaireFlow[currentStep].options![0],
                                    )
                                  }
                                >
                                  <img src="/images/asset-13.png" alt="" className="w-full h-full absolute inset-0" />
                                  <span className="relative z-10 px-4 text-center" style={{ color: "#FFFA5A" }}>
                                    {questionnaireFlow[currentStep].options![0]}
                                  </span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-y-2">
                                {organizeOptionsIntoRows(questionnaireFlow[currentStep].options || []).map(
                                  (row, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-2 gap-x-2">
                                      {row.map((option) => (
                                        <button
                                          key={option}
                                          className="relative h-[90px] sm:h-[70px] font-bold hover:opacity-90 transition-opacity"
                                          onClick={() => handleOptionSelect(questionnaireFlow[currentStep].id, option)}
                                        >
                                          <img 
                                            src="/images/asset-7.svg" 
                                            alt="" 
                                            className="w-full h-full absolute inset-0 hidden sm:block" 
                                          />
                                          <img 
                                            src="/images/mobilebutton.svg" 
                                            alt="" 
                                            className="w-full h-full absolute inset-0 sm:hidden" 
                                          />
                                          <span className="relative z-10 px-4 text-center text-white text-lg sm:text-base">{option}</span>
                                        </button>
                                      ))}
                                      {row.length === 1 && <div className="invisible"></div>}
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        )}

                      {/* Radio options */}
                      {currentStep < questionnaireFlow.length &&
                        activeMessages.some((m) => m.id === questionnaireFlow[currentStep].id) &&
                        questionnaireFlow[currentStep].inputType === "radio" && (
                          <div className="flex flex-col gap-y-2 my-4">
                            {organizeOptionsIntoRows(questionnaireFlow[currentStep].options || []).map((row, rowIndex) => (
                              <div key={rowIndex} className="grid grid-cols-2 gap-x-2">
                                {row.map((option) => (
                                  <button
                                    key={option}
                                    className="relative h-[90px] sm:h-[70px] font-bold hover:opacity-90 transition-opacity"
                                    onClick={() => handleOptionSelect(questionnaireFlow[currentStep].id, option)}
                                  >
                                    <img 
                                      src="/images/asset-7.svg" 
                                      alt="" 
                                      className="w-full h-full absolute inset-0 hidden sm:block" 
                                    />
                                    <img 
                                      src="/images/mobilebutton.svg" 
                                      alt="" 
                                      className="w-full h-full absolute inset-0 sm:hidden" 
                                    />
                                    <span className="relative z-10 px-4 text-center text-white text-lg sm:text-base">{option}</span>
                                  </button>
                                ))}
                                {row.length === 1 && <div className="invisible"></div>}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* File upload */}
                      {currentStep < questionnaireFlow.length &&
                        activeMessages.some((m) => m.id === questionnaireFlow[currentStep].id) &&
                        questionnaireFlow[currentStep].inputType === "file" && (
                          <div className="my-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex flex-col items-center">
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".jpg,.jpeg,.png,.pdf,.heic"
                                className="hidden"
                              />
                              <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                                className="mb-2 w-full flex items-center justify-center gap-2"
                              >
                                <Upload className="h-4 w-4" />
                                ファイルを選択
                              </Button>
                              {selectedFile && (
                                <div className="text-sm text-gray-600 mb-2">選択されたファイル: {selectedFile.name}</div>
                              )}
                              <Button
                                onClick={handleFileSubmit}
                                disabled={!selectedFile || isUploading}
                                style={{ backgroundColor: "#68584B", color: "white" }}
                                className="w-full hover:opacity-90"
                              >
                                {isUploading ? "アップロード中..." : "アップロード"}
                              </Button>
                            </div>
                          </div>
                        )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Text input form */}
                    {currentStep < questionnaireFlow.length &&
                      questionnaireFlow[currentStep].inputType === "text" &&
                      activeMessages.some((m) => m.id === questionnaireFlow[currentStep].id) &&
                      !isComplete && (
                        <form onSubmit={handleTextSubmit} className="p-4 border-t border-gray-200 flex flex-col gap-3">
                          {questionnaireFlow[currentStep].id === 4 && (
                            <>
                              <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">都道府県・区</label>
                                <input
                                  type="text"
                                  value={autoFilledAddress}
                                  onChange={(e) => setAutoFilledAddress(e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="都道府県・区を入力"
                                />
                              </div>
                              <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">住所・番地</label>
                                <input
                                  type="text"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  placeholder="住所・番地を入力してください"
                                  className={`w-full p-2 border ${
                                    validationError ? "border-red-500" : "border-gray-300"
                                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                              </div>
                            </>
                          )}
                          {questionnaireFlow[currentStep].id !== 4 && (
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder={
                                questionnaireFlow[currentStep].id === 3
                                  ? "例: 123-4567"
                                  : questionnaireFlow[currentStep].id === 8
                                    ? "例: 09012345678"
                                    : "ここに回答を入力してください..."
                              }
                              className={`w-full p-2 border ${
                                validationError ? "border-red-500" : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                          )}
                          {validationError && <div className="text-red-500 text-sm">{validationError}</div>}
                          <button type="submit" className="relative w-full h-[70px] hover:opacity-90 transition-opacity">
                            <img src="/images/asset-8.svg" alt="送信" className="w-full h-full object-contain" />
                          </button>
                        </form>
                      )}

                      {/* Reset button */}
                      {isComplete && (
                        <div className="p-4 border-t border-gray-200 flex justify-center">
                          <Button
                            onClick={resetQuestionnaire}
                            variant="outline"
                            className="flex gap-2"
                            style={{ borderColor: "#68584B", color: "#68584B" }}
                          >
                            <RefreshCw className="h-4 w-4" />
                            最初からやり直す
                          </Button>
                        </div>
                      )}

                      {/* Summary section */}
                      {isComplete && (
                        <Card className="w-full mt-6 p-4 bg-white shadow-md rounded-xl">
                          <h2 className="text-xl font-bold mb-4" style={{ color: "#68584B" }}>
                            回答の概要
                          </h2>
                          <div className="space-y-3">
                            {Object.entries(userResponses).map(([questionId, response]) => {
                              const question = questionnaireFlow.find((q) => q.id === Number.parseInt(questionId));
                              if (!question) return null;
                              return (
                                <div key={questionId} className="border-b border-gray-100 pb-2">
                                  <p className="text-sm font-medium text-gray-500">{question.content}</p>
                                  <p style={{ color: "#68584B" }}>
                                    {response instanceof File ? `ファイル: ${response.name}` :
                                      typeof response === "object" && response !== null ? 
                                        `ファイル: ${response.fileName}${response.fileSize ? ` (${Math.round(response.fileSize / 1024)}KB)` : ''}` :
                                      question.id === 1 ? (
                                        <span>
                                          約【
                                          <span style={{ filter: 'blur(12px)', userSelect: 'none' }}>{response}</span>
                                          円】
                                        </span>
                                      ) :
                                      question.id === 2 ? (
                                        <span>
                                          約【
                                          <span style={{ filter: 'blur(12px)', userSelect: 'none' }}>{response}</span>
                                          年】
                                        </span>
                                      ) :
                                      response}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: "#E2F5EE", color: "#68584B" }}>
                            フィードバックをありがとうございました！実際のアプリケーションでは、このデータはサーバーに送信されます。
                          </div>
                        </Card>
                      )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        <FlowSection />
      </div>
    </>
  );
}
