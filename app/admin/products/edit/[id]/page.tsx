"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock data fetch
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Find product by ID from mock data
      const mockProduct = {
        id: Number.parseInt(params.id),
        name: "조미김 세트",
        grade: "A+",
        productionDate: "2025-03-15",
        code: "20250315-001",
        createdAt: "2025-03-20",
        thumbnail: "/placeholder.svg?height=200&width=200",
        origin: "한국",
        price: "33,000",
        description: "고급 조미김 세트입니다. 신선한 재료로 만들어진 프리미엄 제품으로, 풍부한 맛과 향이 특징입니다.",
        stock: 150,
        weight: "500g",
        dimensions: "30 x 20 x 5 cm",
        images: [
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
        ],
      }

      setProduct(mockProduct)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleSave = () => {
    // Save logic would go here
    alert("상품이 저장되었습니다.")
    router.push("/admin/products")
  }

  const handleCancel = () => {
    router.push("/admin/products")
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">상품 수정</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column - Images */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>상품 이미지</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image: string, index: number) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <Button variant="outline" className="w-full">
                이미지 추가
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>상품 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">상품 코드:</span>
                <span className="font-mono text-sm">{product.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">등록일:</span>
                <span className="text-sm">{product.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">현재 등급:</span>
                <StarRating grade={product.grade} size={14} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">상품명</Label>
                <Input id="name" defaultValue={product.name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="grade">등급</Label>
                  <Select defaultValue={product.grade}>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="등급 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">가격 (원)</Label>
                  <Input id="price" defaultValue={product.price} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="productionDate">생산일자</Label>
                  <Input id="productionDate" type="date" defaultValue={product.productionDate} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="origin">원산지</Label>
                  <Input id="origin" defaultValue={product.origin} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">상품 설명</Label>
                <Textarea id="description" rows={5} defaultValue={product.description} />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>추가 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">재고 수량</Label>
                  <Input id="stock" type="number" defaultValue={product.stock} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">중량</Label>
                  <Input id="weight" defaultValue={product.weight} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dimensions">규격</Label>
                  <Input id="dimensions" defaultValue={product.dimensions} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
                <Input id="tags" placeholder="예: 김, 조미김, 선물세트" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              상품 삭제
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
