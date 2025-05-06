"use client"

import { useState } from "react"
import { Search, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { ConfirmModal } from "@/components/confirm-modal"

export default function ReservationsPage() {
  const [openReservationDetail, setOpenReservationDetail] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject",
  })
  const [comment, setComment] = useState("")

  // Mock data for demonstration
  const reservations = [
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

  const handleOpenDetail = (reservation: any) => {
    setSelectedReservation(reservation)
    setOpenReservationDetail(true)
  }

  const handleApprove = (reservation: any, fromDetail = false) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 승인하시겠습니까?`,
      type: "success",
      action: "approve",
    })
    if (fromDetail) {
      setOpenReservationDetail(false)
    }
  }

  const handleReject = (reservation: any, fromDetail = false) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 반려하시겠습니까?`,
      type: "error",
      action: "reject",
    })
    if (fromDetail) {
      setOpenReservationDetail(false)
    }
  }

  const handleConfirmAction = () => {
    // 실제 API 호출 로직이 여기에 들어갑니다
    if (confirmModal.action === "approve") {
      // 승인 처리 로직
      console.log(`${selectedReservation.company} 예약 승인 처리됨`, comment)
      setConfirmModal({
        open: true,
        title: "예약이 승인되었습니다",
        type: "success",
        action: "",
      })
    } else if (confirmModal.action === "reject") {
      // 반려 처리 로직
      console.log(`${selectedReservation.company} 예약 반려 처리됨`, comment)
      setConfirmModal({
        open: true,
        title: "예약이 반려되었습니다",
        type: "error",
        action: "",
      })
    }
    setComment("")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">예약 관리</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="기업명 또는 제품명 검색" className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="waiting">대기</SelectItem>
              <SelectItem value="approved">승인</SelectItem>
              <SelectItem value="rejected">반려</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>예약 목록</CardTitle>
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
                {reservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenDetail(reservation)}
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

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <Dialog open={openReservationDetail} onOpenChange={setOpenReservationDetail}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>예약 정보를 확인하고 승인 또는 반려할 수 있습니다.</DialogDescription>
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
              {selectedReservation.status === "waiting" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">코멘트</h3>
                  <Textarea
                    placeholder="승인 또는 반려 사유를 입력하세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenReservationDetail(false)}>
                닫기
              </Button>
              {selectedReservation.status === "waiting" && (
                <>
                  <Button variant="destructive" onClick={() => handleReject(selectedReservation, true)}>
                    반려
                  </Button>
                  <Button onClick={() => handleApprove(selectedReservation, true)}>승인</Button>
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
