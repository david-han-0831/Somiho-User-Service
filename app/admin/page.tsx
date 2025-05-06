"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Users, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ConfirmModal } from "@/components/confirm-modal"

export default function Dashboard() {
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const [openReservationDetail, setOpenReservationDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [comment, setComment] = useState("")

  // confirmModal 상태 설정 부분 수정
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject",
  })

  // handleApprove 함수 수정
  const handleApprove = (reservation: any) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 승인하시겠습니까?`,
      type: "success",
      action: "approve",
    })
  }

  // handleReject 함수 수정
  const handleReject = (reservation: any) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 반려하시겠습니까?`,
      type: "error",
      action: "reject",
    })
  }

  // handleConfirmAction 함수 수정
  const handleConfirmAction = () => {
    if (confirmModal.action === "approve") {
      // 승인 처리 로직
      console.log(`${selectedReservation.company} 예약 승인 처리됨`)
      setOpenReservationDetail(false)
      setConfirmModal({
        ...confirmModal,
        open: true,
        title: "예약이 승인되었습니다",
        action: "",
      })
    } else if (confirmModal.action === "reject") {
      // 반려 처리 로직
      console.log(`${selectedReservation.company} 예약 반려 처리됨`)
      setOpenReservationDetail(false)
      setConfirmModal({
        ...confirmModal,
        open: true,
        title: "예약이 반려되었습니다",
        action: "",
      })
    }
  }

  // Mock data for demonstration
  const recentProducts = [
    {
      id: 1,
      name: "조미김 세트",
      grade: "A+",
      productionDate: "2025-03-15",
      code: "20250315-001",
      createdAt: "2025-03-20",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "33,000",
      description: "고급 조미김 세트입니다.",
    },
    {
      id: 2,
      name: "파래김 세트",
      grade: "A",
      productionDate: "2025-03-16",
      code: "20250316-002",
      createdAt: "2025-03-21",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "28,000",
      description: "신선한 파래김 세트입니다.",
    },
    {
      id: 3,
      name: "구운김 세트",
      grade: "B+",
      productionDate: "2025-03-17",
      code: "20250317-003",
      createdAt: "2025-03-22",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "25,000",
      description: "바삭한 구운김 세트입니다.",
    },
    {
      id: 4,
      name: "도시락김 세트",
      grade: "A",
      productionDate: "2025-03-18",
      code: "20250318-004",
      createdAt: "2025-03-23",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "22,000",
      description: "도시락용 김 세트입니다.",
    },
    {
      id: 5,
      name: "김밥용김 세트",
      grade: "A+",
      productionDate: "2025-03-19",
      code: "20250319-005",
      createdAt: "2025-03-24",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "30,000",
      description: "김밥용 김 세트입니다.",
    },
  ]

  const recentReservations = [
    {
      id: 1,
      company: "김무역",
      product: "조미김 세트",
      reservationDate: "2025-03-25",
      status: "waiting",
      companyInfo: {
        manager: "김일본",
        email: "kim@example.jp",
        phone: "+81-3-1234-5678",
        country: "일본",
      },
      productInfo: {
        name: "조미김 세트",
        grade: "A+",
        code: "20250315-001",
        price: "33,000",
      },
      memo: "샘플 요청 포함",
    },
    {
      id: 2,
      company: "해양물산",
      product: "파래김 세트",
      reservationDate: "2025-03-26",
      status: "approved",
      companyInfo: {
        manager: "이중국",
        email: "lee@example.cn",
        phone: "+86-10-1234-5678",
        country: "중국",
      },
      productInfo: {
        name: "파래김 세트",
        grade: "A",
        code: "20250316-002",
        price: "28,000",
      },
      memo: "대량 주문 예정",
    },
    {
      id: 3,
      company: "일본식품",
      product: "구운김 세트",
      reservationDate: "2025-03-27",
      status: "waiting",
      companyInfo: {
        manager: "사토",
        email: "sato@example.jp",
        phone: "+81-3-2345-6789",
        country: "일본",
      },
      productInfo: {
        name: "구운김 세트",
        grade: "B+",
        code: "20250317-003",
        price: "25,000",
      },
      memo: "품질 확인 요청",
    },
    {
      id: 4,
      company: "중국무역",
      product: "도시락김 세트",
      reservationDate: "2025-03-28",
      status: "rejected",
      companyInfo: {
        manager: "왕",
        email: "wang@example.cn",
        phone: "+86-10-2345-6789",
        country: "중국",
      },
      productInfo: {
        name: "도시락김 세트",
        grade: "A",
        code: "20250318-004",
        price: "22,000",
      },
      memo: "가격 협상 요청",
    },
    {
      id: 5,
      company: "글로벌푸드",
      product: "김밥용김 세트",
      reservationDate: "2025-03-29",
      status: "waiting",
      companyInfo: {
        manager: "박미국",
        email: "park@example.com",
        phone: "+1-123-456-7890",
        country: "미국",
      },
      productInfo: {
        name: "김밥용김 세트",
        grade: "A+",
        code: "20250319-005",
        price: "30,000",
      },
      memo: "샘플 요청",
    },
  ]

  const handleOpenProductDetail = (product: any) => {
    setSelectedProduct(product)
    setOpenProductDetail(true)
  }

  const handleOpenReservationDetail = (reservation: any) => {
    setSelectedReservation(reservation)
    setOpenReservationDetail(true)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">대시보드</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products" className="block">
          <Card className="border-l-4 border-l-[#F95700] shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">신규 상품</CardTitle>
              <Package className="h-4 w-4 text-[#F95700]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">이번 주 등록</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/members" className="block">
          <Card className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">가입 신청</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">승인 대기 중</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/reservations" className="block">
          <Card className="border-l-4 border-l-green-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">예약 대기</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">처리 필요</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/market-price" className="block">
          <Card className="border-l-4 border-l-purple-500 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">시세 업데이트</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">국가별 최신 시세</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>최근 등록 상품</CardTitle>
            <CardDescription>최근 등록된 5개 상품</CardDescription>
          </div>
          <Link href="/admin/products">
            <Button variant="outline" size="sm" className="gap-1">
              전체보기 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 font-semibold">상품명</th>
                  <th className="px-4 py-3 font-semibold">등급</th>
                  <th className="px-4 py-3 font-semibold">생산일자</th>
                  <th className="px-4 py-3 font-semibold">고유코드</th>
                  <th className="px-4 py-3 font-semibold">등록일</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenProductDetail(product)}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 py-4">
                      <StarRating grade={product.grade} />
                    </td>
                    <td className="px-4 py-4 text-gray-600">{product.productionDate}</td>
                    <td className="px-4 py-4 font-mono text-xs text-gray-600">{product.code}</td>
                    <td className="px-4 py-4 text-gray-600">{product.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reservations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>최근 예약 요청</CardTitle>
            <CardDescription>최근 접수된 5개 예약</CardDescription>
          </div>
          <Link href="/admin/reservations">
            <Button variant="outline" size="sm" className="gap-1">
              전체보기 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 font-semibold">기업명</th>
                  <th className="px-4 py-3 font-semibold">제품명</th>
                  <th className="px-4 py-3 font-semibold">예약일</th>
                  <th className="px-4 py-3 font-semibold">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenReservationDetail(reservation)}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">{reservation.company}</td>
                    <td className="px-4 py-4 text-gray-600">{reservation.product}</td>
                    <td className="px-4 py-4 text-gray-600">{reservation.reservationDate}</td>
                    <td className="px-4 py-4">
                      {reservation.status === "waiting" && <Badge variant="waiting">승인대기</Badge>}
                      {reservation.status === "approved" && <Badge variant="approved">승인됨</Badge>}
                      {reservation.status === "rejected" && <Badge variant="rejected">반려됨</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={openProductDetail} onOpenChange={setOpenProductDetail}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>상품 상세 정보</DialogTitle>
              <DialogDescription>상품 정보를 확인할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-md border border-gray-200">
                <img
                  src={selectedProduct.thumbnail || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">상품명:</span>
                <span className="col-span-3">{selectedProduct.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">등급:</span>
                <span className="col-span-3">
                  <StarRating grade={selectedProduct.grade} />
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">가격:</span>
                <span className="col-span-3">{selectedProduct.price}원</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">원산지:</span>
                <span className="col-span-3">{selectedProduct.origin}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">생산일자:</span>
                <span className="col-span-3">{selectedProduct.productionDate}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">고유코드:</span>
                <span className="col-span-3">{selectedProduct.code}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">등록일:</span>
                <span className="col-span-3">{selectedProduct.createdAt}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">상품 설명:</span>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>{selectedProduct.description}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenProductDetail(false)}>
                닫기
              </Button>
              <Link href={`/admin/products/edit/${selectedProduct.id}`}>
                <Button>수정하기</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <Dialog open={openReservationDetail} onOpenChange={setOpenReservationDetail}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>예약 정보를 확인할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">기업 정보</h3>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>
                    <span className="font-medium">기업명:</span> {selectedReservation.company}
                  </div>
                  <div>
                    <span className="font-medium">담당자:</span> {selectedReservation.companyInfo.manager}
                  </div>
                  <div>
                    <span className="font-medium">이메일:</span> {selectedReservation.companyInfo.email}
                  </div>
                  <div>
                    <span className="font-medium">연락처:</span> {selectedReservation.companyInfo.phone}
                  </div>
                  <div>
                    <span className="font-medium">국가:</span> {selectedReservation.companyInfo.country}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">제품 정보</h3>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>
                    <span className="font-medium">제품명:</span> {selectedReservation.productInfo.name}
                  </div>
                  <div>
                    <span className="font-medium">등급:</span>{" "}
                    <StarRating grade={selectedReservation.productInfo.grade} size={14} />
                  </div>
                  <div>
                    <span className="font-medium">고유코드:</span> {selectedReservation.productInfo.code}
                  </div>
                  <div>
                    <span className="font-medium">가격:</span> {selectedReservation.productInfo.price}원
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">요청 메모</h3>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>{selectedReservation.memo}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenReservationDetail(false)}>
                닫기
              </Button>
              {selectedReservation.status === "waiting" && (
                <>
                  <Button variant="destructive" onClick={() => handleReject(selectedReservation)}>
                    반려
                  </Button>
                  <Button onClick={() => handleApprove(selectedReservation)}>승인</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
