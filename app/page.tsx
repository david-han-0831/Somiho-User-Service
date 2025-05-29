"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  // 배너 슬라이드 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0)
  const bannerImages = ["https://kafb2b.or.kr/data/atchFile/2025/03/07/bc9ce29ecec8b321999b4436bac6fd14.jpg", "https://kafb2b.or.kr/data/atchFile/2025/03/24/f75d649400a1373fed29286d0ec5fac3.jpg", "https://kafb2b.or.kr/data/atchFile/2025/03/17/f9400d5cd795b4846dec707782ac9fe0.jpg"]

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
    }, 5000) // 5초마다 슬라이드 변경

    return () => clearInterval(interval)
  }, [bannerImages.length])

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))
  }

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
  }

  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Mock data for demonstration
  const marketPrices = {
    koreaWet: {
      country: "한국",
      type: "물김",
      date: "2025.04.22",
      price: "33,000",
      change: "+1,500",
      isUp: true,
      trend: [30000, 30800, 30500, 31000, 32000, 31500, 33000],
    },
    chinaWet: {
      country: "중국",
      type: "물김",
      date: "2025.01.19",
      price: "54.21",
      change: "+0.36",
      isUp: true,
      trend: [28200, 28000, 28300, 28000, 29000, 29500, 28500],
    },
    koreaDry: {
      country: "한국",
      type: "마른김",
      date: "2025.04.22",
      price: "35,000",
      change: "+800",
      isUp: true,
      trend: [33500, 33800, 34000, 34500, 35000, 34200, 35000],
    },
    chinaDry: {
      country: "중국",
      type: "마른김",
      date: "2025.01.19",
      price: "58.32",
      change: "-0.28",
      isUp: false,
      trend: [59000, 58800, 58600, 58500, 58400, 58300, 58320],
    },
  }

  // 상품 데이터 구조 수정 - 일반 상품과 입찰 상품 통합
  const products = [
    // 재래김 상품
    {
      id: 1,
      name: "재래김 프리미엄",
      weight: "280g",
      size: "19×27cm",
      grade: "A+",
      price: "33,000",
      stock: 260,
      image: "/product_img/product_1.jpg",
      type: "재래김",
      isAuction: true,
      auctionEndTime: "2025-06-04 00:00",
    },
    {
      id: 2,
      name: "재래김 고급",
      weight: "280g",
      size: "19×27cm",
      grade: "A",
      price: "28,000",
      stock: 180,
      image: "/product_img/product_2.jpg",
      type: "재래김",
      isAuction: false,
    },
    // 파래김 상품
    {
      id: 3,
      name: "파래김 특선",
      weight: "260g",
      size: "19×27cm",
      grade: "A",
      price: "26,000",
      stock: 150,
      image: "/product_img/product_3.jpg",
      type: "파래김",
      isAuction: true,
      auctionEndTime: "2025-05-19 00:00",
    },
    {
      id: 4,
      name: "파래김 일반",
      weight: "250g",
      size: "19×27cm",
      grade: "B+",
      price: "22,000",
      stock: 200,
      image: "/product_img/product_4.jpg",
      type: "파래김",
      isAuction: false,
    },
    // 김밥김 상품
    {
      id: 5,
      name: "김밥김 프리미엄",
      weight: "230g",
      size: "19×21cm",
      grade: "A+",
      price: "30,000",
      stock: 120,
      image: "/product_img/product_5.jpg",
      type: "김밥김",
      isAuction: false,
    },
    {
      id: 6,
      name: "김밥김 특선",
      weight: "220g",
      size: "19×21cm",
      grade: "A",
      price: "25,000",
      stock: 180,
      image: "/product_img/product_1.jpg",
      type: "김밥김",
      isAuction: true,
      auctionEndTime: "2025-06-10 00:00",
    },
    // 곱창김 상품
    {
      id: 7,
      name: "곱창김 고급",
      weight: "300g",
      size: "19×27cm",
      grade: "B+",
      price: "27,000",
      stock: 90,
      image: "/product_img/product_2.jpg",
      type: "곱창김",
      isAuction: false,
    },
    {
      id: 8,
      name: "곱창김 프리미엄",
      weight: "270g",
      size: "19×27cm",
      grade: "A+",
      price: "32,000",
      stock: 70,
      image: "/product_img/product_3.jpg",
      type: "곱창김",
      isAuction: true,
      auctionEndTime: "2025-05-25 00:00",
    },
    // 돌김 상품
    {
      id: 9,
      name: "돌김 특선",
      weight: "260g",
      size: "19×27cm",
      grade: "A",
      price: "29,000",
      stock: 110,
      image: "/product_img/product_4.jpg",
      type: "돌김",
      isAuction: false,
    },
    {
      id: 10,
      name: "돌김 프리미엄",
      weight: "270g",
      size: "19×27cm",
      grade: "A+",
      price: "34,000",
      stock: 85,
      image: "/product_img/product_5.jpg",
      type: "돌김",
      isAuction: true,
      auctionEndTime: "2025-06-15 00:00",
    },
    // 자반김 상품
    {
      id: 11,
      name: "자반김 고급",
      weight: "280g",
      size: "19×27cm",
      grade: "B+",
      price: "24,000",
      stock: 130,
      image: "/product_img/product_1.jpg",
      type: "자반김",
      isAuction: false,
    },
    {
      id: 12,
      name: "자반김 특선",
      weight: "290g",
      size: "19×27cm",
      grade: "A",
      price: "28,000",
      stock: 95,
      image: "/product_img/product_2.jpg",
      type: "자반김",
      isAuction: true,
      auctionEndTime: "2025-05-30 00:00",
    },
  ]

  const news = [
    {
      id: 1,
      title: "2025년 김 수확 시즌 시작, 작황 양호",
      date: "2025.04.20",
      category: "뉴스",
    },
    {
      id: 2,
      title: "중국 김 수출량 전년 대비 15% 증가",
      date: "2025.04.18",
      category: "시장동향",
    },
    {
      id: 3,
      title: "김 품질 등급 기준 개정 안내",
      date: "2025.04.15",
      category: "공지",
    },
  ]

  // 간단한 미니 차트 렌더링 함수
  const renderTrendChart = (data: number[], isUp: boolean) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    return (
      <div className="flex h-4 items-end gap-[2px]">
        {data.map((value, index) => {
          const height = range === 0 ? "100%" : `${((value - min) / range) * 100}%`
          return (
            <div key={index} className={`w-1 rounded-t-sm ${isUp ? "bg-red-400" : "bg-blue-400"}`} style={{ height }} />
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - 슬라이드 배너 */}
        <section className="relative overflow-hidden bg-white py-6">
          <div className="container mx-auto px-4">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
              {/* 배너 슬라이더 */}
              <div className="relative h-full w-full">
                {bannerImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`배너 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                {/* 슬라이드 네비게이션 버튼 */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
                  aria-label="이전 슬라이드"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
                  aria-label="다음 슬라이드"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* 슬라이드 인디케이터 */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {bannerImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? "w-8 bg-[#F95700]" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`슬라이드 ${index + 1}로 이동`}
                      aria-current={index === currentSlide}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Price Section - Updated with 4 cards (Korea Wet, China Wet, Korea Dry, China Dry) */}
        <section className="bg-[#F9FAFB] py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">김 시세 요약</h2>
              <Link href="/market-price" className="flex items-center text-sm font-medium text-[#F95700]">
                전체 시세 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* 시세 정보 카드 4개 (한국 물김, 중국 물김, 한국 마른김, 중국 마른김) */}
            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* 세로 구분선 */}
              <div className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 bg-[#F95700] lg:block"></div>
              {Object.values(marketPrices).map((price) => (
                <Card key={`${price.country}-${price.type}`} className="bg-white shadow-sm hover:shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg font-bold">{price.country} {price.type}</CardTitle>
                      <span className="text-sm text-gray-500">{price.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold">
                          {price.country === "중국" 
                            ? `${price.price}위안` 
                            : `${price.price}원`}
                        </span>
                        <span className={`flex items-center text-sm ${price.isUp ? "text-red-500" : "text-blue-500"}`}>
                          {price.isUp ? "▲" : "▼"} {price.change}
                        </span>
                      </div>
                      <div className="flex h-10 w-24 items-end">{renderTrendChart(price.trend, price.isUp)}</div>
                    </div>
                    <div className="mt-4 rounded-md bg-gray-100 p-3 text-center">
                      <span className="text-sm text-gray-500">회원가입 시 시세 정보 열람 가능</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 상품 탭별 구분 섹션 - 신규 추가 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">상품 카테고리</h2>
              <Link href="/products" className="flex items-center text-sm font-medium text-[#F95700]">
                상품 전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="w-full flex-wrap justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  전체
                </TabsTrigger>
                <TabsTrigger
                  value="traditional"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  재래김
                </TabsTrigger>
                <TabsTrigger
                  value="green"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  파래김
                </TabsTrigger>
                <TabsTrigger
                  value="sushi"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  김밥김
                </TabsTrigger>
                <TabsTrigger
                  value="intestine"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  곱창김
                </TabsTrigger>
                <TabsTrigger
                  value="stone"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  돌김
                </TabsTrigger>
                <TabsTrigger
                  value="dried"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-[#F95700] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  자반김
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="traditional" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "재래김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="green" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "파래김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="sushi" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "김밥김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="intestine" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "곱창김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="stone" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "돌김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="dried" className="mt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter((p) => p.type === "자반김")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-[#F9FAFB] py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">김 정보 · 뉴스</h2>
              <Link href="/notice" className="flex items-center text-sm font-medium text-[#F95700]">
                전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <Link key={item.id} href={`/notice/${item.id}`}>
                  <div className="rounded-lg border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline">{item.category}</Badge>
                        <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// ProductCard 컴포넌트 - 재사용 가능한 상품 카드
function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden bg-white shadow-sm hover:shadow">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.isAuction && (
          <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-xs font-medium py-1 px-2 text-center">
            예약판매 마감: {product.auctionEndTime}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <StarRating grade={product.grade} size={14} />
        </div>
        <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
          <span>중량: {product.weight}</span>
          <span>•</span>
          <span>규격: {product.size}</span>
          <span>•</span>
          <span>재고: {product.stock}개</span>
        </div>
        <div className="rounded-md bg-gray-100 p-3 text-center">
          <span className="text-sm text-gray-500">회원가입 시 가격 확인 가능</span>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link
          href={product.isAuction ? `/products/${product.id}/auction` : `/products/${product.id}`}
          className="w-full"
        >
          <Button className="w-full bg-[#F95700] hover:bg-[#E04E00]">
            {product.isAuction ? "입찰 참여" : "거래하기"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
