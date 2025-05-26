"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Phone } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [estimatedSavings, setEstimatedSavings] = useState<number>(0)

  // Get data from URL params
  const postalCode = searchParams.get("postalCode")
  const address = searchParams.get("address")
  const electricityBill = searchParams.get("electricityBill")
  const housingType = searchParams.get("housingType")
  const name = searchParams.get("name")
  const phone = searchParams.get("phone")

  useEffect(() => {
    // Simulate loading and calculation
    const timer = setTimeout(() => {
      // Calculate estimated savings based on electricity bill
      let savings = 0
      if (electricityBill === "20,000円以上") {
        savings = Math.floor(Math.random() * 10000) + 10000
      } else if (electricityBill === "15,000円〜19,999円") {
        savings = Math.floor(Math.random() * 5000) + 7500
      } else if (electricityBill === "10,000円〜14,999円") {
        savings = Math.floor(Math.random() * 3000) + 5000
      } else {
        savings = Math.floor(Math.random() * 2000) + 3000
      }
      setEstimatedSavings(savings)
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [electricityBill])

  // If any required data is missing, redirect to home
  useEffect(() => {
    if (!postalCode || !address || !electricityBill || !housingType || !name || !phone) {
      router.push('/')
    }
  }, [postalCode, address, electricityBill, housingType, name, phone, router])

  const handleBackToHome = () => {
    router.push("/")
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin mx-auto" style={{ borderTopColor: "#66B1F9" }}></div>
          <p className="mt-4 text-lg" style={{ color: "#68584B" }}>診断結果を計算中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Company logo in a white header section */}
      <div className="w-full bg-white shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto flex justify-center">
          <img src="/images/company-logo.png" alt="SOLA CLOUD" className="h-12 w-auto" />
        </div>
      </div>

      {/* Full width light blue background section */}
      <div className="w-full relative" style={{ marginTop: "-10px" }}>
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/images/asset-14.svg" 
            alt="Background" 
            className="w-full h-full object-cover hidden sm:block" 
            style={{ width: '100%', height: '100%' }}
          />
          <div 
            className="w-full h-full sm:hidden" 
            style={{ backgroundColor: '#E6F2F3', width: '100%', height: '100%' }}
          />
        </div>
        <div className="pt-0 pb-12 md:pb-24 px-4">
          <div className="w-full max-w-2xl mx-auto">
            {/* Results content */}
            <Card className="w-full bg-white shadow-lg rounded-xl overflow-hidden mt-16 relative z-10">
              <CardContent className="p-0">
                <div className="p-4 flex justify-center items-center border-b border-gray-100">
                  <img src="/images/asset-15.svg" alt="Magnifying Glass" className="h-8 w-8 mr-2" />
                  <h1 className="text-2xl font-bold" style={{ color: "#3283FF" }}>
                    診断完了！
                  </h1>
                </div>

                <div className="p-4 bg-gray-100 border-b border-gray-200">
                  <p className="text-center" style={{ color: "#68584B" }}>
                    <span className="text-sm">あなたのご家庭には…</span><br />
                    導入すれば最大<span style={{ color: "#F2739D" }}>【年間10万円以上の削減効果】</span>が見込めます！
                  </p>
                  <div className="mt-3 p-2 rounded" style={{ backgroundColor: "#E6F2F3" }}>
                    <div className="flex items-center justify-center gap-2">
                      <img src="/images/Asset 15 (2).svg" alt="アイコン" className="h-5 w-5" />
                      <p className="text-center text-sm" style={{ color: "#555555", margin: 0 }}>一部結果を表示中</p>
                      <img src="/images/Asset 15 (2).svg" alt="アイコン" className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 rounded bg-white shadow-sm relative">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>項目</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>試算結果（抜粋）</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>初期費用</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3"><span style={{ color: '#F2739D' }} className="text-xl font-bold">０円対象です</span></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>メンテナンス・保証費用</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3"><span style={{ color: '#F2739D' }} className="text-xl font-bold">０円対象です</span></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>月々の電気代</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>
                            約【
                            <span style={{ filter: 'blur(4px)', userSelect: 'none', display: 'inline-block', background: '#f3f3f3', borderRadius: '4px', padding: '0 8px' }}>
                              ●●,●●●
                            </span>
                            円】
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>電気代支払い終了年度</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>
                            約【
                            <span style={{ filter: 'blur(4px)', userSelect: 'none', display: 'inline-block', background: '#f3f3f3', borderRadius: '4px', padding: '0 8px' }}>
                              ●●●●
                            </span>
                            年】
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>設置適性</td>
                          <td className="border border-gray-200 p-2 text-center w-2/3"><span style={{ color: '#F2739D' }}>◎</span><span style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282' }}>（非常に高い）</span></td>
                        </tr>
                        <tr style={{ position: 'relative' }}>
                          <td className="border border-gray-200 p-2 text-center w-1/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282', height: '40px', borderBottom: 'none' }}></td>
                          <td className="border border-gray-200 p-2 text-center w-2/3" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#828282', height: '40px', borderBottom: 'none' }}></td>
                          <div style={{
                            position: 'absolute',
                            bottom: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0px',
                            zIndex: 1
                          }}>
                            <span style={{ color: '#828282', fontSize: '18px', lineHeight: '0.8' }}>•</span>
                            <span style={{ color: '#828282', fontSize: '18px', lineHeight: '0.8' }}>•</span>
                            <span style={{ color: '#828282', fontSize: '18px', lineHeight: '0.8' }}>•</span>
                          </div>
                          <div style={{ 
                            position: 'absolute',
                            bottom: 0,
                            left: '-1px',
                            right: '-1px',
                            height: '150%',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)',
                            pointerEvents: 'none',
                            width: 'calc(100% + 2px)'
                          }}></div>
                        </tr>
                        <tr>
                          <td colSpan={2} className="p-0 border-none" style={{ height: '32px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,1))', opacity: 0.7 }}>
                            {/* Faded continuation row */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center" style={{ marginTop: '-10px', position: 'relative', zIndex: 2 }}>
                      <a href="#" className="text-blue-500 underline hover:text-blue-600 transition-colors">
                        続きを見る
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 text-center" style={{ marginTop: '-10px', position: 'relative', zIndex: 10 }}>
                    <img src="/images/Asset 22.svg" alt="Clip Art" className="w-full mx-auto hidden sm:block" />
                    <img src="/images/Asset 23.svg" alt="Clip Art Mobile" className="w-full mx-auto sm:hidden" />
                  </div>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div
                        className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
                        style={{ borderTopColor: "#66B1F9" }}
                      ></div>
                      <p className="mt-4 text-lg" style={{ color: "#68584B" }}>
                        診断結果を計算中...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white shadow p-6">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center">
                            <img src="/images/Asset 18@4x.png" alt="キャンペーンアイコン" className="w-12 h-12 mr-3" />
                            <div>
                              <h2 className="text-center">
                                <span className="text-sm font-bold" style={{ color: "#555555" }}>
                                  今回のキャンペーンはSOLACLOUD（ソラクラウド）による
                                </span>
                                <br />
                                <span className="text-base font-bold" style={{ color: "#F2739D" }}>
                                  「全国義務化に伴う導入支援企画」
                                </span>
                                <span className="text-base font-bold" style={{ color: "#555555" }}>
                                  として実施しています。<br></br>
                                </span>
                                <br />
                              </h2>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <h3 className="text-2xl font-bold mb-3 text-center" style={{ color: "#F2739D" }}>
                            本企画の特徴
                          </h3>
                          <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center items-stretch gap-[5px]">
                            <div className="flex-1 flex flex-col items-center">
                              <img src="/images/icon1_1@4x.png" alt="メンテナンス費用も完全0円" className="w-40 h-40 sm:w-48 sm:h-48 object-contain" />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <img src="/images/icon2_1@4x.png" alt="初期費用0円" className="w-40 h-40 sm:w-48 sm:h-48 object-contain" />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <img src="/images/icon3@4x.png" alt="工事費・申請費用もすべて0円" className="w-40 h-40 sm:w-48 sm:h-48 object-contain" />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <img src="/images/icon4@4x.png" alt="延長サポート付きで業界最長クラスの保証" className="w-40 h-40 sm:w-48 sm:h-48 object-contain" />
                            </div>
                          </div>
                          <p className="text-left text-base mt-4 mb-6" style={{ color: '#555' }}>
                            さらに、従来の訪問営業とは異なり、
                            <span style={{ color: '#F2739D' }}>完全オンラインで完結する新しいスタイル</span>で、太陽光と蓄電池の導入が可能です。
                          </p>
                          <div className="text-center text-base mt-4 mb-6" style={{ color: '#555' }}>
                            <div style={{ backgroundColor: '#FEF1F5', color: '#F2739D', padding: '8px 0', width: '100%', textAlign: 'center', marginBottom: '8px' }}>※※本企画への参加条件※※</div>
                            <br />
                            <div style={{ textAlign: 'left' }}>
                              1. <span style={{ color: '#F2739D' }}>現在の電気代よりも、導入後の支払いが安くなることが前提</span>です。発電量の条件などをふまえて、導入可能かどうかの事前診断を行います。<br /><br />
                              2. <span style={{ color: '#F2739D' }}>ご本人（決定権を持つ方）がオンライン説明（約20分）に参加できること</span>が必須です。ご本人でない場合、企画対象外となります。<br /><br />
                              3. <span style={{ color: '#F2739D' }}>オンライン説明当日に、参加・不参加のご判断をいただくこと</span>が必要です。後日の判断はできません。<br />
                            </div>
                            <br />
                            <div style={{ textAlign: 'left', marginTop: '1em', fontSize: '12px', fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400 }}>
                             <span style={{ color: '#F44336', fontWeight: 'bold' }}>《注意事項》</span><br />
                              この企画は、全国の参加者の協力により、通常より大幅にコストを削減して成り立っています。<br />
                              そのため、以下の点をご理解・ご協力ください：<br />
                              ・オンライン説明には必ず決定権のあるご本人が参加し、20分間は離席なしでお願い致します。<br />
                              ・説明当日中に「参加／不参加」のご判断をお願いします。<br />
                              ・後日改めて、という対応はできません。別の希望者の枠を確保するためです。<br />
                              ・説明当日の無断キャンセルは絶対にお控えください。<br />
                              ・この企画は、施工日や人件費の最適化により低価格を実現しています。そのため、無断キャンセルがあると他の方が参加できず、企画自体の継続が困難になります。<br />
                              なお、当日ご参加いただけない場合でも全く問題はありません。<br />
                              他の希望者にお譲りする形となりますので、お気軽にお伝えください。<br />
                              ただし、無断キャンセル（ドタキャン）があった場合は、今後一切ソラクラウドのサービスをご案内できなくなりますのでご注意ください。<br />
                              通常価格での導入（50%以上高額）やメンテナンス費用が別途発生する購入方法となるため、ぜひこの機会を有効にご活用ください。
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-0 sm:p-6 -mt-[400px] sm:mt-6 flex justify-center relative z-10">
                        <img 
                          src="/images/Asset 17@4x.png" 
                          alt="説明用カード" 
                          className="max-w-full h-auto hidden sm:block" 
                        />
                        <div className="w-full sm:hidden">
                          <img 
                            src="/images/Asset 5.svg" 
                            alt="説明用カード Mobile" 
                            className="w-full h-auto" 
                          />
                        </div>
                      </div>
                      <div className="bg-white flex flex-col justify-center items-center m-0 p-0 border-none">
                        <img src="/images/Asset 19@4x.png" alt="説明用カード2" className="max-w-[300px] h-auto m-0 p-0 border-none" />
                        <img 
                          src="/images/Asset 20.svg" 
                          alt="説明用カード3" 
                          className="max-w-[500px] h-auto m-0 p-0 border-none hidden sm:block" 
                        />
                        <img 
                          src="/images/Asset 8@4x.png" 
                          alt="説明用カード3 Mobile" 
                          className="w-full h-auto m-0 p-0 border-none sm:hidden" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile clip art before footer */}
      <div className="sm:hidden w-full">
        <img 
          src="/images/Asset 24.svg" 
          alt="Mobile Clip Art" 
          className="w-full h-auto"
        />
      </div>

      {/* Footer section - smaller size */}
      <footer style={{ backgroundColor: "#828282" }} className="w-full py-3 mt-auto z-10">
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
  )
}
