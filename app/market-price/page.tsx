"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function MarketPricePage() {
  const [periodTab, setPeriodTab] = useState("weekly")

  // 오늘 날짜 기준 더미 데이터 (2025.05.06)
  const marketPrices = {
    korea: [
      { date: "2025.05.06", price: "34,500", change: "+1,500", isUp: true },
      { date: "2025.05.05", price: "33,000", change: "+1,000", isUp: true },
      { date: "2025.05.04", price: "32,000", change: "+500", isUp: true },
      { date: "2025.05.03", price: "31,500", change: "-500", isUp: false },
      { date: "2025.05.02", price: "32,000", change: "+1,000", isUp: true },
      { date: "2025.05.01", price: "31,000", change: "+500", isUp: true },
      { date: "2025.04.30", price: "30,500", change: "-300", isUp: false },
    ],
    china: [
      { date: "2025.05.06", price: "29,800", change: "+1,300", isUp: true },
      { date: "2025.05.05", price: "28,500", change: "-500", isUp: false },
      { date: "2025.05.04", price: "29,000", change: "+800", isUp: true },
      { date: "2025.05.03", price: "28,200", change: "+200", isUp: true },
      { date: "2025.05.02", price: "28,000", change: "-300", isUp: false },
      { date: "2025.05.01", price: "28,300", change: "+300", isUp: true },
      { date: "2025.04.30", price: "28,000", change: "-200", isUp: false },
    ],
    japan: [
      { date: "2025.05.06", price: "36,200", change: "+1,200", isUp: true },
      { date: "2025.05.05", price: "35,000", change: "+800", isUp: true },
      { date: "2025.05.04", price: "34,200", change: "-300", isUp: false },
      { date: "2025.05.03", price: "34,500", change: "+500", isUp: true },
      { date: "2025.05.02", price: "34,000", change: "+200", isUp: true },
      { date: "2025.05.01", price: "33,800", change: "+300", isUp: true },
      { date: "2025.04.30", price: "33,500", change: "-200", isUp: false },
    ],
  }

  // 차트 데이터 (주간/월간/연간)
  const chartData = {
    korea: {
      weekly: [
        { date: "04.30", price: 30500 },
        { date: "05.01", price: 31000 },
        { date: "05.02", price: 32000 },
        { date: "05.03", price: 31500 },
        { date: "05.04", price: 32000 },
        { date: "05.05", price: 33000 },
        { date: "05.06", price: 34500 },
      ],
      monthly: [
        { date: "04.06", price: 29500 },
        { date: "04.10", price: 30000 },
        { date: "04.15", price: 30800 },
        { date: "04.20", price: 31200 },
        { date: "04.25", price: 31500 },
        { date: "04.30", price: 30500 },
        { date: "05.01", price: 31000 },
        { date: "05.02", price: 32000 },
        { date: "05.03", price: 31500 },
        { date: "05.04", price: 32000 },
        { date: "05.05", price: 33000 },
        { date: "05.06", price: 34500 },
      ],
      yearly: [
        { date: "2024.06", price: 29500 },
        { date: "2024.07", price: 30000 },
        { date: "2024.08", price: 29800 },
        { date: "2024.09", price: 30000 },
        { date: "2024.10", price: 30800 },
        { date: "2024.11", price: 30500 },
        { date: "2024.12", price: 31000 },
        { date: "2025.01", price: 32000 },
        { date: "2025.02", price: 31500 },
        { date: "2025.03", price: 32000 },
        { date: "2025.04", price: 33000 },
        { date: "2025.05", price: 34500 },
      ],
    },
    china: {
      weekly: [
        { date: "04.30", price: 28000 },
        { date: "05.01", price: 28300 },
        { date: "05.02", price: 28000 },
        { date: "05.03", price: 28200 },
        { date: "05.04", price: 29000 },
        { date: "05.05", price: 28500 },
        { date: "05.06", price: 29800 },
      ],
      monthly: [
        { date: "04.06", price: 26800 },
        { date: "04.10", price: 27000 },
        { date: "04.15", price: 27400 },
        { date: "04.20", price: 27200 },
        { date: "04.25", price: 27500 },
        { date: "04.30", price: 28000 },
        { date: "05.01", price: 28300 },
        { date: "05.02", price: 28000 },
        { date: "05.03", price: 28200 },
        { date: "05.04", price: 29000 },
        { date: "05.05", price: 28500 },
        { date: "05.06", price: 29800 },
      ],
      yearly: [
        { date: "2024.06", price: 25800 },
        { date: "2024.07", price: 26100 },
        { date: "2024.08", price: 26000 },
        { date: "2024.09", price: 26200 },
        { date: "2024.10", price: 26700 },
        { date: "2024.11", price: 26500 },
        { date: "2024.12", price: 26800 },
        { date: "2025.01", price: 27500 },
        { date: "2025.02", price: 27200 },
        { date: "2025.03", price: 27700 },
        { date: "2025.04", price: 28500 },
        { date: "2025.05", price: 29800 },
      ],
    },
    japan: {
      weekly: [
        { date: "04.30", price: 33500 },
        { date: "05.01", price: 33800 },
        { date: "05.02", price: 34000 },
        { date: "05.03", price: 34500 },
        { date: "05.04", price: 34200 },
        { date: "05.05", price: 35000 },
        { date: "05.06", price: 36200 },
      ],
      monthly: [
        { date: "04.06", price: 31700 },
        { date: "04.10", price: 32000 },
        { date: "04.15", price: 32700 },
        { date: "04.20", price: 32500 },
        { date: "04.25", price: 33000 },
        { date: "04.30", price: 33500 },
        { date: "05.01", price: 33800 },
        { date: "05.02", price: 34000 },
        { date: "05.03", price: 34500 },
        { date: "05.04", price: 34200 },
        { date: "05.05", price: 35000 },
        { date: "05.06", price: 36200 },
      ],
      yearly: [
        { date: "2024.06", price: 31500 },
        { date: "2024.07", price: 32000 },
        { date: "2024.08", price: 31700 },
        { date: "2024.09", price: 32000 },
        { date: "2024.10", price: 32700 },
        { date: "2024.11", price: 32500 },
        { date: "2024.12", price: 33000 },
        { date: "2025.01", price: 33800 },
        { date: "2025.02", price: 33500 },
        { date: "2025.03", price: 34200 },
        { date: "2025.04", price: 35000 },
        { date: "2025.05", price: 36200 },
      ],
    },
  }

  // 상세 시세 테이블 데이터
  const detailedPrices = {
    korea: [
      { date: "2025.05.06", type: "재래김", spec: "19x21", price: "34,500", origin: "완도", grade: 5 },
      { date: "2025.05.06", type: "파래김", spec: "19x21", price: "32,800", origin: "고흥", grade: 4 },
      { date: "2025.05.06", type: "김밥김", spec: "19x27", price: "36,200", origin: "완도", grade: 5 },
      { date: "2025.05.05", type: "재래김", spec: "19x21", price: "33,000", origin: "완도", grade: 5 },
      { date: "2025.05.05", type: "파래김", spec: "19x21", price: "31,500", origin: "고흥", grade: 4 },
      { date: "2025.05.05", type: "김밥김", spec: "19x27", price: "34,800", origin: "완도", grade: 5 },
    ],
    china: [
      { date: "2025.05.06", type: "재래김", spec: "19x21", price: "29,800", origin: "칭다오", grade: 4 },
      { date: "2025.05.06", type: "파래김", spec: "19x21", price: "28,500", origin: "칭다오", grade: 3 },
      { date: "2025.05.06", type: "김밥김", spec: "19x27", price: "31,200", origin: "칭다오", grade: 4 },
      { date: "2025.05.05", type: "재래김", spec: "19x21", price: "28,500", origin: "칭다오", grade: 4 },
      { date: "2025.05.05", type: "파래김", spec: "19x21", price: "27,200", origin: "칭다오", grade: 3 },
      { date: "2025.05.05", type: "김밥김", spec: "19x27", price: "30,000", origin: "칭다오", grade: 4 },
    ],
    japan: [
      { date: "2025.05.06", type: "재래김", spec: "19x21", price: "36,200", origin: "규슈", grade: 5 },
      { date: "2025.05.06", type: "파래김", spec: "19x21", price: "34,500", origin: "규슈", grade: 4 },
      { date: "2025.05.06", type: "김밥김", spec: "19x27", price: "38,000", origin: "규슈", grade: 5 },
      { date: "2025.05.05", type: "재래김", spec: "19x21", price: "35,000", origin: "규슈", grade: 5 },
      { date: "2025.05.05", type: "파래김", spec: "19x21", price: "33,200", origin: "규슈", grade: 4 },
      { date: "2025.05.05", type: "김밥김", spec: "19x27", price: "36,800", origin: "규슈", grade: 5 },
    ],
  }

  // 별점 렌더링 함수
  const renderStars = (grade: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < grade ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))
  }

  // 차트 데이터 포맷 함수
  const getChartData = (country: string, period: string) => {
    return chartData[country as keyof typeof chartData][period as keyof typeof chartData.korea]
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#F95700]">김 국제거래소 B2B</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
              제품 보기
            </Link>
            <Link href="/market-price" className="text-sm font-medium text-[#F95700]">
              시세 정보
            </Link>
            <Link href="/notice" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
              공지사항
            </Link>
            <Link href="/my/reservations" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
              예약 내역
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm">
                <option value="ko">한국어</option>
                <option value="en" disabled>
                  English
                </option>
                <option value="zh" disabled>
                  中文
                </option>
              </select>
            </div>
            <Link href="/signup">
              <Button size="sm">회원가입</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-[#F95700]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">김 시세 정보</h1>

        <Tabs defaultValue="korea" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="korea">🇰🇷 한국</TabsTrigger>
            <TabsTrigger value="china">🇨🇳 중국</TabsTrigger>
            <TabsTrigger value="japan">🇯🇵 일본</TabsTrigger>
          </TabsList>

          {Object.entries(marketPrices).map(([country, prices]) => (
            <TabsContent key={country} value={country} className="space-y-8">
              {/* Current Price Card */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-white pb-2">
                  <CardTitle className="text-xl">최신 시세 ({prices[0].date})</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="rounded-md bg-gray-100 p-6 text-center">
                    <p className="text-sm text-gray-500">회원가입 시 시세 정보를 확인하실 수 있습니다.</p>
                    <div className="mt-4 flex justify-center">
                      <Link href="/signup">
                        <Button>회원가입하기</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Chart */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>시세 추이</CardTitle>
                  <Tabs defaultValue="weekly" className="w-auto" onValueChange={setPeriodTab}>
                    <TabsList>
                      <TabsTrigger value="weekly">1주</TabsTrigger>
                      <TabsTrigger value="monthly">1개월</TabsTrigger>
                      <TabsTrigger value="yearly">1년</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getChartData(country, periodTab)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value.toLocaleString()}원`, "시세"]}
                          labelFormatter={(label) => `날짜: ${label}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#F95700" activeDot={{ r: 8 }} name="시세 (원)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>기준일: {prices[0].date} | 데이터 제공: 김 국제거래소 B2B</p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Price Table */}
              <Card>
                <CardHeader>
                  <CardTitle>상세 시세 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                          <th className="px-4 py-3 font-semibold">날짜</th>
                          <th className="px-4 py-3 font-semibold">김 종류</th>
                          <th className="px-4 py-3 font-semibold">규격</th>
                          <th className="px-4 py-3 font-semibold">단가</th>
                          <th className="px-4 py-3 font-semibold">산지</th>
                          <th className="px-4 py-3 font-semibold">품질 등급</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedPrices[country as keyof typeof detailedPrices].map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                            <td className="px-4 py-4 text-gray-700">{item.type}</td>
                            <td className="px-4 py-4 text-gray-700">{item.spec}</td>
                            <td className="px-4 py-4 font-medium text-gray-900">{item.price}원</td>
                            <td className="px-4 py-4 text-gray-700">{item.origin}</td>
                            <td className="px-4 py-4 text-gray-700">{renderStars(item.grade)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Price History Table */}
              <Card>
                <CardHeader>
                  <CardTitle>시세 히스토리</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                          <th className="px-4 py-3 font-semibold">날짜</th>
                          <th className="px-4 py-3 font-semibold">시세</th>
                          <th className="px-4 py-3 font-semibold">변동</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prices.map((price, index) => (
                          <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{price.date}</td>
                            <td className="px-4 py-4 font-medium text-gray-900">{price.price}원</td>
                            <td className={`px-4 py-4 ${price.isUp ? "text-red-500" : "text-blue-500"}`}>
                              {price.isUp ? "▲" : "▼"} {price.change}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Signup CTA */}
              <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">더 많은 시세 정보가 필요하신가요?</h3>
                    <p className="text-gray-700">
                      회원가입하시면 상세 시세 정보와 차트, CSV 다운로드 기능을 이용하실 수 있습니다.
                    </p>
                  </div>
                  <Link href="/signup">
                    <Button size="lg" className="whitespace-nowrap">
                      회원가입하기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">김 국제거래소 B2B</h3>
              <p className="mb-4 text-sm">전 세계 바이어를 위한 김 B2B 거래 플랫폼</p>
              <p className="text-sm">© 2025 김 국제거래소 B2B. All rights reserved.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">연락처</h3>
              <p className="mb-2 text-sm">서울특별시 강남구 테헤란로 123</p>
              <p className="mb-2 text-sm">이메일: info@seaweed-exchange.com</p>
              <p className="text-sm">전화: 02-123-4567</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">링크</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
