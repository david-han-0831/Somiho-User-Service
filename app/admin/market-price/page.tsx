"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, Calendar, BarChart2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PriceChart } from "@/components/price-chart"
import { ConfirmModal } from "@/components/confirm-modal"

// 더 많은 예시 데이터 생성
const generateMoreData = (baseData: any[], country: string) => {
  const result = [...baseData]

  // 기존 데이터의 날짜를 기준으로 이전 날짜의 데이터 생성
  const lastDate = new Date(baseData[0].date)

  // 국가별 시세 변동 패턴 설정
  let priceVariation = 500
  let basePrice = Number.parseInt(baseData[0].price.replace(/,/g, ""))

  if (country === "china") {
    priceVariation = 400
    basePrice = 26000
  } else if (country === "japan") {
    priceVariation = 600
    basePrice = 33000
  }

  // 추가 25일치 데이터 생성 (총 30일)
  for (let i = 1; i <= 25; i++) {
    const newDate = new Date(lastDate)
    newDate.setDate(lastDate.getDate() - i)

    // 랜덤 가격 변동 (-priceVariation ~ +priceVariation)
    const randomChange = Math.floor(Math.random() * priceVariation * 2) - priceVariation
    const newPrice = basePrice + randomChange
    basePrice = newPrice // 다음 변동의 기준이 됨

    const dateString = newDate.toISOString().split("T")[0]
    const memos = ["강보합세", "약보합세", "보합세", "약상승세", "약하락세"]
    const randomMemo = memos[Math.floor(Math.random() * memos.length)]

    result.push({
      id: baseData.length + i,
      date: dateString,
      price: newPrice.toLocaleString(),
      memo: randomMemo,
      author: Math.random() > 0.5 ? "admin1" : "admin2",
      createdAt: dateString,
    })
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function MarketPricePage() {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("korea")
  const [chartPeriod, setChartPeriod] = useState<"weekly" | "monthly" | "yearly">("weekly")
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "add" | "delete" | "edit",
  })
  const [selectedPrice, setSelectedPrice] = useState<any>(null)

  // 기본 Mock 데이터
  const basePriceData = {
    korea: [
      { id: 1, date: "2025-03-26", price: "33,000", memo: "강보합세", author: "admin1", createdAt: "2025-03-26" },
      { id: 2, date: "2025-03-25", price: "32,500", memo: "보합세", author: "admin1", createdAt: "2025-03-25" },
      { id: 3, date: "2025-03-24", price: "32,000", memo: "약보합세", author: "admin2", createdAt: "2025-03-24" },
      { id: 4, date: "2025-03-23", price: "31,800", memo: "보합세", author: "admin1", createdAt: "2025-03-23" },
      { id: 5, date: "2025-03-22", price: "31,500", memo: "약보합세", author: "admin2", createdAt: "2025-03-22" },
    ],
    china: [
      { id: 1, date: "2025-03-26", price: "28,000", memo: "약보합세", author: "admin1", createdAt: "2025-03-26" },
      { id: 2, date: "2025-03-25", price: "27,800", memo: "보합세", author: "admin2", createdAt: "2025-03-25" },
      { id: 3, date: "2025-03-24", price: "27,500", memo: "약보합세", author: "admin1", createdAt: "2025-03-24" },
      { id: 4, date: "2025-03-23", price: "27,200", memo: "약상승세", author: "admin2", createdAt: "2025-03-23" },
      { id: 5, date: "2025-03-22", price: "26,800", memo: "보합세", author: "admin1", createdAt: "2025-03-22" },
    ],
    japan: [
      { id: 1, date: "2025-03-26", price: "35,000", memo: "강보합세", author: "admin2", createdAt: "2025-03-26" },
      { id: 2, date: "2025-03-25", price: "34,500", memo: "약상승세", author: "admin1", createdAt: "2025-03-25" },
      { id: 3, date: "2025-03-24", price: "34,000", memo: "보합세", author: "admin2", createdAt: "2025-03-24" },
      { id: 4, date: "2025-03-23", price: "33,800", memo: "약보합세", author: "admin1", createdAt: "2025-03-23" },
      { id: 5, date: "2025-03-22", price: "33,500", memo: "보합세", author: "admin2", createdAt: "2025-03-22" },
    ],
  }

  // 확장된 데이터 생성
  const priceData = {
    korea: generateMoreData(basePriceData.korea, "korea"),
    china: generateMoreData(basePriceData.china, "china"),
    japan: generateMoreData(basePriceData.japan, "japan"),
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleAddPrice = () => {
    setOpenAddDialog(false)
    setConfirmModal({
      open: true,
      title: "시세가 등록되었습니다",
      type: "success",
      action: "",
    })
  }

  const handleDeletePrice = (price: any) => {
    setSelectedPrice(price)
    setConfirmModal({
      open: true,
      title: `${price.date} 시세를 삭제하시겠습니까?`,
      type: "error",
      action: "delete",
    })
  }

  const handleConfirmAction = () => {
    // 실제 API 호출 로직이 여기에 들어갑니다
    if (confirmModal.action === "delete") {
      // 삭제 처리 로직
      console.log(`${selectedPrice.date} 시세 삭제 처리됨`)
    }
  }

  // 국가별 타이틀 및 설명 텍스트
  const getCountryInfo = () => {
    switch (activeTab) {
      case "korea":
        return {
          title: "한국 김 시세 현황",
          description: "국내 주요 수협 경매 시세 기준",
          color: "#F95700",
        }
      case "china":
        return {
          title: "중국 김 시세 현황",
          description: "중국 주요 수산물 시장 기준",
          color: "#DC2626",
        }
      case "japan":
        return {
          title: "일본 김 시세 현황",
          description: "일본 도쿄 수산시장 기준",
          color: "#2563EB",
        }
      default:
        return {
          title: "김 시세 현황",
          description: "최신 시세 정보",
          color: "#F95700",
        }
    }
  }

  const countryInfo = getCountryInfo()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">시세 관리</h1>
        <Button className="gap-2" onClick={() => setOpenAddDialog(true)}>
          <Plus className="h-4 w-4" />
          시세 추가
        </Button>
      </div>

      <Tabs defaultValue="korea" onValueChange={handleTabChange} className="space-y-6">
        <div className="border-b border-gray-200">
          <TabsList className="w-full max-w-md grid grid-cols-3 bg-[#F9FAFB] rounded-t-lg h-12">
            <TabsTrigger
              value="korea"
              className="h-full flex items-center justify-center data-[state=active]:text-[#F95700] data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              한국
            </TabsTrigger>
            <TabsTrigger
              value="china"
              className="h-full flex items-center justify-center data-[state=active]:text-[#DC2626] data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              중국
            </TabsTrigger>
            <TabsTrigger
              value="japan"
              className="h-full flex items-center justify-center data-[state=active]:text-[#2563EB] data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              일본
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Chart */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-bold" style={{ color: countryInfo.color }}>
                  {countryInfo.title}
                </CardTitle>
                <CardDescription className="mt-1">{countryInfo.description}</CardDescription>
              </div>
              <div className="mt-4 flex items-center gap-2 sm:mt-0">
                <div className="bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={chartPeriod === "weekly" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartPeriod("weekly")}
                    className="gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    주간
                  </Button>
                  <Button
                    variant={chartPeriod === "monthly" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartPeriod("monthly")}
                    className="gap-1"
                  >
                    <BarChart2 className="h-4 w-4" />
                    월간
                  </Button>
                  <Button
                    variant={chartPeriod === "yearly" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartPeriod("yearly")}
                    className="gap-1"
                  >
                    <TrendingUp className="h-4 w-4" />
                    연간
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <PriceChart
                country={activeTab as "korea" | "china" | "japan"}
                data={priceData[activeTab as keyof typeof priceData]}
                period={chartPeriod}
              />
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>시세 데이터</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="날짜 검색" className="pl-9" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                    <th className="px-4 py-3 font-semibold">날짜</th>
                    <th className="px-4 py-3 font-semibold">시세</th>
                    <th className="px-4 py-3 font-semibold">메모</th>
                    <th className="px-4 py-3 font-semibold">등록자</th>
                    <th className="px-4 py-3 font-semibold">등록일</th>
                    <th className="px-4 py-3 font-semibold">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData[activeTab as keyof typeof priceData].slice(0, 10).map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-900">{item.date}</td>
                      <td className="px-4 py-4 font-medium text-gray-900">{item.price}원</td>
                      <td className="px-4 py-4 text-gray-600">{item.memo}</td>
                      <td className="px-4 py-4 text-gray-600">{item.author}</td>
                      <td className="px-4 py-4 text-gray-600">{item.createdAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeletePrice(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>

      {/* Add Price Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>시세 추가</DialogTitle>
            <DialogDescription>
              {activeTab === "korea" && "한국"}
              {activeTab === "china" && "중국"}
              {activeTab === "japan" && "일본"}
              시세 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">날짜</Label>
              <Input id="date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">시세 (원)</Label>
              <Input id="price" type="text" placeholder="예: 33,000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="memo">메모 (선택)</Label>
              <Textarea id="memo" placeholder="시세 관련 메모를 입력하세요." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              취소
            </Button>
            <Button onClick={handleAddPrice}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        type={confirmModal.type}
        onConfirm={handleConfirmAction}
        confirmText="확인"
        cancelText={confirmModal.action ? "취소" : undefined}
        onCancel={confirmModal.action ? () => {} : undefined}
      />
    </div>
  )
}
