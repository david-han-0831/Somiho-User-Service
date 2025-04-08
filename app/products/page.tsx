"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Search } from "lucide-react"

// Updated sample product data with more detailed information
const products = [
  {
    id: "20250323-001",
    name: "완도 특상품 김",
    type: "마른김",
    origin: "완도",
    specification: "100매(220g)",
    productionDate: "2025-01-15",
    year: 2025,
    grade: "A+",
    price: 15000,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-002",
    name: "고흥 일반 김",
    type: "조미김",
    origin: "고흥",
    specification: "80매(200g)",
    productionDate: "2025-01-20",
    year: 2025,
    grade: "A",
    price: 12000,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-003",
    name: "서천 특상품 김",
    type: "마른김",
    origin: "서천",
    specification: "100매(220g)",
    productionDate: "2025-01-10",
    year: 2025,
    grade: "A+",
    price: 14500,
    image: "/placeholder.svg?height=300&width=400",
    available: false,
  },
  {
    id: "20250323-004",
    name: "부산 일반 김",
    type: "조미김",
    origin: "부산",
    specification: "50매(120g)",
    productionDate: "2025-02-05",
    year: 2025,
    grade: "B+",
    price: 10000,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-005",
    name: "진도 특상품 김",
    type: "파래김",
    origin: "진도",
    specification: "100매(220g)",
    productionDate: "2025-01-25",
    year: 2025,
    grade: "A",
    price: 13000,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-006",
    name: "해남 일반 김",
    type: "돌김",
    origin: "해남",
    specification: "60매(150g)",
    productionDate: "2024-12-10",
    year: 2024,
    grade: "B",
    price: 9000,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-007",
    name: "신안 특상품 김",
    type: "마른김",
    origin: "신안",
    specification: "100매(220g)",
    productionDate: "2025-02-10",
    year: 2025,
    grade: "A+",
    price: 15500,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-008",
    name: "여수 일반 김",
    type: "조미김",
    origin: "여수",
    specification: "70매(180g)",
    productionDate: "2024-11-20",
    year: 2024,
    grade: "B+",
    price: 9500,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: "20250323-009",
    name: "보령 특상품 김",
    type: "파래김",
    origin: "보령",
    specification: "90매(200g)",
    productionDate: "2025-01-05",
    year: 2025,
    grade: "A",
    price: 13500,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
]

// Filter options
const origins = [
  { value: "all", label: "전체 지역" },
  { value: "완도", label: "완도" },
  { value: "고흥", label: "고흥" },
  { value: "서천", label: "서천" },
  { value: "부산", label: "부산" },
  { value: "진도", label: "진도" },
  { value: "해남", label: "해남" },
  { value: "신안", label: "신안" },
  { value: "여수", label: "여수" },
  { value: "보령", label: "보령" },
]

const types = [
  { value: "all", label: "전체 종류" },
  { value: "마른김", label: "마른김" },
  { value: "조미김", label: "조미김" },
  { value: "파래김", label: "파래김" },
  { value: "돌김", label: "돌김" },
]

const years = [
  { value: "all", label: "전체 연도" },
  { value: "2025", label: "2025년" },
  { value: "2024", label: "2024년" },
]

const grades = [
  { value: "all", label: "전체 등급", stars: 0 },
  { value: "A+", label: "A+ (최상급)", stars: 5 },
  { value: "A", label: "A (상급)", stars: 4 },
  { value: "B+", label: "B+ (중급)", stars: 3 },
  { value: "B", label: "B (일반)", stars: 2 },
]

// Helper function to render grade stars
const renderGradeStars = (grade: string) => {
  switch (grade) {
    case "A+":
      return (
        <div className="flex">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        </div>
      )
    case "A":
      return (
        <div className="flex">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 text-gray-300" />
        </div>
      )
    case "B+":
      return (
        <div className="flex">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 text-gray-300" />
          <Star className="h-4 w-4 text-gray-300" />
        </div>
      )
    case "B":
      return (
        <div className="flex">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <Star className="h-4 w-4 text-gray-300" />
          <Star className="h-4 w-4 text-gray-300" />
          <Star className="h-4 w-4 text-gray-300" />
        </div>
      )
    default:
      return null
  }
}

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    type: "all",
    origin: "all",
    year: "all",
    grade: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Apply filters and search
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Apply search term
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.origin.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.type.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Apply filters
      if (filters.type !== "all" && product.type !== filters.type) return false
      if (filters.origin !== "all" && product.origin !== filters.origin) return false
      if (filters.year !== "all" && product.year !== Number.parseInt(filters.year)) return false
      if (filters.grade !== "all" && product.grade !== filters.grade) return false

      return true
    })

    setFilteredProducts(filtered)
  }, [filters, searchTerm])

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle grade filter click
  const handleGradeClick = (grade: string) => {
    setFilters((prev) => ({ ...prev, grade: prev.grade === grade ? "all" : grade }))
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">김 제품 목록</h1>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="제품명, 지역, 종류 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4">필터</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                김 종류
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {types.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                원산지
              </label>
              <select
                id="origin"
                name="origin"
                value={filters.origin}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {origins.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                생산연도
              </label>
              <select
                id="year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {years.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Filter - Dropdown for mobile */}
            <div className="md:hidden">
              <label htmlFor="grade-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                등급
              </label>
              <select
                id="grade-mobile"
                name="grade"
                value={filters.grade}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {grades.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grade Filter - Star Rating for desktop */}
          <div className="hidden md:block mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">등급</label>
            <div className="flex flex-wrap gap-3">
              {grades.map((grade) => (
                <button
                  key={grade.value}
                  onClick={() => handleGradeClick(grade.value)}
                  className={`flex items-center px-3 py-2 rounded-md border ${
                    filters.grade === grade.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {grade.value === "all" ? (
                    <span>전체 등급</span>
                  ) : (
                    <>
                      <span className="mr-2">{grade.value}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < grade.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.type !== "all" ||
          filters.origin !== "all" ||
          filters.year !== "all" ||
          filters.grade !== "all" ||
          searchTerm) && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">적용된 필터:</span>

            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                검색: {searchTerm}
                <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => setSearchTerm("")}>
                  ×
                </button>
              </span>
            )}

            {filters.type !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                종류: {filters.type}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters((prev) => ({ ...prev, type: "all" }))}
                >
                  ×
                </button>
              </span>
            )}

            {filters.origin !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                원산지: {filters.origin}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters((prev) => ({ ...prev, origin: "all" }))}
                >
                  ×
                </button>
              </span>
            )}

            {filters.year !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                연도: {filters.year}년
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters((prev) => ({ ...prev, year: "all" }))}
                >
                  ×
                </button>
              </span>
            )}

            {filters.grade !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                등급: {filters.grade}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFilters((prev) => ({ ...prev, grade: "all" }))}
                >
                  ×
                </button>
              </span>
            )}

            <button
              className="text-sm text-primary hover:underline ml-auto"
              onClick={() => {
                setFilters({
                  type: "all",
                  origin: "all",
                  year: "all",
                  grade: "all",
                })
                setSearchTerm("")
              }}
            >
              모든 필터 초기화
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              {!product.available && (
                <div className="absolute top-0 right-0 bg-gray-800 text-white py-1 px-3 text-sm font-medium">
                  예약 완료
                </div>
              )}

              <Link href={`/products/${product.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <div className="flex items-center">{renderGradeStars(product.grade)}</div>
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    <p>종류: {product.type}</p>
                    <p>원산지: {product.origin}</p>
                    <p>규격: {product.specification}</p>
                    <p>생산연도: {product.year}년</p>
                    <p>고유번호: {product.id}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-lg font-bold text-primary">₩{product.price.toLocaleString()}/kg</div>

                    {product.available ? (
                      <span className="text-sm text-green-600 font-medium">예약 가능</span>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">예약 완료</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">검색 결과가 없습니다.</p>
            <button
              className="mt-4 text-primary hover:underline"
              onClick={() => {
                setFilters({
                  type: "all",
                  origin: "all",
                  year: "all",
                  grade: "all",
                })
                setSearchTerm("")
              }}
            >
              모든 필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
