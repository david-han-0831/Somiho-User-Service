"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Grid, List, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

export default function ProductsPage() {
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [tradeType, setTradeType] = useState<"all" | "fixed" | "auction">("all")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("latest")

  // 김 종류 옵션
  const productTypes = [
    { id: "traditional", name: "재래김" },
    { id: "green", name: "파래김" },
    { id: "sushi", name: "김밥김" },
    { id: "intestine", name: "곱창김" },
    { id: "stone", name: "돌김" },
    { id: "dried", name: "자반김" },
    { id: "roasted", name: "화입김" },
  ]

  // 산지 옵션
  const origins = [
    { id: "korea", name: "한국" },
    { id: "china", name: "중국" },
  ]

  // 규격 옵션
  const sizes = [
    { id: "19x21", name: "19×21" },
    { id: "19x27", name: "19×27" },
    { id: "21x21", name: "21×21" },
  ]

  // 중량 옵션
  const weights = [
    { id: "230g", name: "230g" },
    { id: "260g", name: "260g" },
    { id: "280g", name: "280g" },
    { id: "300g", name: "300g" },
    { id: "320g", name: "320g" },
    { id: "6kg", name: "6kg" },
    { id: "7kg", name: "7kg" },
  ]

  // 등급 옵션
  const grades = [
    { id: "A+", name: "A+", stars: 5 },
    { id: "A", name: "A", stars: 4 },
    { id: "B+", name: "B+", stars: 3 },
    { id: "B", name: "B", stars: 2 },
    { id: "C", name: "C", stars: 1 },
  ]

  // 필터 토글 함수
  const toggleFilter = (id: string, type: "type" | "origin" | "size" | "weight" | "grade") => {
    switch (type) {
      case "type":
        setSelectedTypes((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        break
      case "origin":
        setSelectedOrigins((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        break
      case "size":
        setSelectedSizes((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        break
      case "weight":
        setSelectedWeights((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        break
      case "grade":
        setSelectedGrades((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
        break
    }
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("")
    setTradeType("all")
    setSelectedTypes([])
    setSelectedOrigins([])
    setSelectedSizes([])
    setSelectedWeights([])
    setSelectedGrades([])
    setSortOption("latest")
  }

  // Mock data for demonstration
  const products = [
    {
      id: 1,
      name: "완도 특상품 김",
      type: "재래김",
      origin: "한국",
      size: "19×27",
      weight: "220g",
      grade: "A+",
      price: "15,000",
      unit: "속",
      stock: 260,
      year: "2025",
      image: "/product_img/product_1.jpg",
      isAuction: false,
    },
    {
      id: 2,
      name: "고흥 일반 김",
      type: "파래김",
      origin: "한국",
      size: "19×27",
      weight: "200g",
      grade: "A",
      price: "12,000",
      unit: "속",
      stock: 180,
      year: "2025",
      image: "/product_img/product_2.jpg",
      isAuction: false,
    },
    {
      id: 3,
      name: "서천 특상품 김",
      type: "김밥김",
      origin: "한국",
      size: "19×21",
      weight: "220g",
      grade: "A+",
      price: "14,500",
      unit: "속",
      stock: 150,
      year: "2025",
      image: "/product_img/product_3.jpg",
      isAuction: true,
      auctionEndTime: "2025-05-19 00:00",
    },
    {
      id: 4,
      name: "신안 특상품 김",
      type: "곱창김",
      origin: "한국",
      size: "19×27",
      weight: "250g",
      grade: "B+",
      price: "13,000",
      unit: "속",
      stock: 200,
      year: "2025",
      image: "/product_img/product_4.jpg",
      isAuction: false,
    },
    {
      id: 5,
      name: "부산 프리미엄 김",
      type: "돌김",
      origin: "한국",
      size: "21×21",
      weight: "230g",
      grade: "A+",
      price: "16,500",
      unit: "속",
      stock: 120,
      year: "2025",
      image: "/product_img/product_5.jpg",
      isAuction: true,
      auctionEndTime: "2025-06-10 00:00",
    },
    {
      id: 6,
      name: "해남 고급 김",
      type: "자반김",
      origin: "한국",
      size: "19×27",
      weight: "280g",
      grade: "A",
      price: "14,000",
      unit: "속",
      stock: 180,
      year: "2025",
      image: "/product_img/product_1.jpg",
      isAuction: false,
    },
    {
      id: 7,
      name: "청도 프리미엄 김",
      type: "재래김",
      origin: "중국",
      size: "19×27",
      weight: "6kg",
      grade: "B+",
      price: "11,000",
      unit: "속",
      stock: 90,
      year: "2025",
      image: "/product_img/product_2.jpg",
      isAuction: true,
      auctionEndTime: "2025-05-25 00:00",
    },
    {
      id: 8,
      name: "상해 특선 김",
      type: "화입김",
      origin: "중국",
      size: "19×27",
      weight: "7kg",
      grade: "A",
      price: "12,500",
      unit: "속",
      stock: 110,
      year: "2025",
      image: "/product_img/product_3.jpg",
      isAuction: false,
    },
    {
      id: 9,
      name: "웨이하이 프리미엄 김",
      type: "김밥김",
      origin: "중국",
      size: "19×21",
      weight: "6kg",
      grade: "A+",
      price: "13,500",
      unit: "속",
      stock: 85,
      year: "2025",
      image: "/product_img/product_4.jpg",
      isAuction: true,
      auctionEndTime: "2025-06-15 00:00",
    },
  ]

  // 필터링된 상품 목록
  const filteredProducts = products.filter((product) => {
    // 검색어 필터링
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // 거래 방식 필터링
    if (tradeType === "auction" && !product.isAuction) return false
    if (tradeType === "fixed" && product.isAuction) return false

    // 김 종류 필터링
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false

    // 산지 필터링
    if (selectedOrigins.length > 0 && !selectedOrigins.includes(product.origin)) return false

    // 규격 필터링
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) return false

    // 중량 필터링
    if (selectedWeights.length > 0 && !selectedWeights.includes(product.weight)) return false

    // 등급 필터링
    if (selectedGrades.length > 0 && !selectedGrades.includes(product.grade)) return false

    return true
  })

  // 정렬된 상품 목록
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return Number.parseInt(a.price.replace(/,/g, "")) - Number.parseInt(b.price.replace(/,/g, ""))
      case "priceDesc":
        return Number.parseInt(b.price.replace(/,/g, "")) - Number.parseInt(a.price.replace(/,/g, ""))
      case "gradeDesc":
        const gradeOrder: { [key: string]: number } = { "A+": 5, A: 4, "B+": 3, B: 2, C: 1 }
        return gradeOrder[b.grade] - gradeOrder[a.grade]
      case "latest":
      default:
        return b.id - a.id
    }
  })

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
          <span className="text-gray-700">상품검색</span>
        </div>

        <h1 className="mb-6 text-3xl font-bold">김 제품 목록</h1>

        {/* 검색창 */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="제품명, 지역, 종류 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-12 pr-4 text-base"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* 필터 영역 */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">필터</h2>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>

          {/* 거래방식 필터 */}
          <div className="mb-6">
            <h3 className="mb-3 font-medium">거래방식</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={tradeType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setTradeType("all")}
                className={tradeType === "all" ? "bg-[#F95700]" : ""}
              >
                전체
              </Button>
              <Button
                variant={tradeType === "fixed" ? "default" : "outline"}
                size="sm"
                onClick={() => setTradeType("fixed")}
                className={tradeType === "fixed" ? "bg-[#F95700]" : ""}
              >
                정가거래
              </Button>
              <Button
                variant={tradeType === "auction" ? "default" : "outline"}
                size="sm"
                onClick={() => setTradeType("auction")}
                className={tradeType === "auction" ? "bg-[#F95700]" : ""}
              >
                입찰거래
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 김 종류 필터 */}
            <div>
              <h3 className="mb-3 font-medium">김 종류</h3>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedTypes.includes(type.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(type.name, "type")}
                    className={selectedTypes.includes(type.name) ? "bg-[#F95700]" : ""}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 산지 필터 */}
            <div>
              <h3 className="mb-3 font-medium">산지</h3>
              <div className="flex flex-wrap gap-2">
                {origins.map((origin) => (
                  <Button
                    key={origin.id}
                    variant={selectedOrigins.includes(origin.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(origin.name, "origin")}
                    className={selectedOrigins.includes(origin.name) ? "bg-[#F95700]" : ""}
                  >
                    {origin.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 규격 필터 */}
            <div>
              <h3 className="mb-3 font-medium">규격</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={selectedSizes.includes(size.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(size.name, "size")}
                    className={selectedSizes.includes(size.name) ? "bg-[#F95700]" : ""}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 중량 필터 */}
            <div>
              <h3 className="mb-3 font-medium">중량</h3>
              <div className="flex flex-wrap gap-2">
                {weights.map((weight) => (
                  <Button
                    key={weight.id}
                    variant={selectedWeights.includes(weight.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(weight.name, "weight")}
                    className={selectedWeights.includes(weight.name) ? "bg-[#F95700]" : ""}
                  >
                    {weight.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 등급 필터 */}
            <div>
              <h3 className="mb-3 font-medium">등급</h3>
              <div className="flex flex-wrap gap-4">
                {grades.map((grade) => (
                  <button
                    key={grade.id}
                    className={`flex items-center gap-1 rounded-md border p-2 ${
                      selectedGrades.includes(grade.id) ? "border-[#F95700] bg-orange-50" : "border-gray-200"
                    }`}
                    onClick={() => toggleFilter(grade.id, "grade")}
                  >
                    <StarRating grade={grade.id} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 정렬 및 뷰 옵션 */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">총 {sortedProducts.length}개 상품</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">정렬:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="priceAsc">가격 낮은순</SelectItem>
                  <SelectItem value="priceDesc">가격 높은순</SelectItem>
                  <SelectItem value="gradeDesc">등급순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`rounded-md p-1 ${viewMode === "grid" ? "bg-gray-200" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="그리드 보기"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                className={`rounded-md p-1 ${viewMode === "list" ? "bg-gray-200" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="리스트 보기"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 상품 목록 - 그리드 뷰 */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute right-2 top-2">
                    <Badge
                      className={`${
                        product.isAuction ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {product.isAuction ? "입찰거래" : "정가거래"}
                    </Badge>
                  </div>
                  {product.isAuction && (
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-80 p-2 text-center text-xs font-medium text-white">
                      예약판매 마감: {product.auctionEndTime}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <StarRating grade={product.grade} size={14} />
                  </div>
                  <div className="mb-3 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-x-2">
                      <span>종류: {product.type}</span>
                      <span>•</span>
                      <span>산지: {product.origin}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <span>규격: {product.size}</span>
                      <span>•</span>
                      <span>중량: {product.weight}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-lg font-bold text-[#F95700]">
                      ₩{product.price}/{product.unit}
                    </span>
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
            ))}
          </div>
        )}

        {/* 상품 목록 - 리스트 뷰 */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white sm:flex-row"
              >
                <div className="relative h-48 w-full sm:h-auto sm:w-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute right-2 top-2">
                    <Badge
                      className={`${
                        product.isAuction ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {product.isAuction ? "입찰거래" : "정가거래"}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="mt-1 flex items-center">
                        <StarRating grade={product.grade} size={14} />
                      </div>
                    </div>
                    <span className="text-lg font-bold text-[#F95700]">
                      ₩{product.price}/{product.unit}
                    </span>
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div>종류: {product.type}</div>
                      <div>산지: {product.origin}</div>
                      <div>규격: {product.size}</div>
                      <div>중량: {product.weight}</div>
                      <div>생산년도: {product.year}</div>
                    </div>
                  </div>
                  {product.isAuction && (
                    <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
                      예약판매 마감: {product.auctionEndTime}
                    </div>
                  )}
                  <div className="mt-auto">
                    <Link
                      href={product.isAuction ? `/products/${product.id}/auction` : `/products/${product.id}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-[#F95700] hover:bg-[#E04E00]">
                        {product.isAuction ? "입찰 참여" : "거래하기"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="default" size="sm" className="bg-[#F95700]">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              다음
            </Button>
          </nav>
        </div>
      </main>

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
              <p className="mb-2 text-sm">경기도 이천시 신둔면 원적로 512번길 202</p>
              <p className="mb-2 text-sm">202, Wonjeok-ro 512beon-gil, Sindun-myeon, Icheon-si, Gyeonggi-do, Korea, Zip. 17300</p>
              <p className="mb-2 text-sm">Email: kwon@somiho.kr</p>
              <p className="text-sm">Tel: +82 70-4833-7310</p>
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
