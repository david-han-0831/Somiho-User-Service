"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, ChevronLeft, ChevronRight, Play, X } from "lucide-react"

// Sample product data
const product = {
  id: "20250323-001",
  name: "완도 특상품 김",
  origin: "KR",
  year: 2025,
  grade: "A+",
  price: 15000,
  description:
    "완도에서 생산된 최고급 품질의 김입니다. 특유의 향과 맛이 일품이며, 두께와 색상이 균일합니다. 국내외 최고급 레스토랑에서 사용되는 프리미엄 제품입니다.",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  video: "/placeholder.svg?height=600&width=800",
  available: true,
}

// Helper function to render grade stars
const renderGradeStars = (grade: string) => {
  switch (grade) {
    case "A+":
      return (
        <div className="flex">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </div>
      )
    case "A":
      return (
        <div className="flex">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 text-gray-300" />
        </div>
      )
    case "B+":
      return (
        <div className="flex">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <Star className="h-5 w-5 text-gray-300" />
          <Star className="h-5 w-5 text-gray-300" />
        </div>
      )
    case "B":
      return (
        <div className="flex">
          <Star className="h-5 w-5 fill-gray-400 text-gray-400" />
          <Star className="h-5 w-5 text-gray-300" />
          <Star className="h-5 w-5 text-gray-300" />
        </div>
      )
    default:
      return null
  }
}

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [showReserveModal, setShowReserveModal] = useState(false)

  // Media array (images + video)
  const media = [...product.images, product.video]

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
    setShowVideo(currentImageIndex === media.length - 2)
  }

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
    setShowVideo(currentImageIndex === media.length - 2)
  }

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
    setShowVideo(index === media.length - 1)
  }

  // Handle reserve button click
  const handleReserveClick = () => {
    if (product.available) {
      setShowReserveModal(true)
    }
  }

  // Handle reserve form submission
  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/my/reservations")
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/products" className="text-gray-600 hover:text-primary flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            제품 목록으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Media */}
            <div className="p-6">
              {/* Main Image/Video */}
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-md overflow-hidden">
                {showVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={media[currentImageIndex] || "/placeholder.svg"}
                      alt="제품 영상"
                      className="max-w-full max-h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary/80 rounded-full p-3">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={media[currentImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} 이미지 ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Navigation Arrows */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {media.map((src, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${
                      currentImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={src || "/placeholder.svg"}
                        alt={index === media.length - 1 ? "영상 썸네일" : `썸네일 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === media.length - 1 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="mr-2">{renderGradeStars(product.grade)}</div>
                <span className="text-sm text-gray-600">등급: {product.grade}</span>
              </div>

              <div className="text-3xl font-bold text-primary mb-6">₩{product.price.toLocaleString()}/kg</div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-gray-600">원산지</div>
                  <div className="col-span-2">
                    {product.origin === "KR" ? "한국" : product.origin === "CN" ? "중국" : "일본"}
                  </div>

                  <div className="text-gray-600">생산연도</div>
                  <div className="col-span-2">{product.year}년</div>

                  <div className="text-gray-600">고유번호</div>
                  <div className="col-span-2">{product.id}</div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">제품 설명</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleReserveClick}
                  disabled={!product.available}
                  className={`w-full py-3 rounded-md font-medium ${
                    product.available
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.available ? "예약하기" : "예약 완료"}
                </button>

                {!product.available && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    이 제품은 현재 다른 바이어가 예약한 상태입니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">제품 예약하기</h2>
              <button onClick={() => setShowReserveModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleReserveSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                    제품
                  </label>
                  <input
                    type="text"
                    id="product"
                    value={`${product.name} (${product.id})`}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    예약 수량 (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    요청사항
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="추가 요청사항이 있으시면 입력해주세요."
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">바이어 정보</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-600">회사명:</div>
                    <div>소미호</div>
                    <div className="text-gray-600">담당자:</div>
                    <div>권기호</div>
                    <div className="text-gray-600">연락처:</div>
                    <div>+82-10-1234-5678</div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 rounded-b-lg">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
                >
                  예약 신청하기
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">예약 신청 후 관리자 승인 시 확정됩니다.</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
