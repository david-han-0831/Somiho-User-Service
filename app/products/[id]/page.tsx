"use client"

// import type React from "react"
import * as React from "react"
import { use } from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const unwrappedParams = React.use(params as any) as { id: string }
  const productId = Number.parseInt(unwrappedParams.id)
  // 상태 관리 부분에 단계 관리를 위한 상태 추가
  const [quantity, setQuantity] = useState(10) // 최소 주문 수량
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // 테스트를 위해 true로 변경
  const [orderStep, setOrderStep] = useState(1) // 주문 단계: 1=정보확인, 2=배송정보, 3=결제방법, 4=완료
  const [paymentMethod, setPaymentMethod] = useState("bank") // 결제 방법
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  })

  // Mock data - 실제로는 API에서 가져와야 함
  const product = {
    id: productId,
    name: "완도 특상품 김",
    type: "재래김",
    origin: "한국",
    originDetail: "완도",
    size: "19×27",
    weight: "220g",
    grade: "A+",
    price: "15,000",
    unit: "kg",
    stock: 260,
    code: "20250323-001",
    year: "2025",
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
      "/underwater-seaweed.png",
      "/placeholder.svg?key=mo5wk",
      "/placeholder.svg?key=zuyua",
      "/placeholder.svg?key=5m3nz",
    ],
    isAuction: false,
  }

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity > product.minOrderQuantity) {
      setQuantity((prev) => prev - 1)
    }
  }

  // 거래 요청 처리 함수 수정
  const handlePurchaseRequest = () => {
    if (!isLoggedIn) {
      // 로그인 페이지로 리다이렉트
      router.push("/login?redirect=" + encodeURIComponent(`/products/${productId}`))
      return
    }

    // 거래 요청 모달 표시 및 단계 초기화
    setOrderStep(1)
    setConfirmModalOpen(true)
  }

  // 다음 단계로 이동
  const nextStep = () => {
    setOrderStep((prev) => prev + 1)
  }

  // 이전 단계로 이동
  const prevStep = () => {
    setOrderStep((prev) => Math.max(1, prev - 1))
  }

  // 배송 정보 변경 핸들러
  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 결제 방법 변경 핸들러
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  // 거래 요청 확인 함수 수정
  const confirmPurchase = () => {
    // 실제로는 API 호출이 필요함
    console.log(`구매 요청: 상품 ID ${productId}, 수량 ${quantity}`)
    console.log("배송 정보:", deliveryInfo)
    console.log("결제 방법:", paymentMethod)

    // 모달 닫기 및 상태 초기화
    setConfirmModalOpen(false)
    setOrderStep(1)

    // 성공 메시지 표시 후 마이페이지로 이동
    alert("구매 요청이 접수되었습니다. 마이페이지에서 확인 가능합니다.")
    router.push("/my/reservations")
  }

  // 모달 닫기 시 상태 초기화
  const handleModalClose = (open: boolean) => {
    setConfirmModalOpen(open)
    if (!open) {
      setOrderStep(1)
    }
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
      unit: "kg",
      image: "/placeholder.svg?key=tsmht",
    },
    {
      id: 3,
      name: "서천 특상품 김",
      type: "김밥김",
      origin: "한국",
      originDetail: "서천",
      grade: "A+",
      price: "14,500",
      unit: "kg",
      image: "/placeholder.svg?key=lkbra",
    },
    {
      id: 4,
      name: "신안 특상품 김",
      type: "곱창김",
      origin: "한국",
      originDetail: "신안",
      grade: "B+",
      price: "13,000",
      unit: "kg",
      image: "/placeholder.svg?key=sy6bn",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
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
              </select>
            </div>
            <Link href="/signup">
              <Button size="sm">회원가입</Button>
            </Link>
          </div>
        </div>
      </header>

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
              <Badge className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600">정가거래</Badge>
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
                <Badge className="bg-blue-500 hover:bg-blue-600">정가거래</Badge>
                <span className="text-sm text-gray-500">상품코드: {product.code}</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <StarRating grade={product.grade} size={20} />
                {/* <span className="text-sm text-gray-500">({product.grade})</span> */}
              </div>
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
                    {product.originDetail} ({product.origin})
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
                  <p className="text-sm text-gray-500">제조사</p>
                  <p className="font-medium">{product.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">생산년도</p>
                  <p className="font-medium">{product.year}</p>
                </div>
              </div>

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">단가</span>
                  {isLoggedIn ? (
                    <span className="text-2xl font-bold text-[#F95700]">
                      ₩{product.price}/{product.unit}
                    </span>
                  ) : (
                    <div className="rounded-md bg-gray-100 px-3 py-2 text-center text-sm">
                      <span className="text-gray-500">회원 전용 가격</span>
                      <Link href="/login" className="ml-2 text-[#F95700] hover:underline">
                        로그인
                      </Link>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  최소 주문 수량: {product.minOrderQuantity} {product.tradeUnit}
                </div>
              </div>

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-4">
                  <label htmlFor="quantity" className="mb-2 block font-medium">
                    수량 ({product.tradeUnit})
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= product.minOrderQuantity}
                      className="h-10 w-10 rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value)
                        if (value >= product.minOrderQuantity) {
                          setQuantity(value)
                        }
                      }}
                      className="h-10 rounded-none border-x-0 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      className="h-10 w-10 rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">총 금액</span>
                    {isLoggedIn ? (
                      <span className="text-xl font-bold text-[#F95700]">
                        ₩{(Number.parseInt(product.price.replace(/,/g, "")) * quantity).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">로그인 후 확인 가능</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="flex-1 bg-[#F95700] hover:bg-[#E04E00]"
                    onClick={handlePurchaseRequest}
                  >
                    {product.isAuction ? "입찰 참여하기" : "거래 요청하기"}
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    샘플 요청
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 탭 */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                상품 설명
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                제품 사양
              </TabsTrigger>
              <TabsTrigger
                value="quality"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                품질 정보
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                배송/거래 조건
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">상품 설명</h2>
                <p className="mb-6 text-gray-700">{product.description}</p>

                <h3 className="mb-3 font-medium">특징</h3>
                <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <div className="rounded-md bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">등급 정보</h3>
                  <p className="text-sm text-gray-600">{product.gradeInfo}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">제품 사양</h2>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">규격</th>
                        <td className="px-4 py-3">{product.size}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">중량</th>
                        <td className="px-4 py-3">{product.weight}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">포장 단위</th>
                        <td className="px-4 py-3">{product.packageUnit}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">거래 단위</th>
                        <td className="px-4 py-3">{product.tradeUnit}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">최소 구매</th>
                        <td className="px-4 py-3">
                          {product.minOrderQuantity} {product.tradeUnit} 이상
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">유통기한</th>
                        <td className="px-4 py-3">{product.shelfLife}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="quality" className="pt-6">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">품질 정보</h2>
                <p className="mb-6 text-gray-700">{product.qualityInfo}</p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-medium">품질 등급</h3>
                    <div className="mb-2 flex items-center">
                      <StarRating grade={product.grade} size={20} showText />
                    </div>
                    <p className="text-sm text-gray-600">{product.gradeInfo}</p>
                  </div>
                  <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-medium">품질 인증</h3>
                    <p className="text-sm text-gray-600">HACCP 인증, 식품안전관리인증</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="pt-6">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">배송 안내</h2>
                <p className="mb-6 text-gray-700">{product.deliveryInfo}</p>

                <h2 className="mb-4 text-xl font-semibold">거래 조건</h2>
                <p className="mb-6 text-gray-700">{product.tradeConditions}</p>

                <div className="rounded-md bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">주의사항</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    <li>거래 요청 후 담당자 확인 과정이 있습니다.</li>
                    <li>대량 구매 시 별도 협의가 필요할 수 있습니다.</li>
                    <li>결제 완료 후 배송이 시작됩니다.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 추천 상품 */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">유사한 상품</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {similarProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-semibold">{product.name}</h3>
                    <div className="mb-2 flex items-center">
                      <StarRating grade={product.grade} size={14} />
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>
                        {product.type} | {product.originDetail}
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

      {/* 거래 요청 확인 모달 */}
      <Dialog open={confirmModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-md">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">거래 요청</h2>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span className={orderStep >= 1 ? "text-[#F95700] font-medium" : ""}>정보확인</span>
                <span>→</span>
                <span className={orderStep >= 2 ? "text-[#F95700] font-medium" : ""}>배송정보</span>
                <span>→</span>
                <span className={orderStep >= 3 ? "text-[#F95700] font-medium" : ""}>결제방법</span>
                <span>→</span>
                <span className={orderStep >= 4 ? "text-[#F95700] font-medium" : ""}>완료</span>
              </div>
            </div>

            {/* 단계 1: 주문 정보 확인 */}
            {orderStep === 1 && (
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
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.type} | {product.originDetail}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">단가:</span>
                      <span className="font-medium">
                        ₩{product.price}/{product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수량:</span>
                      <span className="font-medium">
                        {quantity} {product.tradeUnit}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2">
                      <span className="font-medium">총 금액:</span>
                      <span className="font-bold text-[#F95700]">
                        ₩{(Number.parseInt(product.price.replace(/,/g, "")) * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="mb-2 font-medium">거래 조건</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    <li>
                      최소 주문 수량: {product.minOrderQuantity} {product.tradeUnit}
                    </li>
                    <li>배송: 국내 배송 3-5일 소요</li>
                    <li>결제: 선입금 결제</li>
                  </ul>
                </div>
              </>
            )}

            {/* 단계 2: 배송 정보 입력 */}
            {orderStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    수령인 이름
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={deliveryInfo.name}
                    onChange={handleDeliveryInfoChange}
                    placeholder="수령인 이름을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    연락처
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={deliveryInfo.phone}
                    onChange={handleDeliveryInfoChange}
                    placeholder="연락 가능한 전화번호를 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    배송지 주소
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryInfoChange}
                    placeholder="배송지 주소를 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    배송 메시지
                  </label>
                  <Input
                    id="message"
                    name="message"
                    value={deliveryInfo.message}
                    onChange={handleDeliveryInfoChange}
                    placeholder="배송 시 요청사항을 입력하세요"
                  />
                </div>
              </div>
            )}

            {/* 단계 3: 결제 방법 선택 */}
            {orderStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium">결제 방법 선택</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => handlePaymentMethodChange("bank")}
                      className="h-4 w-4 text-[#F95700]"
                    />
                    <label htmlFor="bank" className="text-sm">
                      무통장 입금
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                      className="h-4 w-4 text-[#F95700]"
                    />
                    <label htmlFor="card" className="text-sm">
                      신용카드
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="vbank"
                      name="paymentMethod"
                      value="vbank"
                      checked={paymentMethod === "vbank"}
                      onChange={() => handlePaymentMethodChange("vbank")}
                      className="h-4 w-4 text-[#F95700]"
                    />
                    <label htmlFor="vbank" className="text-sm">
                      가상계좌
                    </label>
                  </div>
                </div>

                {paymentMethod === "bank" && (
                  <div className="rounded-md bg-gray-50 p-3 text-sm">
                    <p className="font-medium">무통장 입금 안내</p>
                    <p className="mt-1">은행명: 농협은행</p>
                    <p>계좌번호: 123-456-7890</p>
                    <p>예금주: (주)김 국제거래소</p>
                    <p className="mt-2 text-xs text-gray-500">* 입금 후 담당자에게 연락 부탁드립니다. (02-123-4567)</p>
                  </div>
                )}
              </div>
            )}

            {/* 단계 4: 주문 완료 */}
            {orderStep === 4 && (
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
                <h3 className="mb-2 text-lg font-medium">주문이 완료되었습니다</h3>
                <p className="mb-4 text-sm text-gray-600">주문 내역은 마이페이지에서 확인하실 수 있습니다.</p>
                <div className="rounded-md bg-gray-50 p-3 text-left text-sm">
                  <p className="font-medium">주문 정보</p>
                  <p className="mt-1">상품: {product.name}</p>
                  <p>
                    수량: {quantity} {product.tradeUnit}
                  </p>
                  <p>총 금액: ₩{(Number.parseInt(product.price.replace(/,/g, "")) * quantity).toLocaleString()}</p>
                  <p>
                    결제 방법:{" "}
                    {paymentMethod === "bank" ? "무통장 입금" : paymentMethod === "card" ? "신용카드" : "가상계좌"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {orderStep > 1 && orderStep < 4 ? (
              <Button variant="outline" onClick={prevStep}>
                이전
              </Button>
            ) : (
              <div></div>
            )}

            {orderStep < 4 ? (
              <Button
                onClick={orderStep === 3 ? confirmPurchase : nextStep}
                disabled={orderStep === 2 && (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address)}
              >
                {orderStep === 3 ? "주문하기" : "다음"}
              </Button>
            ) : (
              <Button onClick={() => router.push("/my/reservations")}>주문 내역 확인</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
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
              <p className="mb-2 text-sm">서울특별시 강남구 테헤란로 123</p>
              <p className="mb-2 text-sm">이메일: info@seaweed-exchange.com</p>
              <p className="text-sm">전화: 02-123-4567</p>
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
