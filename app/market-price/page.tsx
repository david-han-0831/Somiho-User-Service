"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface LaverPrice {
  date: string
  type: string
  price: string
  change: string
  isUp: boolean
}

interface ChartDataPoint {
  date: string
  price: number
}

interface DetailedLaverPrice {
  date: string
  type: string
  spec: string
  price: string
  origin: string
  grade: number
}

interface ChineseMarketInfo {
  시장명: string
  출품기업수: string
  입찰기업수: string
  출품카톤수: string
  출품매수: string
  거래카톤수: string
  거래매수: string
  거래금액: string
  낙찰율: string
  평균단가: string
  최저가: string
  최고가: string
}

interface WetLaverPrice {
  date: string
  type: string
  spec: string
  price: string
  grade: number
}

interface DryLaverPrice {
  date: string
  type: string
  unit: string
  price: string
  grade: number
}

interface ChineseDetailedPrice {
  date: string
  type: string
  spec: string
  price: string
  origin: string
  grade: number
  special: ChineseMarketInfo
}

interface KoreaMarketPrices {
  wetLaver: LaverPrice[]
  dryLaver: LaverPrice[]
}

interface ChartDataByPeriod {
  weekly: ChartDataPoint[]
  monthly: ChartDataPoint[]
  yearly: ChartDataPoint[]
}

interface KoreaChartData {
  wetLaver: ChartDataByPeriod
  dryLaver: ChartDataByPeriod
}

interface KoreaDetailedPrices {
  wetLaver: WetLaverPrice[]
  dryLaver: DryLaverPrice[]
}

interface ChineseDetailedPrices {
  wetLaver: WetLaverPrice[]
  dryLaver: ChineseDetailedPrice[]
}

interface ChineseMarketPrices {
  wetLaver: WetLaverPrice[]
  dryLaver: LaverPrice[]
}

interface ChineseChartData {
  wetLaver: {
    weekly: ChartDataPoint[]
    monthly: ChartDataPoint[]
    yearly: ChartDataPoint[]
  }
  dryLaver: {
    weekly: ChartDataPoint[]
    monthly: ChartDataPoint[]
    yearly: ChartDataPoint[]
  }
}

interface MarketPrices {
  korea: KoreaMarketPrices
  china: ChineseMarketPrices
}

interface ChartData {
  korea: KoreaChartData
  china: ChineseChartData
}

interface DetailedPrices {
  korea: KoreaDetailedPrices
  china: ChineseDetailedPrices
}

type TabValue = "korea" | "china"
type PeriodValue = "weekly" | "monthly" | "yearly"

