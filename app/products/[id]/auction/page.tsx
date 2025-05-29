"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Clock, Users, TrendingUp, AlertCircle, X, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter, useParams } from "next/navigation"
import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LuxStarTable from "@/components/LuxStarTable"

export default function AuctionProductDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const productId = Number.parseInt(params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [bidModalOpen, setBidModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 테스트를 위해 true로 변경
  const [bidAmount, setBidAmount] = useState("")
  const [bidSuccess, setBidSuccess] = useState(false)

  // 경매 남은 시간 계산
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Mock data - 실제로는 API에서 가져와야 함
  const product = {
    id: productId,
    name: "프리미엄 완도 재래김",
    type: "재래김",
    origin: "한국",
    originDetail: "완도",
    size: "19×27",
    weight: "220g",
    grade: "A+",
    startPrice: "12,000",
    currentPrice: "15,000",
    unit: "속",
    stock: 260,
    code: "20250323-001",
    year: "2025",
    quantity: "72속",
    manufacturer: "완도수산",
    minOrderQuantity: 10,
    packageUnit: "100장 1속",
    tradeUnit: "박스",
    shelfLife: "제조일로부터 12개월",
    description:
      "완도 청정해역에서 생산된 최고급 재래김입니다. 두께가 균일하고 색상이 진하며, 향이 풍부합니다. 구멍이 적고 이물질이 없어 고급 요리와 선물용으로 적합합니다.",
    features: [
      "청정해역 완도산",
      "균일한 두께와 진한 색상",
      "풍부한 향과 맛",
      "이물질 없는 깨끗한 품질",
      "선물용 및 고급 요리용으로 적합",
    ],
    qualityInfo: "구멍 발생률 1% 미만, 이물질 없음, 색상 균일도 95% 이상",
    gradeInfo: "A+ 등급은 최상위 5% 품질에 해당하는 프리미엄 제품입니다.",
    deliveryInfo: "최소 주문 수량 10박스, 국내 배송 3-5일 소요, 해외 배송 7-14일 소요",
    tradeConditions: "선입금 결제, 대량 구매 시 할인 가능, 샘플 요청 가능",
    images: [
      "/product_img/product_1.jpg",
      "/product_img/product_2.jpg",
      "/product_img/product_3.jpg",
      "/product_img/product_4.jpg",
    ],
    isAuction: true,
    auctionEndTime: "2025-06-15 18:00:00",
    bidHistory: [
      { id: 1, user: "buyer123", amount: "15,000", time: "2025-05-05 14:23:45" },
      { id: 2, user: "seafood_co", amount: "14,500", time: "2025-05-05 12:15:30" },
      { id: 3, user: "gim_trader", amount: "14,000", time: "2025-05-05 10:45:12" },
      { id: 4, user: "ocean_buyer", amount: "13,500", time: "2025-05-04 18:30:22" },
      { id: 5, user: "seaweed_inc", amount: "13,000", time: "2025-05-04 15:10:05" },
      { id: 6, user: "food_market", amount: "12,500", time: "2025-05-04 09:45:33" },
      { id: 7, user: "system", amount: "12,000", time: "2025-05-03 00:00:00", note: "시작가" },
    ],
    totalBids: 6,
    participants: 5,
  }

  // 경매 종료 시간까지 남은 시간 계산
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(product.auctionEndTime).getTime()
      const now = new Date().getTime()
      const difference = endTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [product.auctionEndTime])

  // 입찰 처리 함수
  const handleBid = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=" + encodeURIComponent(`/products/${productId}/auction`))
      return
    }

    setBidModalOpen(true)
  }

  // 입찰 제출 함수
  const submitBid = () => {
    // 실제로는 API 호출이 필요함
    console.log(`입찰 요청: 상품 ID ${productId}, 금액 ${bidAmount}원`)

    // 입찰 성공 처리
    setBidSuccess(true)

    // 3초 후 모달 닫기
    setTimeout(() => {
      setBidModalOpen(false)
      setBidSuccess(false)
      setBidAmount("")
    }, 3000)
  }

  // 유사 상품 목록 (실제로는 API에서 가져와야 함)
  const similarProducts = [
    {
      id: 2,
      name: "고흥 일반 김",
      type: "파래김",
      origin: "한국",
      originDetail: "고흥",
      grade: "A",
      price: "12,000",
      unit: "속",
      quantity: "50속",
      image: "/product_img/product_2.jpg",
      isAuction: false,
    },
    {
      id: 3,
      name: "서천 특상품 김",
      type: "김밥김",
      origin: "한국",
      originDetail: "서천",
      grade: "A+",
      price: "14,500",
      unit: "속",
      quantity: "100속",
      image: "/product_img/product_3.jpg",
      isAuction: true,
    },
    {
      id: 4,
      name: "신안 특상품 김",
      type: "곱창김",
      origin: "한국",
      originDetail: "신안",
      grade: "B+",
      price: "13,000",
      unit: "속",
      quantity: "150속",
      image: "/product_img/product_4.jpg",
      isAuction: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#F95700]">
            홈
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href="/products" className="hover:text-[#F95700]">
            전체상품
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href={`/products?type=${product.type}`} className="hover:text-[#F95700]">
            {product.type}
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* 뒤로 가기 버튼 */}
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-sm text-gray-500 hover:text-[#F95700]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            제품 목록으로 돌아가기
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 제품 이미지 */}
          <div className="space-y-4">
            <div
              className="relative aspect-square overflow-hidden rounded-lg border bg-white"
              onClick={() => setImageModalOpen(true)}
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover cursor-pointer"
              />
              <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">입찰거래</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-lg border ${
                    selectedImage === index ? "border-[#F95700] border-2" : "border-gray-200"
                  } bg-white cursor-pointer`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 제품 정보 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500 hover:bg-red-600">입찰거래</Badge>
                <span className="text-sm text-gray-500">상품코드: {product.code}</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <StarRating grade={product.grade} />
                <span className="text-sm text-gray-500">({product.grade})</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">판매자: {product.manufacturer}</div>
            </div>

            {/* 경매 정보 */}
            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-red-700">입찰 진행 중</h2>
                <div className="flex items-center gap-1 text-sm text-red-700">
                  <Clock className="h-4 w-4" />
                  <span>
                    {timeLeft.days > 0 && `${timeLeft.days}일 `}
                    {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")} 남음
                  </span>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-md bg-white p-3">
                  <div className="text-gray-500">시작가</div>
                  <div className="text-lg font-bold">
                    ₩{product.startPrice}/{product.unit}
                  </div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-gray-500">현재 최고가</div>
                  <div className="text-lg font-bold text-red-600">
                    ₩{product.currentPrice}/{product.unit}
                  </div>
                </div>
                <div className="rounded-md bg-white p-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-gray-500">참여자</div>
                    <div className="font-medium">{product.participants}명</div>
                  </div>
                </div>
                <div className="rounded-md bg-white p-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-gray-500">총 입찰</div>
                    <div className="font-medium">{product.totalBids}회</div>
                  </div>
                </div>
              </div>
              <div className="mb-4 rounded-md bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">경매 종료</div>
                  <div>
                    {product.auctionEndTime.split(" ")[0].replace(/-/g, ".")} {product.auctionEndTime.split(" ")[1]}
                  </div>
                </div>
                {/* <div className="text-xs text-gray-500">
                  * 경매 종료 시간 30초 전에 새로운 입찰이 있을 경우, 종료 시간이 3분 연장됩니다.
                </div> */}
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700" size="lg" onClick={handleBid}>
                입찰 참여하기
              </Button>
            </div>

            <div className="rounded-lg border bg-white p-6">
              <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-sm text-gray-500">종류</p>
                  <p className="font-medium">{product.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">산지</p>
                  <p className="font-medium">
                    {product.origin}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">규격</p>
                  <p className="font-medium">{product.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">중량</p>
                  <p className="font-medium">{product.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">입수량</p>
                  <p className="font-medium">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">생산년도</p>
                  <p className="font-medium">{product.year}</p>
                </div>
              </div>

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">최소 주문 수량</span>
                  <span className="font-medium">
                    {product.minOrderQuantity} {product.tradeUnit}
                  </span>
                </div>
                <div className="text-sm text-gray-500">* 낙찰 시 최소 주문 수량 이상 구매해야 합니다.</div>
              </div>

              {/* 제공 가능 서류 섹션 추가 */}
              <div className="mb-6 border-t border-gray-100 pt-6">
                <h3 className="mb-4 font-medium text-gray-900">제공 가능 서류</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">원산지증명서</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">위생증명서</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">식물검역증</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">한국 유기인증</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">USDA 인증</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">HALAL 인증</span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">영양성분분석</span>
                    </div>
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">유료</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">중금속성적서</span>
                    </div>
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">유료</span>
                  </div>
                </div>
                
              </div>
            </div>
            
                  


            {/* 찜하기 및 공유하기 버튼 */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="lg"
                className="flex-1 bg-[#F95700] hover:bg-[#E04E00]"
                
              >
                장바구니 담기
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                <span>공유하기</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 입찰 내역 */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">입찰 내역</h2>
          <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">입찰자</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">입찰가</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">입찰 시간</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.bidHistory.map((bid) => (
                  <tr key={bid.id} className={bid.user === "system" ? "bg-gray-50" : ""}>
                    <td className="px-4 py-3 text-sm">
                      {bid.user === "system" ? (
                        <span className="text-gray-500">시스템</span>
                      ) : (
                        <span>{bid.user.substring(0, 3)}***</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-sm ${bid.id === 1 ? "font-bold text-red-600" : ""}`}>
                      ₩{bid.amount}/{product.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{bid.time}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{bid.note || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 상세 정보 탭 */}
        <div className="mt-12">
          
          <LuxStarTable className="w-full" />
          <hr className="border-t border-gray-200 mt-8" />
        </div>

        {/* 추천 상품 */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">유사한 상품</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {similarProducts.map((product) => (
              <Link
                key={product.id}
                href={product.isAuction ? `/products/${product.id}/auction` : `/products/${product.id}`}
              >
                <div className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {product.isAuction && (
                      <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">입찰거래</Badge>
                    )}
                    {!product.isAuction && (
                      <Badge className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600">정가거래</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-semibold">{product.name}</h3>
                    <div className="mb-2 flex items-center">
                      <StarRating grade={product.grade} />
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>
                        {product.type} | 입수량: {product.quantity}
                      </span>
                    </div>
                    <div className="mt-2 text-right font-bold text-[#F95700]">
                      ₩{product.price}/{product.unit}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* 이미지 확대 모달 */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-4xl bg-black/90 p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} 이미지 상세보기</DialogTitle>
          </DialogHeader>
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setImageModalOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh]">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 입찰 모달 */}
      <Dialog open={bidModalOpen} onOpenChange={setBidModalOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-white border-gray-200 p-6">
          <DialogHeader>
            <DialogTitle className="mb-4 text-xl font-bold text-gray-900">입찰 참여</DialogTitle>
          </DialogHeader>

          <div className="mb-6">
            {!bidSuccess ? (
              <>
                <div className="mb-4 rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.type} | {product.originDetail}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">현재 최고가:</span>
                      <span className="font-medium text-red-600">
                        ₩{product.currentPrice}/{product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">최소 입찰 단위:</span>
                      <span className="font-medium text-gray-900">₩500</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-800">
                      입찰 금액 (원/{product.unit})
                    </label>
                    <Input
                      id="bidAmount"
                      type="text"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="입찰 금액을 입력하세요"
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">입찰 전 주의사항</p>
                        <ul className="mt-1 list-inside list-disc space-y-1 text-xs">
                          <li>입찰 참여 시 취소가 불가능합니다.</li>
                          <li>현재 최고가보다 높은 금액만 입찰 가능합니다.</li>
                          <li>낙찰 시 7일 이내에 결제를 완료해야 합니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setBidModalOpen(false)} className="bg-white">
                    취소
                  </Button>
                  <Button
                    onClick={submitBid}
                    disabled={
                      !bidAmount ||
                      Number(bidAmount.replace(/,/g, "")) <= Number(product.currentPrice.replace(/,/g, ""))
                    }
                    className="bg-[#F95700] hover:bg-[#E04E00] text-white"
                  >
                    입찰하기
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">입찰이 완료되었습니다</h3>
                <p className="mb-4 text-sm text-gray-700">입찰 내역은 마이페이지에서 확인하실 수 있습니다.</p>
                <div className="rounded-md bg-gray-50 p-3 text-left text-sm">
                  <p className="font-medium text-gray-900">입찰 정보</p>
                  <p className="mt-1 text-gray-800">상품: {product.name}</p>
                  <p className="text-gray-800">
                    입찰 금액: ₩{bidAmount}/{product.unit}
                  </p>
                  <p className="text-gray-800">입찰 시간: {new Date().toLocaleString("ko-KR")}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
