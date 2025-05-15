"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Search,
  Calendar,
  Package,
  DollarSign,
  Clock,
  MapPin,
  Truck,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
// 예약 데이터 타입 정의
type ReservationStatus = "진행중" | "확정완료" | "취소됨"
type TradeType = "정가거래" | "입찰거래"

interface Reservation {
  id: string
  productName: string
  tradeType: TradeType
  reservationDate: string
  quantity: string
  status: ReservationStatus
  price: string
  canCancel: boolean
  seller: string
  location: string
  deliveryDate: string
  paymentMethod: string
  productDetail: string
}

// 더미 데이터 생성 - 더 많은 데이터 추가
const dummyReservations: Reservation[] = [
  {
    id: "1",
    productName: "서천 재래김 280g 19x27",
    tradeType: "정가거래",
    reservationDate: "2025.05.06",
    quantity: "100박스",
    status: "진행중",
    price: "회원전용",
    canCancel: true,
    seller: "완도수산",
    location: "전라남도 완도군",
    deliveryDate: "2025.05.10",
    paymentMethod: "계좌이체",
    productDetail:
      "서천 지역에서 생산된 최고급 재래김으로, 바삭한 식감과 깊은 맛이 특징입니다. 유기농 인증을 받은 제품으로 안심하고 드실 수 있습니다.",
  },
  {
    id: "2",
    productName: "완도 돌김 300g 19x21",
    tradeType: "입찰거래",
    reservationDate: "2025.05.05",
    quantity: "50박스",
    status: "진행중",
    price: "15,000원",
    canCancel: true,
    seller: "신안김생산조합",
    location: "전라남도 신안군",
    deliveryDate: "2025.05.12",
    paymentMethod: "신용카드",
    productDetail: "완도 지역의 깨끗한 바다에서 자란 돌김입니다. 미네랄이 풍부하고 두껍고 쫄깃한 식감이 특징입니다.",
  },
  {
    id: "3",
    productName: "고흥 파래김 250g 19x27",
    tradeType: "정가거래",
    reservationDate: "2025.05.03",
    quantity: "200박스",
    status: "확정완료",
    price: "회원전용",
    canCancel: false,
    seller: "고흥수산",
    location: "전라남도 고흥군",
    deliveryDate: "2025.05.08",
    paymentMethod: "계좌이체",
    productDetail:
      "고흥 연안에서 채취한 싱싱한 파래김입니다. 파래김 특유의 향과 맛이 살아있어 김밥이나 초밥용으로 적합합니다.",
  },
  {
    id: "4",
    productName: "신안 재래김 특대 300g 19x27",
    tradeType: "입찰거래",
    reservationDate: "2025.05.01",
    quantity: "150박스",
    status: "확정완료",
    price: "16,500원",
    canCancel: false,
    seller: "신안연합",
    location: "전라남도 신안군",
    deliveryDate: "2025.05.05",
    paymentMethod: "계좌이체",
    productDetail:
      "신안 지역에서 생산된 특대 사이즈 재래김입니다. 두께가 균일하고 향이 풍부하여 구이용으로 인기가 많습니다.",
  },
  {
    id: "5",
    productName: "부산 돌김 프리미엄 320g 19x21",
    tradeType: "정가거래",
    reservationDate: "2025.04.28",
    quantity: "80박스",
    status: "취소됨",
    price: "회원전용",
    canCancel: false,
    seller: "부산어촌계",
    location: "부산광역시 기장군",
    deliveryDate: "-",
    paymentMethod: "신용카드",
    productDetail: "부산 기장 앞바다에서 채취한 프리미엄 돌김입니다. 두껍고 쫄깃한 식감과 진한 향이 특징입니다.",
  },
  {
    id: "6",
    productName: "완도 재래김 특선 280g 19x27",
    tradeType: "입찰거래",
    reservationDate: "2025.04.25",
    quantity: "120박스",
    status: "취소됨",
    price: "14,800원",
    canCancel: false,
    seller: "완도어촌계",
    location: "전라남도 완도군",
    deliveryDate: "-",
    paymentMethod: "계좌이체",
    productDetail: "완도 청정 해역에서 생산된 특선 재래김입니다. 바삭한 식감과 짭짤한 맛이 일품입니다.",
  },
  {
    id: "7",
    productName: "제주 돌김 250g 19x21",
    tradeType: "정가거래",
    reservationDate: "2025.04.22",
    quantity: "70박스",
    status: "확정완료",
    price: "회원전용",
    canCancel: false,
    seller: "제주해녀조합",
    location: "제주특별자치도",
    deliveryDate: "2025.04.29",
    paymentMethod: "계좌이체",
    productDetail: "제주 해녀들이 직접 채취한 프리미엄 돌김입니다. 깊은 바다의 미네랄이 풍부하게 함유되어 있습니다.",
  },
  {
    id: "8",
    productName: "보령 파래김 200g 19x21",
    tradeType: "입찰거래",
    reservationDate: "2025.04.20",
    quantity: "90박스",
    status: "확정완료",
    price: "13,200원",
    canCancel: false,
    seller: "보령수산",
    location: "충청남도 보령시",
    deliveryDate: "2025.04.25",
    paymentMethod: "신용카드",
    productDetail: "보령 연안에서 채취한 파래김입니다. 독특한 향과 맛이 일품이며 김밥용으로 적합합니다.",
  },
  {
    id: "9",
    productName: "서천 돌김 프리미엄 300g 19x27",
    tradeType: "정가거래",
    reservationDate: "2025.04.18",
    quantity: "60박스",
    status: "진행중",
    price: "회원전용",
    canCancel: true,
    seller: "서천어촌계",
    location: "충청남도 서천군",
    deliveryDate: "2025.05.15",
    paymentMethod: "계좌이체",
    productDetail: "서천 지역에서 채취한 프리미엄 돌김입니다. 두꺼운 식감과 진한 맛이 특징입니다.",
  },
  {
    id: "10",
    productName: "광양 재래김 특선 250g 19x21",
    tradeType: "입찰거래",
    reservationDate: "2025.04.15",
    quantity: "110박스",
    status: "진행중",
    price: "15,500원",
    canCancel: true,
    seller: "광양수산",
    location: "전라남도 광양시",
    deliveryDate: "2025.05.14",
    paymentMethod: "신용카드",
    productDetail: "광양 지역에서 생산된 특선 재래김입니다. 바삭한 식감과 고소한 맛이 특징입니다.",
  },
  {
    id: "11",
    productName: "완도 돌김 280g 19x27",
    tradeType: "정가거래",
    reservationDate: "2025.04.13",
    quantity: "85박스",
    status: "취소됨",
    price: "회원전용",
    canCancel: false,
    seller: "완도수산",
    location: "전라남도 완도군",
    deliveryDate: "-",
    paymentMethod: "계좌이체",
    productDetail: "완도 청정 해역에서 생산된 돌김입니다. 미네랄이 풍부하고 감칠맛이 뛰어납니다.",
  },
  {
    id: "12",
    productName: "하동 재래김 300g 19x21",
    tradeType: "입찰거래",
    reservationDate: "2025.04.10",
    quantity: "95박스",
    status: "취소됨",
    price: "14,200원",
    canCancel: false,
    seller: "하동어촌계",
    location: "경상남도 하동군",
    deliveryDate: "-",
    paymentMethod: "신용카드",
    productDetail: "하동 청정 지역에서 생산된 재래김입니다. 깔끔한 맛과 향이 특징입니다.",
  },
]

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [period, setPeriod] = useState("1month")
  const [tradeFilter, setTradeFilter] = useState("all")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // 페이지당 표시할 항목 수

  // 필터링된 예약 목록
  const filteredReservations = dummyReservations.filter((reservation) => {
    // 상태 필터
    if (activeTab === "progress" && reservation.status !== "진행중") return false
    if (activeTab === "completed" && reservation.status !== "확정완료") return false
    if (activeTab === "canceled" && reservation.status !== "취소됨") return false

    // 검색어 필터
    if (searchTerm && !reservation.productName.toLowerCase().includes(searchTerm.toLowerCase())) return false

    // 거래 방식 필터
    if (tradeFilter === "fixed" && reservation.tradeType !== "정가거래") return false
    if (tradeFilter === "auction" && reservation.tradeType !== "입찰거래") return false

    return true
  })

  // 페이지네이션 계산
  const totalItems = filteredReservations.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // 현재 페이지에 표시할 아이템
  const currentItems = filteredReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 이전/다음 페이지 함수
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // 페이지네이션 컴포넌트 생성
  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5 // 최대 표시할 페이지 번호 수

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "bg-gray-800 text-white" : "text-gray-700"}
        >
          {i}
        </Button>,
      )
    }

    return (
      
      <div className="flex items-center justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} className="text-gray-700">
              1
            </Button>
            {startPage > 2 && <span className="mx-1">...</span>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-1">...</span>}
            <Button variant="outline" size="sm" onClick={() => handlePageChange(totalPages)} className="text-gray-700">
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="text-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // 상태에 따른 뱃지 색상
  const getStatusBadgeVariant = (status: ReservationStatus) => {
    switch (status) {
      case "진행중":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "확정완료":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "취소됨":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return ""
    }
  }

  // 거래 방식에 따른 뱃지 색상
  const getTradeBadgeVariant = (tradeType: TradeType) => {
    return tradeType === "정가거래"
      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
      : "bg-purple-100 text-purple-800 hover:bg-purple-200"
  }

  // 상세보기 모달 열기
  const openDetailDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#F95700]">김 국제거래소 B2B</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/products" className="text-sm font-medium text-[#F95700]">
              제품 보기
            </Link>
            <Link href="/market-price" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
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
                <option value="ja" disabled>
                  日本語
                </option>
              </select>
            </div>
            <Link href="/signup">
              <Button size="sm">회원가입</Button>
            </Link>
          </div>
        </div>
      </header>

        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">예약 내역</h1>

          {/* 필터 및 검색 섹션 */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="상품명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <div className="w-40">
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="1month">최근 1개월</option>
                  <option value="3months">최근 3개월</option>
                  <option value="custom">직접 설정</option>
                </select>
              </div>

              <div className="w-40">
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={tradeFilter}
                  onChange={(e) => setTradeFilter(e.target.value)}
                >
                  <option value="all">모든 거래</option>
                  <option value="fixed">정가거래</option>
                  <option value="auction">입찰거래</option>
                </select>
              </div>
            </div>
          </div>

          {/* 상태 탭 */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
              <TabsTrigger value="all" className="rounded-full">
                전체
              </TabsTrigger>
              <TabsTrigger value="progress" className="rounded-full">
                진행중
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full">
                확정완료
              </TabsTrigger>
              <TabsTrigger value="canceled" className="rounded-full">
                취소됨
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 예약 테이블 */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    거래방식
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    상품명
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    예약일자
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    수량
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    가격
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    상태
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge className={getTradeBadgeVariant(reservation.tradeType)}>{reservation.tradeType}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{reservation.productName}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{reservation.reservationDate}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{reservation.quantity}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.price}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge className={getStatusBadgeVariant(reservation.status)}>{reservation.status}</Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetailDialog(reservation)}
                          className="text-gray-700 hover:text-gray-900 mr-2"
                        >
                          상세보기
                        </Button>
                        {reservation.canCancel && (
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                            취소하기
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                      예약 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalItems > 0 && renderPagination()}

          {/* 상세보기 모달 */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[650px] p-6 bg-white dark:bg-white border-gray-200">
              <DialogHeader>
                <DialogTitle className="text-gray-900 font-bold">예약 상세 정보</DialogTitle>
              </DialogHeader>

              {selectedReservation && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedReservation.productName}</h3>
                    <Badge className={getStatusBadgeVariant(selectedReservation.status)}>
                      {selectedReservation.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">예약일자</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.reservationDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">수량</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">가격</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.price}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">배송예정일</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.deliveryDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">생산지</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">판매자</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReservation.seller}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <FileText className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">상품 상세</p>
                      <p className="text-sm text-gray-800">{selectedReservation.productDetail}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mt-4">
                    <p className="text-sm font-medium text-gray-800">결제 정보</p>
                    <p className="text-sm text-gray-700 mt-1">결제 방법: {selectedReservation.paymentMethod}</p>
                    {selectedReservation.status === "확정완료" && <p className="text-sm text-green-600 mt-1 font-medium">결제 완료</p>}
                  </div>
                </div>
              )}

              <DialogFooter className="sm:justify-end mt-6">
                {selectedReservation?.canCancel && (
                  <Button variant="outline" className="text-red-600 hover:bg-red-50 mr-2 bg-white">
                    거래 취소
                  </Button>
                )}
                <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-800 hover:bg-gray-700 text-white">
                  닫기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Footer */}
      </div>
      <footer className="bg-gray-800 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">김 국제거래소 B2B</h3>
              <p className="mb-4 text-sm">전 세계 바이어를 위한 김 B2B 거래 플랫폼</p>
              <p className="text-sm">© 2025 김 국제거래소 B2B. All rights reserved.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">연락처</h3>
              <p className="mb-2 text-sm">경기도 이천시 신둔면 원적로 512번길 202</p>
              <p className="mb-2 text-sm">202, Wonjeok-ro 512beon-gil, Sindun-myeon, Icheon-si, Gyeonggi-do, Korea, Zip. 17300</p>
              <p className="mb-2 text-sm">Email: kwon@somiho.kr</p>
              <p className="text-sm">Tel: +82 70-4833-7310</p>
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
