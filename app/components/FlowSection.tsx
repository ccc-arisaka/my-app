"use client"

import React from "react"

export function FlowSection() {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative flex flex-col">
        {/* Desktop content with background */}
        <div className="relative hidden sm:block">
          <div className="relative w-full" style={{ aspectRatio: "1920/1080", minHeight: "800px" }}>
            <img src="/images/asset-6.svg" alt="装飾的な背景" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center w-full max-w-4xl px-4">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <img src="/images/asset-9.svg" alt="" className="h-4 sm:h-6 md:h-8 w-auto mr-2 md:mr-3" />
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#68584B" }}>
                    ご利用の流れ
                  </h2>
                  <img src="/images/asset-9.svg" alt="" className="h-4 sm:h-6 md:h-8 w-auto ml-2 md:ml-3" />
                </div>
                <div className="mx-auto w-[85%] sm:w-[90%] md:w-[95%] flex justify-center relative" style={{ maxWidth: "800px", height: "500px" }}>
                  <img
                    src="/images/asset-12.png"
                    alt="ご利用の流れ"
                    className="w-full h-full rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile background */}
        <div className="relative block sm:hidden overflow-hidden" style={{ height: "800px" }}>
          <img src="/images/Asset 9.svg" alt="装飾的な背景 モバイル" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col items-center justify-start">
            <div className="text-center w-full max-w-4xl px-4 mt-8">
              <div className="flex items-center justify-center mb-4 md:mb-6">
                <img src="/images/asset-9.svg" alt="" className="h-4 sm:h-6 md:h-8 w-auto mr-2 md:mr-3" />
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#68584B" }}>
                  ご利用の流れ
                </h2>
                <img src="/images/asset-9.svg" alt="" className="h-4 sm:h-6 md:h-8 w-auto ml-2 md:ml-3" />
              </div>
              <div className="mx-auto w-[85%] sm:w-[90%] md:w-[95%] flex justify-center relative" style={{ maxWidth: "800px", height: "500px" }}>
                <div className="w-full block sm:hidden flex justify-center">
                  <img
                    src="/images/Asset 10.svg"
                    alt="ご利用の流れ モバイル"
                    className="w-[200%] h-auto rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ backgroundColor: "#828282" }} className="w-full py-3 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-6 mb-1">
              <a href="#" className="text-white text-xs hover:underline">
                運営会社
              </a>
              <a href="#" className="text-white text-xs hover:underline">
                利用規約
              </a>
              <a href="#" className="text-white text-xs hover:underline">
                プライバシーポリシー
              </a>
            </div>
            <div className="text-center text-white text-[10px]">©SOLA CLOUD All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  )
} 