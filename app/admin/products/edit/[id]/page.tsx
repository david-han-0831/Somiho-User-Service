"use client"

import { useState, useEffect, use, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2, Plus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { productsApi } from "@/lib/api"
import type { Database } from "@/types/supabase"
import { toast } from "sonner"
import { uploadImage, generateImagePath, createImagePreview, deleteImage, getProductImages } from "@/lib/utils/storage"
import Image from "next/image"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const [productImages, setProductImages] = useState<File[]>([]) // 새로 추가할 일반 이미지
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([]) // 새로 추가할 일반 이미지 미리보기
  const [existingProductImages, setExistingProductImages] = useState<string[]>([]) // 기존 일반 이미지 URL
  
  // 폼 데이터 state
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    production_date: "",
    production_year: "",
    origin: "",
    origin_detail: "",
    type: "",
    size: "",
    weight: "",
    quantity: "",
    price: "",
    description: "",
    available_documents: [] as string[],
  })

  // 제품 상세 조회
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.getProduct(id)
        if (response.success && response.data) {
          setProduct(response.data)
          // 폼 데이터 초기화
          setFormData({
            name: response.data.name || "",
            grade: response.data.grade?.toString() || "",
            production_date: response.data.production_date 
              ? new Date(response.data.production_date).toISOString().split('T')[0] 
              : "",
            production_year: response.data.production_year?.toString() || "",
            origin: response.data.origin || "",
            origin_detail: response.data.origin_detail || "",
            type: response.data.type || "",
            size: response.data.size || "",
            weight: response.data.weight || "",
            quantity: response.data.quantity?.toString() || "",
            price: response.data.price?.toString() || "",
            description: response.data.description || "",
            available_documents: (response.data.available_documents as string[]) || [],
          })

          // 기존 일반 이미지 목록 가져오기
          const imagesResult = await getProductImages(id)
          if (imagesResult.success && imagesResult.urls) {
            setExistingProductImages(imagesResult.urls)
          }
        } else {
          toast.error(response.message || "제품을 불러올 수 없습니다.")
          router.push("/admin/products")
        }
      } catch (error) {
        console.error("제품 조회 오류:", error)
        toast.error("제품을 불러오는 중 오류가 발생했습니다.")
        router.push("/admin/products")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, router])

  const handleSave = async () => {
    if (!product) return

    setSaving(true)
    try {
      // 폼 데이터 수집 (state에서 가져오기)
      const name = formData.name.trim()
      const grade = formData.grade ? Number.parseInt(formData.grade) : undefined
      const productionDate = formData.production_date || undefined
      const productionYear = formData.production_year ? Number.parseInt(formData.production_year) : undefined
      const origin = formData.origin.trim()
      const originDetail = formData.origin_detail.trim()
      const type = formData.type.trim()
      const size = formData.size.trim()
      const weight = formData.weight.trim()
      const quantity = formData.quantity ? Number.parseInt(formData.quantity) : undefined
      const price = formData.price ? Number.parseInt(formData.price.replace(/,/g, "")) : undefined
      const description = formData.description.trim()
      const availableDocuments = formData.available_documents

      // 필수값 검증
      if (!name || !grade || !productionDate || !productionYear || !origin || !type || !size || !weight || !quantity || !price) {
        toast.error("필수 항목을 모두 입력해주세요.")
        setSaving(false)
        return
      }
      
      console.log("상품 수정 시작:", { 
        name, grade, productionDate, productionYear, origin, originDetail,
        type, size, weight, quantity, price, description, availableDocuments 
      })

      let thumbnailUrl: string | undefined = product.thumbnail_url || undefined

      // 새 썸네일 이미지 업로드
      if (thumbnailFile) {
        // 기존 이미지 삭제 (있는 경우)
        if (product.thumbnail_url) {
          await deleteImage(product.thumbnail_url)
        }

        const imagePath = generateImagePath(product.id, thumbnailFile.name, "thumbnail")
        const uploadResult = await uploadImage(thumbnailFile, imagePath)

        if (!uploadResult.success) {
          toast.error(uploadResult.error || "이미지 업로드에 실패했습니다.")
          setSaving(false)
          return
        }

        thumbnailUrl = uploadResult.url
      }

      // 새 일반 이미지 업로드
      if (productImages.length > 0) {
        console.log(`일반 이미지 ${productImages.length}개 업로드 시작`)
        for (const imageFile of productImages) {
          try {
            const imagePath = generateImagePath(product.id, imageFile.name, "image")
            const uploadResult = await uploadImage(imageFile, imagePath)
            
            if (!uploadResult.success) {
              console.error(`이미지 업로드 실패: ${imageFile.name}`, uploadResult.error)
              // 개별 이미지 업로드 실패해도 계속 진행
            } else {
              console.log(`이미지 업로드 성공: ${imageFile.name}`)
            }
          } catch (error) {
            console.error(`이미지 업로드 오류: ${imageFile.name}`, error)
          }
        }
      }

      console.log("상품 수정 API 호출 시작")
      const response = await productsApi.updateProduct(product.id, {
        name,
        grade,
        production_date: productionDate,
        production_year: productionYear,
        origin,
        origin_detail: originDetail || undefined,
        type,
        size,
        weight,
        quantity,
        price,
        description: description || undefined,
        thumbnail_url: thumbnailUrl,
        available_documents: availableDocuments.length > 0 ? availableDocuments : undefined,
      })

      console.log("상품 수정 응답:", response)

      if (response.success) {
        toast.success("상품이 저장되었습니다.")
        router.push("/admin/products")
      } else {
        console.error("상품 수정 실패:", response.message)
        toast.error(response.message || "상품 저장에 실패했습니다.")
      }
    } catch (error) {
      console.error("상품 저장 오류:", error)
      toast.error("상품 저장 중 오류가 발생했습니다.")
    } finally {
      setSaving(false)
    }
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
              <div className="relative aspect-square overflow-hidden rounded-md border border-gray-200">
                {thumbnailPreview || product.thumbnail_url ? (
                  <Image
                    src={thumbnailPreview || product.thumbnail_url || "/placeholder.svg"}
                  alt={product.name}
                    fill
                    className="object-cover"
                />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-50">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => thumbnailInputRef.current?.click()}
              >
                썸네일 변경
              </Button>
              <input
                ref={thumbnailInputRef}
                id="thumbnail-upload-edit"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return

                  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
                  if (!allowedTypes.includes(file.type)) {
                    toast.error("JPEG, PNG, WebP 파일만 업로드 가능합니다.")
                    return
                  }

                  const maxSize = 5 * 1024 * 1024
                  if (file.size > maxSize) {
                    toast.error("파일 크기는 5MB 이하여야 합니다.")
                    return
                  }

                  setThumbnailFile(file)
                  try {
                    const preview = await createImagePreview(file)
                    setThumbnailPreview(preview)
                  } catch (error) {
                    console.error("미리보기 생성 오류:", error)
                  }
                }}
              />
              {thumbnailFile && (
                <p className="text-xs text-green-600 text-center">{thumbnailFile.name}</p>
              )}
              <p className="text-xs text-gray-500 text-center">최대 5MB</p>

              {/* 일반 이미지 섹션 */}
              <div className="space-y-3 mt-4 pt-4 border-t">
                <Label className="text-sm font-medium">상품 이미지 (최대 10개)</Label>
                
                {/* 기존 이미지 표시 */}
                {existingProductImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">기존 이미지</p>
                    <div className="grid grid-cols-3 gap-2">
                      {existingProductImages.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-md border border-gray-200 overflow-hidden bg-white">
                          <Image
                            src={url}
                            alt={`기존 이미지 ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 새로 추가할 이미지 미리보기 */}
                {productImagePreviews.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">추가할 이미지</p>
                    <div className="grid grid-cols-3 gap-2">
                      {productImagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-md border border-gray-200 overflow-hidden bg-white group">
                          <Image
                            src={preview}
                            alt={`새 이미지 ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = productImages.filter((_, i) => i !== index)
                              const newPreviews = productImagePreviews.filter((_, i) => i !== index)
                              setProductImages(newImages)
                              setProductImagePreviews(newPreviews)
                            }}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 이미지 추가 버튼 */}
                <label htmlFor="product-images-upload-edit">
                  <Button variant="outline" size="sm" className="w-full cursor-pointer" asChild>
                    <span>이미지 추가</span>
                  </Button>
                </label>
                <input
                  id="product-images-upload-edit"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length === 0) return

                    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
                    const maxSize = 5 * 1024 * 1024
                    const validFiles: File[] = []
                    const invalidFiles: string[] = []

                    for (const file of files) {
                      if (!allowedTypes.includes(file.type)) {
                        invalidFiles.push(`${file.name}: 지원하지 않는 파일 형식`)
                        continue
                      }
                      if (file.size > maxSize) {
                        invalidFiles.push(`${file.name}: 파일 크기 초과`)
                        continue
                      }
                      validFiles.push(file)
                    }

                    if (invalidFiles.length > 0) {
                      toast.error(`다음 파일을 제외했습니다:\n${invalidFiles.join("\n")}`)
                    }

                    if (validFiles.length > 0) {
                      const newImages = [...productImages, ...validFiles].slice(0, 10)
                      setProductImages(newImages)

                      const newPreviews: string[] = []
                      for (const file of validFiles) {
                        try {
                          const preview = await createImagePreview(file)
                          newPreviews.push(preview)
                        } catch (error) {
                          console.error("미리보기 생성 오류:", error)
                        }
                      }
                      setProductImagePreviews([...productImagePreviews, ...newPreviews].slice(0, 10))
                    }

                    e.target.value = ""
                  }}
                />
                <p className="text-xs text-gray-500">
                  {productImages.length}/10개 추가됨 • 최대 5MB • JPEG, PNG, WebP
                </p>
              </div>
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
                <span className="text-sm">
                  {product.created_at ? new Date(product.created_at).toLocaleDateString('ko-KR') : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">현재 등급:</span>
                <StarRating grade={product.grade.toString()} size={14} />
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
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="grade">등급</Label>
                  <Select 
                    value={formData.grade}
                    onValueChange={(value) => setFormData({ ...formData, grade: value })}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="등급 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5점 (최고급)</SelectItem>
                      <SelectItem value="4">4점 (고급)</SelectItem>
                      <SelectItem value="3">3점 (중급)</SelectItem>
                      <SelectItem value="2">2점 (보통)</SelectItem>
                      <SelectItem value="1">1점 (일반)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">가격 (원)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="productionDate">생산일자</Label>
                  <Input 
                    id="productionDate" 
                    type="date" 
                    value={formData.production_date}
                    onChange={(e) => setFormData({ ...formData, production_date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="origin">원산지</Label>
                  <Select 
                    value={formData.origin}
                    onValueChange={(value) => setFormData({ ...formData, origin: value })}
                  >
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="원산지 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="한국">한국</SelectItem>
                      <SelectItem value="중국">중국</SelectItem>
                      <SelectItem value="일본">일본</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">상품 설명</Label>
                <Textarea 
                  id="description" 
                  rows={5} 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* 상품 상세 정보 섹션 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>상품 상세 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">종류</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="종류를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="재래김">재래김</SelectItem>
                      <SelectItem value="파래김">파래김</SelectItem>
                      <SelectItem value="김밥김">김밥김</SelectItem>
                      <SelectItem value="곱창김">곱창김</SelectItem>
                      <SelectItem value="돌김">돌김</SelectItem>
                      <SelectItem value="자반김">자반김</SelectItem>
                      <SelectItem value="화입김">화입김</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">규격</Label>
                  <Select 
                    value={formData.size}
                    onValueChange={(value) => setFormData({ ...formData, size: value })}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="규격을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19×21">19×21</SelectItem>
                      <SelectItem value="19×27">19×27</SelectItem>
                      <SelectItem value="21×21">21×21</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">중량</Label>
                  <Select 
                    value={formData.weight}
                    onValueChange={(value) => setFormData({ ...formData, weight: value })}
                  >
                    <SelectTrigger id="weight">
                      <SelectValue placeholder="중량을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="230g">230g</SelectItem>
                      <SelectItem value="260g">260g</SelectItem>
                      <SelectItem value="280g">280g</SelectItem>
                      <SelectItem value="300g">300g</SelectItem>
                      <SelectItem value="320g">320g</SelectItem>
                      <SelectItem value="6kg">6kg</SelectItem>
                      <SelectItem value="7kg">7kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">입수량</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="production_year">생산년도</Label>
                  <Input 
                    id="production_year" 
                    type="number" 
                    min="2000"
                    max="2100"
                    value={formData.production_year}
                    onChange={(e) => setFormData({ ...formData, production_year: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="origin_detail">산지 상세</Label>
                  <Input 
                    id="origin_detail" 
                    placeholder="예: 전라남도 완도군"
                    value={formData.origin_detail}
                    onChange={(e) => setFormData({ ...formData, origin_detail: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 제공 가능 서류 섹션 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>제공 가능 서류</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "원산지증명서", label: "원산지증명서" },
                  { id: "위생증명서", label: "위생증명서" },
                  { id: "식물검역증", label: "식물검역증" },
                  { id: "한국 유기인증", label: "한국 유기인증" },
                ].map((doc) => (
                  <div key={doc.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`doc-edit-${doc.id}`}
                      checked={formData.available_documents.includes(doc.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            available_documents: [...formData.available_documents, doc.id],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            available_documents: formData.available_documents.filter((d) => d !== doc.id),
                          })
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`doc-edit-${doc.id}`} className="text-sm font-normal cursor-pointer">
                      {doc.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>추가 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="code">상품 코드 (수정 불가)</Label>
                <Input id="code" defaultValue={product.code} disabled />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline" 
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={async () => {
                if (confirm("정말로 이 상품을 삭제하시겠습니까?")) {
                  try {
                    const response = await productsApi.deleteProduct(product.id)
                    if (response.success) {
                      toast.success("상품이 삭제되었습니다.")
                      router.push("/admin/products")
                    } else {
                      toast.error(response.message || "상품 삭제에 실패했습니다.")
                    }
                  } catch (error) {
                    console.error("상품 삭제 오류:", error)
                    toast.error("상품 삭제 중 오류가 발생했습니다.")
                  }
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              상품 삭제
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "저장 중..." : "저장"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