export default function MarketPricePage() {
  const [periodTab, setPeriodTab] = useState<PeriodValue>("weekly")
  const [countryTab, setCountryTab] = useState<TabValue>("korea")

  // 오늘 날짜 기준 더미 데이터 (2025.05.06)
  const marketPrices: MarketPrices = {
    korea: {
      wetLaver: [  // 물김
        { date: "2025.05.06", type: "기타물김", price: "2,500", change: "+100", isUp: true },
        { date: "2025.05.05", type: "기타물김", price: "2,400", change: "+200", isUp: true },
        { date: "2025.05.04", type: "기타물김", price: "2,200", change: "-100", isUp: false },
        { date: "2025.05.03", type: "기타물김", price: "2,300", change: "+100", isUp: true },
        { date: "2025.05.02", type: "기타물김", price: "2,200", change: "+200", isUp: true },
        { date: "2025.05.01", type: "기타물김", price: "2,000", change: "-100", isUp: false },
        { date: "2025.04.30", type: "기타물김", price: "2,100", change: "+100", isUp: true },
      ],
      dryLaver: [  // 마른김
        { date: "2025.05.06", type: "재래김", price: "34,500", change: "+1,500", isUp: true },
        { date: "2025.05.05", type: "재래김", price: "33,000", change: "+1,000", isUp: true },
        { date: "2025.05.04", type: "재래김", price: "32,000", change: "+500", isUp: true },
        { date: "2025.05.03", type: "재래김", price: "31,500", change: "-500", isUp: false },
        { date: "2025.05.02", type: "재래김", price: "32,000", change: "+1,000", isUp: true },
        { date: "2025.05.01", type: "재래김", price: "31,000", change: "+500", isUp: true },
        { date: "2025.04.30", type: "재래김", price: "30,500", change: "-300", isUp: false },
      ]
    },
    china: {
      wetLaver: [
        { date: "2025-01-19", type: "방사무늬김", spec: "1kg", price: "7.8", grade: 5 },
        { date: "2025-01-18", type: "방사무늬김", spec: "1kg", price: "7.2", grade: 4 },
        { date: "2025-01-06", type: "방사무늬김", spec: "1kg", price: "7.5", grade: 5 },
        { date: "2025-01-05", type: "방사무늬김", spec: "1kg", price: "7.1", grade: 4 },
      ],
      dryLaver: [
        { date: "2025-01-19", type: "마른김", price: "54.21속 (38.70~67.90)", change: "+0.36", isUp: true },
        { date: "2025-01-18", type: "마른김", price: "53.85속 (36.50~63.90)", change: "-0.16", isUp: false },
        { date: "2025-01-06", type: "마른김", price: "54.01속 (36.30~67.90)", change: "-1.96", isUp: false },
        { date: "2025-01-05", type: "마른김", price: "55.97속 (40.10~63.70)", change: "+2.97", isUp: true },
      ]
    }
  }

  // 차트 데이터 (주간/월간/연간)
  const chartData: ChartData = {
    korea: {
      wetLaver: {  // 물김
        weekly: [
          { date: "05.03", price: 2500 },  // 2025.05.03 기준
          { date: "05.04", price: 2700 },
          { date: "05.05", price: 2300 },
          { date: "05.06", price: 2500 },
        ],
        monthly: [
          { date: "04.15", price: 2300 },
          { date: "04.20", price: 2400 },
          { date: "04.25", price: 2500 },
          { date: "05.03", price: 2500 },
          { date: "05.04", price: 2700 },
          { date: "05.05", price: 2300 },
          { date: "05.06", price: 2500 },
        ],
        yearly: [
          { date: "2024.11", price: 2200 },
          { date: "2024.12", price: 2300 },
          { date: "2025.01", price: 2400 },
          { date: "2025.02", price: 2500 },
          { date: "2025.03", price: 2600 },
          { date: "2025.04", price: 2700 },
          { date: "2025.05", price: 2500 },
        ],
      },
      dryLaver: {  // 마른김 (재래김 기준)
        weekly: [
          { date: "05.03", price: 7600 },
          { date: "05.04", price: 7800 },
          { date: "05.05", price: 7600 },
          { date: "05.06", price: 8200 },
        ],
        monthly: [
          { date: "04.15", price: 7200 },
          { date: "04.20", price: 7400 },
          { date: "04.25", price: 7500 },
          { date: "05.03", price: 7600 },
          { date: "05.04", price: 7800 },
          { date: "05.05", price: 7600 },
          { date: "05.06", price: 8200 },
        ],
        yearly: [
          { date: "2024.11", price: 7000 },
          { date: "2024.12", price: 7200 },
          { date: "2025.01", price: 7400 },
          { date: "2025.02", price: 7500 },
          { date: "2025.03", price: 7600 },
          { date: "2025.04", price: 7800 },
          { date: "2025.05", price: 8200 },
        ],
      }
    },
    china: {
      wetLaver: {
        weekly: [
          { date: "2025-01-05", price: 7.1 },
          { date: "2025-01-06", price: 7.5 },
          { date: "2025-01-18", price: 7.2 },
          { date: "2025-01-19", price: 7.8 },
        ],
        monthly: [
          { date: "2025-01-05", price: 7.1 },
          { date: "2025-01-06", price: 7.5 },
          { date: "2025-01-18", price: 7.2 },
          { date: "2025-01-19", price: 7.8 },
        ],
        yearly: [
          { date: "2025-01-05", price: 7.1 },
          { date: "2025-01-06", price: 7.5 },
          { date: "2025-01-18", price: 7.2 },
          { date: "2025-01-19", price: 7.8 },
        ],
      },
      dryLaver: {
        weekly: [
          { date: "2025-01-05", price: 55.97 },
          { date: "2025-01-06", price: 54.01 },
          { date: "2025-01-18", price: 53.85 },
          { date: "2025-01-19", price: 54.21 },
        ],
        monthly: [
          { date: "2025-01-05", price: 55.97 },
          { date: "2025-01-06", price: 54.01 },
          { date: "2025-01-18", price: 53.85 },
          { date: "2025-01-19", price: 54.21 },
        ],
        yearly: [
          { date: "2025-01-05", price: 55.97 },
          { date: "2025-01-06", price: 54.01 },
          { date: "2025-01-18", price: 53.85 },
          { date: "2025-01-19", price: 54.21 },
        ],
      }
    }
  }

  // 상세 시세 테이블 데이터
  const detailedPrices: DetailedPrices = {
    korea: {
      wetLaver: [
        { date: "2025.05.06", type: "기타물김", spec: "1kg", price: "2,500", grade: 5 },
        { date: "2025.05.06", type: "기타물김", spec: "1kg", price: "2,300", grade: 4 },
        { date: "2025.05.05", type: "기타물김", spec: "1kg", price: "2,400", grade: 5 },
        { date: "2025.05.05", type: "기타물김", spec: "1kg", price: "2,200", grade: 4 },
      ],
      dryLaver: [
        { date: "2025.05.06", type: "재래김", unit: "250g/속/100장", price: "8,200", grade: 5 },
        { date: "2025.05.06", type: "파래김", unit: "250g/속/100장", price: "8,300", grade: 4 },
        { date: "2025.05.06", type: "김밥김", unit: "250g/속/100장", price: "9,800", grade: 5 },
        { date: "2025.05.05", type: "재래김", unit: "250g/속/100장", price: "7,600", grade: 5 },
        { date: "2025.05.05", type: "파래김", unit: "250g/속/100장", price: "8,500", grade: 4 },
        { date: "2025.05.05", type: "김밥김", unit: "250g/속/100장", price: "8,500", grade: 5 },
      ]
    },
    china: {
      wetLaver: [
        { date: "2025-01-19", type: "방사무늬김", spec: "1kg", price: "7.8", grade: 5 },
        { date: "2025-01-18", type: "방사무늬김", spec: "1kg", price: "7.2", grade: 4 },
        { date: "2025-01-06", type: "방사무늬김", spec: "1kg", price: "7.5", grade: 5 },
        { date: "2025-01-05", type: "방사무늬김", spec: "1kg", price: "7.1", grade: 4 },
      ],
      dryLaver: [
        { 
          date: "2025-01-19",
          type: "마른김",
          spec: "300g/속/100장",
          price: "",
          origin: "",
          grade: 0,
          special: {
            시장명: "롄윈강간위",
            출품기업수: "84",
            입찰기업수: "82",
            출품카톤수: "72,856",
            출품매수: "345,046,200",
            거래카톤수: "49,954",
            거래매수: "235,164,600",
            거래금액: "12,747.27",
            낙찰율: "68.15%",
            평균단가: "54.21속",
            최저가: "38.70속",
            최고가: "67.90속"
          }
        },
        { 
          date: "2025-01-18",
          type: "마른김",
          spec: "300g/속/100장",
          price: "",
          origin: "",
          grade: 0,
          special: {
            시장명: "례윈강샹신",
            출품기업수: "77",
            입찰기업수: "77",
            출품카톤수: "45,301",
            출품매수: "217,438,800",
            거래카톤수: "36,068",
            거래매수: "173,120,400",
            거래금액: "9,323.29",
            낙찰율: "79.62%",
            평균단가: "53.85속",
            최저가: "36.50속",
            최고가: "63.90속"
          }
        },
        { 
          date: "2025-01-06",
          type: "마른김",
          spec: "300g/속/100장",
          price: "",
          origin: "",
          grade: 0,
          special: {
            시장명: "롄윈강간위",
            출품기업수: "74",
            입찰기업수: "72",
            출품카톤수: "66,571",
            출품매수: "315,165,000",
            거래카톤수: "47,690",
            거래매수: "224,563,200",
            거래금액: "12,129.43",
            낙찰율: "71.25%",
            평균단가: "54.01속",
            최저가: "36.30속",
            최고가: "67.90속"
          }
        },
        { 
          date: "2025-01-05",
          type: "마른김",
          spec: "300g/속/100장",
          price: "",
          origin: "",
          grade: 0,
          special: {
            시장명: "례윈강샹신",
            출품기업수: "68",
            입찰기업수: "67",
            출품카톤수: "38,518",
            출품매수: "184,799,400",
            거래카톤수: "30,184",
            거래매수: "144,810,600",
            거래금액: "8,105.10",
            낙찰율: "78.36%",
            평균단가: "55.97속",
            최저가: "40.10속",
            최고가: "63.70속"
          }
        }
      ]
    }
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
  const getChartData = (country: "korea" | "china", type: "wetLaver" | "dryLaver", period: PeriodValue) => {
    return chartData[country][type][period]
  }

  // 중국 마른김 테이블 렌더링
  const renderChineseDryLaverTable = () => {
    if (!detailedPrices?.china?.dryLaver) {
      return null;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>마른김 상세 시세 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 font-semibold">날짜</th>
                  <th className="px-4 py-3 font-semibold">경매장</th>
                  <th className="px-4 py-3 font-semibold">단위</th>
                  <th className="px-4 py-3 font-semibold">출품정보</th>
                  <th className="px-4 py-3 font-semibold">낙찰정보</th>
                  <th className="px-4 py-3 font-semibold">
                    총낙찰금액
                    <br />
                    <span className="text-xs">(단위: 만위안)</span>
                  </th>
                  <th className="px-4 py-3 font-semibold">낙찰율</th>
                  <th className="px-4 py-3 font-semibold">위안/속</th>
                </tr>
              </thead>
              <tbody>
                {detailedPrices.china.dryLaver.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.special.시장명}</td>
                    <td className="px-4 py-4 text-gray-700">{item.spec}</td>
                    <td className="px-4 py-4 text-gray-700">
                      <div>기업수: {item.special.출품기업수}</div>
                      <div>카톤수: {item.special.출품카톤수}</div>
                      <div>매수: {item.special.출품매수}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      <div>기업수: {item.special.입찰기업수}</div>
                      <div>카톤수: {item.special.거래카톤수}</div>
                      <div>매수: {item.special.거래매수}</div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.special.거래금액}</td>
                    <td className="px-4 py-4 text-gray-700">{item.special.낙찰율}</td>
                    <td className="px-4 py-4 text-gray-700">
                      <div>평균: {item.special.평균단가}</div>
                      <div>최저: {item.special.최저가}</div>
                      <div>최고: {item.special.최고가}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-sm text-gray-500 mt-4 px-4">
              출처: 강소성 김 협회
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 중국 탭 렌더링
  const renderChineseTab = () => {
    return (
      <>
        {/* Current Price Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-white pb-2">
            <CardTitle className="text-xl">
              최신 시세 ({marketPrices.china.dryLaver[0].date})
            </CardTitle>
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

        {/* 통합 그래프 */}
        <div className="space-y-8 mt-16">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>김 시세 추이</CardTitle>
              <Tabs defaultValue="weekly" className="w-auto" onValueChange={(value) => setPeriodTab(value as PeriodValue)}>
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
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" allowDuplicatedCategory={false} />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value.toLocaleString()}위안`, "시세"]}
                      labelFormatter={(label) => `날짜: ${label}`}
                    />
                    <Legend />
                    <Line 
                      data={chartData.china.wetLaver[periodTab]} 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#F95700" 
                      name="물김 시세 (위안)" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      data={chartData.china.dryLaver[periodTab]} 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#2563EB" 
                      name="마른김 시세 (위안)" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 물김 상세 시세 정보 */}
        <div className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold">물김 상세 시세 정보</h2>
          <Card>
            <CardHeader>
              <CardTitle>물김 상세 시세 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                      <th className="px-4 py-3 font-semibold">날짜</th>
                      <th className="px-4 py-3 font-semibold">김 종류</th>
                      <th className="px-4 py-3 font-semibold">단위</th>
                      <th className="px-4 py-3 font-semibold">
                        단가
                        <br />
                        <span className="text-xs">(단위: 위안)</span>
                      </th>
                      <th className="px-4 py-3 font-semibold">품질 등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedPrices.china.wetLaver.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                        <td className="px-4 py-4 text-gray-700">{item.type}</td>
                        <td className="px-4 py-4 text-gray-700">{item.spec}</td>
                        <td className="px-4 py-4 font-medium text-gray-900">{item.price}</td>
                        <td className="px-4 py-4 text-gray-700">{renderStars(item.grade)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-sm text-gray-500 mt-4 px-4">
                  출처: 중국 김 어업인협회
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 마른김 상세 시세 정보 */}
        <div className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold">마른김 상세 시세 정보</h2>
          {renderChineseDryLaverTable()}
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-[#F95700]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">김 시세 정보</h1>

        <Tabs 
          defaultValue="korea" 
          className="mb-8"
          onValueChange={(value) => setCountryTab(value as TabValue)}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger 
              value="korea" 
              className={countryTab === "korea" ? "!bg-[#F95700] !text-white hover:!text-white" : ""}
              style={countryTab === "korea" ? { backgroundColor: "#F95700", color: "white" } : {}}
            >
              <div className="flex items-center gap-2">
                <img src="https://flagcdn.com/kr.svg" alt="한국어" width={24} height={16} className="h-4 w-6 object-cover" />
                한국
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="china" 
              className={countryTab === "china" ? "!bg-[#F95700] !text-white hover:!text-white" : ""}
              style={countryTab === "china" ? { backgroundColor: "#F95700", color: "white" } : {}}
            >
              <div className="flex items-center gap-2">
                <img src="https://flagcdn.com/cn.svg" alt="중국어" width={24} height={16} className="h-4 w-6 object-cover" />
                중국
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="korea">
            {/* Current Price Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-white pb-2">
                <CardTitle className="text-xl">
                  최신 시세 ({marketPrices.korea.dryLaver[0].date})
                </CardTitle>
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

            {/* 통합 그래프 */}
            <div className="space-y-8 mt-16">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>김 시세 추이</CardTitle>
                  <Tabs defaultValue="weekly" className="w-auto" onValueChange={(value) => setPeriodTab(value as PeriodValue)}>
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
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" allowDuplicatedCategory={false} />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value.toLocaleString()}원`, "시세"]}
                          labelFormatter={(label) => `날짜: ${label}`}
                        />
                        <Legend />
                        <Line 
                          data={getChartData("korea", "wetLaver", periodTab)} 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#F95700" 
                          name="물김 시세 (원)" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          data={getChartData("korea", "dryLaver", periodTab)} 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#2563EB" 
                          name="마른김 시세 (원)" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 물김 상세 시세 정보 */}
            <div className="space-y-8 mt-16">
              <h2 className="text-2xl font-bold">물김 상세 시세 정보</h2>
              <Card>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                          <th className="px-4 py-3 font-semibold">날짜</th>
                          <th className="px-4 py-3 font-semibold">김 종류</th>
                          <th className="px-4 py-3 font-semibold">단위</th>
                          <th className="px-4 py-3 font-semibold">단가</th>
                          <th className="px-4 py-3 font-semibold">품질 등급</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedPrices.korea.wetLaver.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                            <td className="px-4 py-4 text-gray-700">{item.type}</td>
                            <td className="px-4 py-4 text-gray-700">{item.spec}</td>
                            <td className="px-4 py-4 font-medium text-gray-900">{item.price}원</td>
                            <td className="px-4 py-4 text-gray-700">{renderStars(item.grade)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-sm text-gray-500 mt-4 px-4">
                      출처: 수협중앙회
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 마른김 상세 시세 정보 */}
            <div className="space-y-8 mt-16">
              <h2 className="text-2xl font-bold">마른김 상세 시세 정보</h2>
              <Card>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                          <th className="px-4 py-3 font-semibold">날짜</th>
                          <th className="px-4 py-3 font-semibold">김 종류</th>
                          <th className="px-4 py-3 font-semibold">단위</th>
                          <th className="px-4 py-3 font-semibold">단가</th>
                          <th className="px-4 py-3 font-semibold">품질 등급</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedPrices.korea.dryLaver.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                            <td className="px-4 py-4 text-gray-700">{item.type}</td>
                            <td className="px-4 py-4 text-gray-700">{item.unit}</td>
                            <td className="px-4 py-4 font-medium text-gray-900">{item.price}원</td>
                            <td className="px-4 py-4 text-gray-700">{renderStars(item.grade)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-sm text-gray-500 mt-4 px-4">
                      출처: 한국해양수산개발원
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="china">
            {renderChineseTab()}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
