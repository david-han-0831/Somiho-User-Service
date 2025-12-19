"use client"

// import type React from "react"
import * as React from "react"
import { use } from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LuxStarTable from "@/components/LuxStarTable"
import { productsApi } from "@/lib/api"
import { getProductImages } from "@/lib/utils/storage"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const productId = unwrappedParams.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [productImages, setProductImages] = useState<string[]>([])
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]) // 유사한 상품 목록
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

  // 상품 데이터 조회
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.getProduct(productId)
        if (response.success && response.data) {
          setProduct(response.data)
          
          // 일반 이미지 목록 가져오기
          const imagesResult = await getProductImages(productId)
          if (imagesResult.success && imagesResult.urls) {
            setProductImages(imagesResult.urls)
          }

          // 유사한 상품 목록 가져오기 (같은 종류 또는 같은 원산지, 현재 상품 제외)
          const similarResponse = await productsApi.getProducts({
            is_active: true,
            sort_by: "created_at",
            sort_order: "desc",
            per_page: 5, // 최대 5개 가져오기
          })

          if (similarResponse.success && similarResponse.data) {
            // 현재 상품과 같은 종류(type)이거나 같은 원산지(origin)인 상품 필터링
            const filtered = similarResponse.data
              .filter((p) => {
                // 현재 상품 제외
                if (p.id === response.data.id) return false
                // 같은 종류 또는 같은 원산지
                return (
                  (response.data.type && p.type === response.data.type) ||
                  (response.data.origin && p.origin === response.data.origin)
                )
              })
              .slice(0, 4) // 최대 4개만 표시

            setSimilarProducts(filtered)
          }
        } else {
          router.push("/products")
        }
      } catch (error) {
        console.error("상품 조회 오류:", error)
        router.push("/products")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">상품 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">상품을 찾을 수 없습니다.</p>
            <Button onClick={() => router.push("/products")} className="mt-4">
              상품 목록으로 돌아가기
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // 제공 가능 서류 목록
  const availableDocuments = (product.available_documents as string[]) || []

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity > 1) {
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
            {/* 메인 이미지 (썸네일 또는 첫 번째 일반 이미지) */}
            <div
              className="relative aspect-square overflow-hidden rounded-lg border bg-white"
              onClick={() => {
                if (product.thumbnail_url || productImages.length > 0) {
                  setImageModalOpen(true)
                }
              }}
            >
              <Image
                src={product.thumbnail_url || productImages[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover cursor-pointer"
              />
              <Badge className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600">정가거래</Badge>
            </div>
            
            {/* 썸네일 이미지 목록 (썸네일 + 일반 이미지) */}
            {(product.thumbnail_url || productImages.length > 0) && (
              <div className="grid grid-cols-4 gap-2">
                {product.thumbnail_url && (
                  <div
                    className={`relative aspect-square overflow-hidden rounded-lg border ${
                      selectedImage === 0 ? "border-[#F95700] border-2" : "border-gray-200"
                    } bg-white cursor-pointer`}
                    onClick={() => setSelectedImage(0)}
                  >
                    <Image
                      src={product.thumbnail_url}
                      alt={`${product.name} 썸네일`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {productImages.map((image, index) => {
                  const imageIndex = (product.thumbnail_url ? 1 : 0) + index
                  return (
                    <div
                      key={index}
                      className={`relative aspect-square overflow-hidden rounded-lg border ${
                        selectedImage === imageIndex ? "border-[#F95700] border-2" : "border-gray-200"
                      } bg-white cursor-pointer`}
                      onClick={() => setSelectedImage(imageIndex)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                })}
              </div>
            )}
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
                  <p className="font-medium">{product.type || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">산지</p>
                  <p className="font-medium">
                    {product.origin_detail ? `${product.origin_detail} (${product.origin})` : product.origin}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">규격</p>
                  <p className="font-medium">{product.size || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">중량</p>
                  <p className="font-medium">{product.weight || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">입수량</p>
                  <p className="font-medium">{product.quantity ? `${product.quantity}개` : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">생산년도</p>
                  <p className="font-medium">{product.production_year || "-"}</p>
                </div>
              </div>

              {/* 제공 가능 서류 섹션 */}
              {availableDocuments.length > 0 && (
                <div className="mb-6 border-t border-gray-100 pt-6">
                  <h3 className="mb-4 font-medium text-gray-900">제공 가능 서류</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {availableDocuments.map((doc) => (
                      <div key={doc} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                        <div className="flex items-center space-x-2">
                          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">{doc}</span>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">무료</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">단가</span>
                  {isLoggedIn ? (
                    <span className="text-2xl font-bold text-[#F95700]">
                      ₩{typeof product.price === 'number' ? product.price.toLocaleString('ko-KR') : product.price}원
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
                {/* <div className="text-sm text-gray-500">
                  최소 주문 수량: {product.minOrderQuantity} {product.tradeUnit}
                </div> */}
              </div>

              <div className="mb-6 border-t border-gray-100 pt-6">
                {/* <div className="mb-4">
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
                </div> */}

                {/* <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">총 금액</span>
                    {isLoggedIn ? (
                      <span className="text-xl font-bold text-[#F95700]">
                        ₩{((typeof product.price === 'number' ? product.price : Number(product.price.toString().replace(/,/g, ""))) * quantity).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">로그인 후 확인 가능</span>
                    )}
                  </div>
                </div> */}

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    className="flex-1 bg-[#F95700] hover:bg-[#E04E00]"
                    onClick={handlePurchaseRequest}
                  >
                    장바구니 담기
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    샘플 요청
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  *샘플 배송기간도중 해당 Lot가 다른거래처에 판매 되어질 수 있으며 샘플비용은 반환 되지 않습니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 탭 */}
        <div className="mt-12">
          
          <LuxStarTable className="w-full" />
          <hr className="border-t border-gray-200 mt-8" />
        </div>

        {/* 추천 상품 */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">유사한 상품</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {similarProducts.map((similarProduct) => (
                <Link key={similarProduct.id} href={`/products/${similarProduct.id}`}>
                  <div className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={similarProduct.thumbnail_url || "/placeholder.svg"}
                        alt={similarProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold">{similarProduct.name}</h3>
                      <div className="mb-2 flex items-center">
                        <StarRating grade={similarProduct.grade || 0} size={14} />
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>
                          {similarProduct.type || ""}
                          {similarProduct.quantity && ` | 입수량: ${similarProduct.quantity}개`}
                        </span>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-lg font-bold text-[#F95700]">
                          ₩{similarProduct.price?.toLocaleString("ko-KR") || "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
            {(() => {
              const allImages = product.thumbnail_url 
                ? [product.thumbnail_url, ...productImages]
                : productImages
              const currentImage = allImages[selectedImage] || "/placeholder.svg"
              return (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              )
            })()}
          </div>
          <div className="flex items-center justify-between border-t border-white/20 p-4">
            {(() => {
              const allImages = product.thumbnail_url 
                ? [product.thumbnail_url, ...productImages]
                : productImages
              return (
                <>
                  <button
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-50"
                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                    disabled={selectedImage === 0}
                  >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                  </button>
                  <span className="text-white">
                    {selectedImage + 1} / {allImages.length}
                  </span>
                  <button
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-50"
                    onClick={() => setSelectedImage(Math.min(allImages.length - 1, selectedImage + 1))}
                    disabled={selectedImage === allImages.length - 1}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )
            })()}
          </div>
        </DialogContent>
      </Dialog>

      {/* 거래 요청 확인 모달 */}
      <Dialog open={confirmModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-md bg-white dark:bg-white border-gray-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">장바구니 담기</DialogTitle>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span className={orderStep >= 1 ? "text-[#F95700] font-medium" : ""}>정보확인</span>
              <span>→</span>
              <span className={orderStep >= 2 ? "text-[#F95700] font-medium" : ""}>배송정보</span>
              <span>→</span>
              <span className={orderStep >= 3 ? "text-[#F95700] font-medium" : ""}>결제방법</span>
              <span>→</span>
              <span className={orderStep >= 4 ? "text-[#F95700] font-medium" : ""}>완료</span>
            </div>
          </DialogHeader>

          <div className="mb-6">
            {/* 단계 1: 주문 정보 확인 */}
            {orderStep === 1 && (
              <>
                <div className="mb-4 rounded-lg border bg-white p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={product.thumbnail_url || productImages[0] || "/placeholder.svg"}
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
                      <span className="text-gray-700">단가:</span>
                      <span className="font-medium text-gray-900">
                        ₩{product.price}/{product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">수량:</span>
                      <span className="font-medium text-gray-900">
                        {quantity} {product.tradeUnit}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2">
                      <span className="font-medium text-gray-800">총 금액:</span>
                      <span className="font-bold text-[#F95700]">
                        ₩{((typeof product.price === 'number' ? product.price : Number(product.price.toString().replace(/,/g, ""))) * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="mb-2 font-medium text-gray-900">거래 조건</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800">
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
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
                  <label htmlFor="address" className="block text-sm font-medium text-gray-800">
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800">
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
                <h3 className="font-medium text-gray-900">결제 방법 선택</h3>
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
                    <label htmlFor="bank" className="text-sm text-gray-800">
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
                    <label htmlFor="card" className="text-sm text-gray-800">
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
                    <label htmlFor="vbank" className="text-sm text-gray-800">
                      가상계좌
                    </label>
                  </div>
                </div>

                {paymentMethod === "bank" && (
                  <div className="rounded-md bg-gray-50 p-3 text-sm">
                    <p className="font-medium text-gray-900">무통장 입금 안내</p>
                    <p className="mt-1 text-gray-800">은행명: 농협은행</p>
                    <p className="text-gray-800">계좌번호: 123-456-7890</p>
                    <p className="text-gray-800">예금주: (주)김 국제거래소</p>
                    <p className="mt-2 text-xs text-gray-600">* 입금 후 담당자에게 연락 부탁드립니다. (02-123-4567)</p>
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
                <h3 className="mb-2 text-lg font-medium text-gray-900">주문이 완료되었습니다</h3>
                <p className="mb-4 text-sm text-gray-700">주문 내역은 마이페이지에서 확인하실 수 있습니다.</p>
                <div className="rounded-md bg-gray-50 p-3 text-left text-sm">
                  <p className="font-medium text-gray-900">주문 정보</p>
                  <p className="mt-1 text-gray-800">상품: {product.name}</p>
                  <p className="text-gray-800">
                    수량: {quantity} {product.tradeUnit}
                  </p>
                  <p className="text-gray-800">총 금액: ₩{(Number.parseInt(product.price.replace(/,/g, "")) * quantity).toLocaleString()}</p>
                  <p className="text-gray-800">
                    결제 방법:{" "}
                    {paymentMethod === "bank" ? "무통장 입금" : paymentMethod === "card" ? "신용카드" : "가상계좌"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {orderStep > 1 && orderStep < 4 ? (
              <Button variant="outline" onClick={prevStep} className="bg-white">
                이전
              </Button>
            ) : (
              <div></div>
            )}

            {orderStep < 4 ? (
              <Button
                onClick={orderStep === 3 ? confirmPurchase : nextStep}
                disabled={orderStep === 2 && (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address)}
                className="bg-[#F95700] hover:bg-[#E04E00] text-white"
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
      <Footer />
    </div>
  )
}
