"use client"

import { useState, useEffect, useCallback } from "react"
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
import { reservationsApi } from "@/lib/api"
import type { Database } from "@/types/supabase"
import { toast } from "sonner"

type Reservation = Database["public"]["Views"]["reservations_detailed"]["Row"]

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [openReservationDetail, setOpenReservationDetail] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject" | "",
  })
  const [comment, setComment] = useState("")

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 예약 목록 조회
  const fetchReservations = useCallback(async () => {
    setLoading(true)
    try {
      const response = await reservationsApi.getReservations({
        q: searchQuery || undefined,
        status: selectedStatus as any,
        sort_by: "created_at",
        sort_order: "desc",
      })

      if (response.success && response.data) {
        setReservations(response.data)
      } else {
        toast.error(response.message || "예약 목록 조회에 실패했습니다.")
      }
    } catch (error) {
      console.error("예약 조회 오류:", error)
      toast.error("예약 목록을 불러오는 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedStatus])

  // 필터 변경 시 데이터 조회 (검색어는 디바운스 적용)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReservations()
    }, searchQuery ? 300 : 0) // 검색어가 있을 때만 디바운스

    return () => clearTimeout(timer)
  }, [fetchReservations])

  const handleOpenDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setOpenReservationDetail(true)
  }

  const handleApprove = (reservation: Reservation, fromDetail = false) => {
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

  const handleReject = (reservation: Reservation, fromDetail = false) => {
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

  const handleConfirmAction = async () => {
    if (!selectedReservation) return

    try {
      if (confirmModal.action === "approve") {
        // 승인 처리
        const response = await reservationsApi.approveReservation(selectedReservation.id)

        if (response.success) {
          toast.success("예약이 승인되었습니다")
          setConfirmModal({
            open: false,
            title: "",
            type: "success",
            action: "",
          })
          setComment("")
          // 목록 새로고침
          fetchReservations()
        } else {
          toast.error(response.message || "승인에 실패했습니다")
        }
      } else if (confirmModal.action === "reject") {
        // 반려 처리
        if (!comment.trim()) {
          toast.error("반려 사유를 입력해주세요")
          return
        }

        const response = await reservationsApi.rejectReservation(selectedReservation.id, {
          rejection_reason: comment,
        })

        if (response.success) {
          toast.success("예약이 반려되었습니다")
          setConfirmModal({
            open: false,
            title: "",
            type: "success",
            action: "",
          })
          setComment("")
          // 목록 새로고침
          fetchReservations()
        } else {
          toast.error(response.message || "반려에 실패했습니다")
        }
      }
    } catch (error) {
      console.error("예약 처리 오류:", error)
      toast.error("처리 중 오류가 발생했습니다")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">예약 관리</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="기업명 또는 제품명 검색" 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
        </div>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>예약 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-gray-500">로딩 중...</div>
          ) : reservations.length === 0 ? (
            <div className="py-8 text-center text-gray-500">등록된 예약이 없습니다.</div>
          ) : (
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
                      <td className="px-4 py-4 text-gray-600">{reservation.product_name}</td>
                      <td className="px-4 py-4 text-gray-600">
                        {reservation.reservation_date ? new Date(reservation.reservation_date).toLocaleDateString('ko-KR') : '-'}
                      </td>
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
          )}
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
                    <span className="font-medium">담당자:</span> {selectedReservation.manager}
                  </div>
                  <div>
                    <span className="font-medium">이메일:</span> {selectedReservation.member_email}
                  </div>
                  <div>
                    <span className="font-medium">연락처:</span> {selectedReservation.member_phone || '-'}
                  </div>
                  <div>
                    <span className="font-medium">국가:</span> {selectedReservation.member_country}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">제품 정보</h3>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>
                    <span className="font-medium">제품명:</span> {selectedReservation.product_name}
                  </div>
                  <div>
                    <span className="font-medium">등급:</span>{" "}
                    <StarRating grade={selectedReservation.product_grade || 0} size={14} />
                  </div>
                  <div>
                    <span className="font-medium">고유코드:</span> {selectedReservation.product_code}
                  </div>
                  <div>
                    <span className="font-medium">단가:</span> {selectedReservation.product_unit_price?.toLocaleString('ko-KR')}원
                  </div>
                  <div>
                    <span className="font-medium">수량:</span> {selectedReservation.quantity}
                  </div>
                  <div>
                    <span className="font-medium">총 가격:</span> {selectedReservation.total_price?.toLocaleString('ko-KR')}원
                  </div>
                </div>
              </div>
              {selectedReservation.memo && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">요청 메모</h3>
                  <div className="rounded-md border border-gray-200 p-3 text-sm">
                    <div>{selectedReservation.memo}</div>
                  </div>
                </div>
              )}
              {selectedReservation.rejection_reason && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-red-600">반려 사유</h3>
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                    <div>{selectedReservation.rejection_reason}</div>
                  </div>
                </div>
              )}
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
