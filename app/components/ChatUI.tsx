"use client"

import React, { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Upload } from "lucide-react"
import { Message } from "../types/chat"

interface ChatUIProps {
  activeMessages: Message[]
  currentStep: number
  inputValue: string
  setInputValue: (value: string) => void
  validationError: string | null
  selectedFile: File | null
  autoFilledAddress: string
  setAutoFilledAddress: (value: string) => void
  handleOptionSelect: (questionId: number, option: string) => void
  handleTextSubmit: (e: React.FormEvent) => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileSubmit: () => void
  resetQuestionnaire: () => void
  isComplete: boolean
  questionnaireFlow: Message[]
  organizeOptionsIntoRows: (options: string[]) => string[][]
  userResponses: Record<string, string | File>
}

export function ChatUI({
  activeMessages,
  currentStep,
  inputValue,
  setInputValue,
  validationError,
  selectedFile,
  autoFilledAddress,
  setAutoFilledAddress,
  handleOptionSelect,
  handleTextSubmit,
  handleFileUpload,
  handleFileSubmit,
  resetQuestionnaire,
  isComplete,
  questionnaireFlow,
  organizeOptionsIntoRows,
  userResponses,
}: ChatUIProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-0">
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
                    disabled={!selectedFile}
                    style={{ backgroundColor: "#68584B", color: "white" }}
                    className="w-full hover:opacity-90"
                  >
                    アップロード
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
                const question = questionnaireFlow.find((q) => q.id === Number.parseInt(questionId))
                if (!question) return null
                return (
                  <div key={questionId} className="border-b border-gray-100 pb-2">
                    <p className="text-sm font-medium text-gray-500">{question.content}</p>
                    <p style={{ color: "#68584B" }}>
                      {response instanceof File ? `ファイル: ${response.name}` : response}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: "#E2F5EE", color: "#68584B" }}>
              フィードバックをありがとうございました！実際のアプリケーションでは、このデータはサーバーに送信されます。
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  )
} 