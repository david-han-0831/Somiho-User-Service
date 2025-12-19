"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { dashboardApi, reservationsApi } from "@/lib/api/client"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]
type Reservation = Database["public"]["Views"]["reservations_detailed"]["Row"]

export default function Dashboard() {
  const { toast } = useToast()
  
  // 상태 관리
  const [stats, setStats] = useState<any>(null)
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const [openReservationDetail, setOpenReservationDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [comment, setComment] = useState("")

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject",
  })

  // 데이터 로드
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // 통계, 최근 제품, 최근 예약 병렬 조회
      const [statsResult, productsResult, reservationsResult] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentProducts(5),
        dashboardApi.getRecentReservations(5),
      ])

      if (statsResult.success) setStats(statsResult.data)
      if (productsResult.success) setRecentProducts(productsResult.data)
      if (reservationsResult.success) setRecentReservations(reservationsResult.data)
    } catch (error) {
      console.error("Dashboard data load error:", error)
      toast({
        title: "데이터 로드 실패",
        description: "대시보드 데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 승인하시겠습니까?`,
      type: "success",
      action: "approve",
    })
  }

  const handleReject = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setConfirmModal({
      open: true,
      title: `${reservation.company}의 예약을 반려하시겠습니까?`,
      type: "error",
      action: "reject",
    })
  }

  const handleConfirmAction = async () => {
    if (!selectedReservation) return

    try {
      if (confirmModal.action === "approve") {
        const result = await reservationsApi.approveReservation(selectedReservation.id)
        
        if (result.success) {
          toast({
            title: "승인 완료",
            description: "예약이 승인되었습니다.",
          })
          setOpenReservationDetail(false)
          loadDashboardData() // 데이터 새로고침
        } else {
          throw new Error(result.message)
        }
      } else if (confirmModal.action === "reject") {
        if (!comment.trim()) {
          toast({
            title: "반려 사유 필요",
            description: "반려 사유를 입력해주세요.",
            variant: "destructive",
          })
          return
        }

        const result = await reservationsApi.rejectReservation(selectedReservation.id, {
          rejection_reason: comment,
        })
        
        if (result.success) {
          toast({
            title: "반려 완료",
            description: "예약이 반려되었습니다.",
          })
          setOpenReservationDetail(false)
          setComment("")
          loadDashboardData() // 데이터 새로고침
        } else {
          throw new Error(result.message)
        }
      }

      setConfirmModal({ ...confirmModal, open: false })
    } catch (error: any) {
      toast({
        title: "처리 실패",
        description: error.message || "처리 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product)
    setOpenProductDetail(true)
  }

  const handleOpenReservationDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setOpenReservationDetail(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F95700] mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터 로드 중...</p>
        </div>
      </div>
    )
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
              <div className="text-2xl font-bold">{stats?.new_products_week || 0}</div>
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
              <div className="text-2xl font-bold">{stats?.pending_members || 0}</div>
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
              <div className="text-2xl font-bold">{stats?.pending_reservations || 0}</div>
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
              <div className="text-2xl font-bold">{stats?.updated_countries || 0}</div>
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
                    <td className="px-4 py-4 text-gray-600">{product.production_date}</td>
                    <td className="px-4 py-4 font-mono text-xs text-gray-600">{product.code}</td>
                    <td className="px-4 py-4 text-gray-600">{new Date(product.created_at).toLocaleDateString('ko-KR')}</td>
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
                    <td className="px-4 py-4 text-gray-600">{reservation.product_name}</td>
                    <td className="px-4 py-4 text-gray-600">{reservation.reservation_date}</td>
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
                  src={selectedProduct.thumbnail_url || "/placeholder.svg"}
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
                <span className="col-span-3">{selectedProduct.price.toLocaleString()}원</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">원산지:</span>
                <span className="col-span-3">{selectedProduct.origin}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">생산일자:</span>
                <span className="col-span-3">{selectedProduct.production_date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">고유코드:</span>
                <span className="col-span-3">{selectedProduct.code}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">등록일:</span>
                <span className="col-span-3">{new Date(selectedProduct.created_at).toLocaleDateString('ko-KR')}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">상품 설명:</span>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>{selectedProduct.description || '설명 없음'}</div>
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
                    <span className="font-medium">담당자:</span> {selectedReservation.manager}
                  </div>
                  <div>
                    <span className="font-medium">이메일:</span> {selectedReservation.member_email}
                  </div>
                  <div>
                    <span className="font-medium">연락처:</span> {selectedReservation.member_phone}
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
                    <StarRating grade={selectedReservation.product_grade as number} size={14} />
                  </div>
                  <div>
                    <span className="font-medium">고유코드:</span> {selectedReservation.product_code}
                  </div>
                  <div>
                    <span className="font-medium">가격:</span> {selectedReservation.product_unit_price.toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">요청 메모</h3>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <div>{selectedReservation.memo || '메모 없음'}</div>
                </div>
              </div>
              {selectedReservation.status === "waiting" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">반려 사유 (반려 시 필수)</h3>
                  <Textarea
                    placeholder="반려 사유를 입력하세요."
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

