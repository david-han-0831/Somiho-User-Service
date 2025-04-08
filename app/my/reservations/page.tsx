"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react"

// Sample reservation data
const reservations = [
  {
    id: "R20250324-001",
    productId: "20250323-001",
    productName: "완도 특상품 김",
    quantity: 100,
    price: 15000,
    totalPrice: 1500000,
    date: "2025-03-24",
    status: "pending", // pending, approved, rejected
    notes: "샘플 요청 포함",
  },
  {
    id: "R20250323-002",
    productId: "20250323-002",
    productName: "고흥 일반 김",
    quantity: 50,
    price: 12000,
    totalPrice: 600000,
    date: "2025-03-23",
    status: "approved",
    notes: "",
  },
  {
    id: "R20250322-003",
    productId: "20250323-004",
    productName: "부산 일반 김",
    quantity: 30,
    price: 10000,
    totalPrice: 300000,
    date: "2025-03-22",
    status: "rejected",
    notes: "품절로 인한 거절",
  },
]

// Helper function to format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
}

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          승인 대기
        </span>
      )
    case "approved":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          승인 완료
        </span>
      )
    case "rejected":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3 mr-1" />
          반려
        </span>
      )
    default:
      return null
  }
}

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null)

  // Filter reservations based on active tab
  const filteredReservations =
    activeTab === "all" ? reservations : reservations.filter((reservation) => reservation.status === activeTab)

  // Get reservation details
  const getReservationDetails = (id: string) => {
    return reservations.find((reservation) => reservation.id === id)
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">예약 내역</h1>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                전체
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                승인 대기
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "approved"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                승인 완료
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "rejected"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("rejected")}
              >
                반려
              </button>
            </nav>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredReservations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer ${
                    selectedReservation === reservation.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedReservation(selectedReservation === reservation.id ? null : reservation.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900 mr-3">{reservation.productName}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        예약번호: {reservation.id} | 예약일: {formatDate(reservation.date)}
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <div className="text-right mr-4">
                        <div className="text-sm text-gray-900">{reservation.quantity}kg</div>
                        <div className="text-sm font-medium text-primary">
                          ₩{reservation.totalPrice.toLocaleString()}
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          selectedReservation === reservation.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedReservation === reservation.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">예약 정보</h4>
                          <div className="space-y-1 text-sm">
                            <div className="grid grid-cols-3 gap-2">
                              <span className="text-gray-500">제품 ID:</span>
                              <span className="col-span-2">{reservation.productId}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="text-gray-500">수량:</span>
                              <span className="col-span-2">{reservation.quantity}kg</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="text-gray-500">단가:</span>
                              <span className="col-span-2">₩{reservation.price.toLocaleString()}/kg</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="text-gray-500">총액:</span>
                              <span className="col-span-2 font-medium">₩{reservation.totalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">요청사항</h4>
                          <p className="text-sm text-gray-600">{reservation.notes || "요청사항이 없습니다."}</p>

                          {reservation.status === "approved" && (
                            <div className="mt-4">
                              <Link
                                href={`/products/${reservation.productId}`}
                                className="text-primary text-sm font-medium hover:underline"
                              >
                                제품 상세 보기
                              </Link>
                            </div>
                          )}

                          {reservation.status === "rejected" && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                              <p className="font-medium text-gray-900 mb-1">반려 사유:</p>
                              <p>{reservation.notes || "사유가 명시되지 않았습니다."}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">예약 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
