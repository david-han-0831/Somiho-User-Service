"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Search, Filter, Plus, FileSpreadsheet, Upload, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ConfirmModal } from "@/components/confirm-modal"
import { productsApi } from "@/lib/api"
import type { Database } from "@/types/supabase"
import { toast } from "sonner"
import { uploadImage, generateImagePath, createImagePreview, getProductImages } from "@/lib/utils/storage"
import Image from "next/image"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openExcelDialog, setOpenExcelDialog] = useState(false)
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productDetailImages, setProductDetailImages] = useState<string[]>([]) // 상품 상세 모달용 일반 이미지 목록
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [productImages, setProductImages] = useState<File[]>([]) // 일반 이미지 여러 개
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([]) // 일반 이미지 미리보기
  const [uploading, setUploading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    description: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "delete" | "create" | "excel" | "",
  })

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")

  // 상품 등록 폼 상태
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    code: "",
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
  const [codeGenerating, setCodeGenerating] = useState(false)

  // 생산일자 변경 시 상품코드 자동 생성
  useEffect(() => {
    if (formData.production_date) {
      generateProductCode(formData.production_date)
    } else {
      setFormData((prev) => ({ ...prev, code: "" }))
    }
  }, [formData.production_date])

  // 상품코드 자동 생성 함수
  const generateProductCode = async (productionDate: string) => {
    if (!productionDate) return

    setCodeGenerating(true)
    try {
      // 생산일자를 YYYYMMDD 형식으로 변환
      const dateStr = productionDate.replace(/-/g, "")
      const datePrefix = dateStr.substring(0, 8) // YYYYMMDD

      // 해당 날짜로 시작하는 기존 상품 코드 조회
      const response = await productsApi.getProducts({
        q: datePrefix,
        is_active: true,
        per_page: 100,
      })

      if (response.success && response.data) {
        // 해당 날짜의 기존 코드들에서 최대 번호 찾기
        const existingCodes = response.data
          .map((p) => p.code)
          .filter((code) => code.startsWith(datePrefix))
          .map((code) => {
            const parts = code.split("-")
            return parts.length > 1 ? Number.parseInt(parts[1]) : 0
          })

        const maxNumber = existingCodes.length > 0 ? Math.max(...existingCodes) : 0
        const nextNumber = maxNumber + 1
        const newCode = `${datePrefix}-${String(nextNumber).padStart(3, "0")}`

        setFormData((prev) => ({ ...prev, code: newCode }))
      } else {
        // 첫 번째 상품인 경우
        const newCode = `${datePrefix}-001`
        setFormData((prev) => ({ ...prev, code: newCode }))
      }
    } catch (error) {
      console.error("상품코드 생성 오류:", error)
      // 기본값으로 설정
      const dateStr = productionDate.replace(/-/g, "").substring(0, 8)
      const newCode = `${dateStr}-001`
      setFormData((prev) => ({ ...prev, code: newCode }))
    } finally {
      setCodeGenerating(false)
    }
  }

  // 제품 목록 조회
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await productsApi.getProducts({
        q: searchQuery || undefined,
        grade: selectedGrade !== "all" ? Number(selectedGrade) : undefined,
        is_active: true,
        sort_by: "created_at",
        sort_order: "desc",
      })

      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        toast.error(response.message || "제품 목록 조회에 실패했습니다.")
      }
    } catch (error) {
      console.error("제품 조회 오류:", error)
      toast.error("제품 목록을 불러오는 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedGrade])

  // 필터 변경 시 데이터 조회 (검색어는 디바운스 적용)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, searchQuery ? 300 : 0) // 검색어가 있을 때만 디바운스

    return () => clearTimeout(timer)
  }, [fetchProducts])

  const handleOpenProductDetail = async (product: Product) => {
    setSelectedProduct(product)
    setOpenProductDetail(true)
    
    // 일반 이미지 목록 가져오기
    const imagesResult = await getProductImages(product.id)
    if (imagesResult.success && imagesResult.urls) {
      setProductDetailImages(imagesResult.urls)
    } else {
      setProductDetailImages([])
    }
  }

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return

    try {
      const response = await productsApi.deleteProduct(selectedProduct.id)

      if (response.success) {
        toast.success("상품이 삭제되었습니다")
        setOpenDeleteDialog(false)
        setSelectedProduct(null)
        fetchProducts() // 목록 새로고침
      } else {
        toast.error(response.message || "상품 삭제에 실패했습니다")
      }
    } catch (error) {
      console.error("상품 삭제 오류:", error)
      toast.error("상품 삭제 중 오류가 발생했습니다")
    }
  }

  const handleCreateProduct = async () => {
    console.log("상품 등록 시작", formData) // 디버깅

    const name = formData.name.trim()
    const grade = formData.grade ? Number.parseInt(formData.grade) : undefined
    const code = formData.code.trim()
    const productionDate = formData.production_date || undefined
    const productionYear = formData.production_year ? Number.parseInt(formData.production_year) : undefined
    const origin = formData.origin || "한국"
    const originDetail = formData.origin_detail.trim()
    const type = formData.type.trim()
    const size = formData.size.trim()
    const weight = formData.weight.trim()
    const quantity = formData.quantity ? Number.parseInt(formData.quantity) : undefined
    const price = formData.price ? Number.parseInt(formData.price.replace(/,/g, "")) : undefined
    const description = formData.description.trim()
    const availableDocuments = formData.available_documents

    console.log("폼 데이터:", { 
      name, grade, code, productionDate, productionYear, origin, originDetail, 
      type, size, weight, quantity, price, description, availableDocuments 
    }) // 디버깅

    // 필수값 검증 및 누락된 필드 목록 생성
    const missingFields: string[] = []
    if (!name || !name.trim()) missingFields.push("상품명")
    if (!grade) missingFields.push("등급")
    if (!productionDate) missingFields.push("생산일자")
    if (!productionYear) missingFields.push("생산년도")
    if (!origin) missingFields.push("원산지")
    if (!type) missingFields.push("종류")
    if (!size) missingFields.push("규격")
    if (!weight) missingFields.push("중량")
    if (!quantity) missingFields.push("입수량")
    if (!price) missingFields.push("가격")

    if (missingFields.length > 0) {
      const missingFieldsText = missingFields.join(", ")
      setConfirmModal({
        open: true,
        title: "필수 항목 누락",
        description: `다음 항목을 입력해주세요:\n${missingFieldsText}`,
        type: "error",
        action: "",
      })
      return
    }

    // 상품코드가 없으면 자동 생성
    let finalCode = formData.code.trim()
    if (!finalCode && productionDate) {
      const dateStr = productionDate.replace(/-/g, "").substring(0, 8)
      finalCode = `${dateStr}-001`
    }

    // 코드 형식 검증 (YYYYMMDD-XXX)
    const codePattern = /^\d{8}-\d{3}$/
    if (!codePattern.test(finalCode)) {
      toast.error("상품코드 생성에 실패했습니다. 생산일자를 확인해주세요.")
      return
    }

    setUploading(true)

    try {
      // 1. 먼저 상품 등록 (product_id 생성)
      console.log("상품 등록 API 호출 시작")
      const response = await productsApi.createProduct({
        name,
        grade,
        code: finalCode,
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
        thumbnail_url: null, // 먼저 null로 등록, 이미지 업로드 후 업데이트
        available_documents: availableDocuments.length > 0 ? availableDocuments : undefined,
      } as any) // 타입 단언: 새 필드들이 Database 타입에 아직 반영되지 않음

      console.log("상품 등록 응답:", response)

      if (!response.success || !response.data) {
        console.error("상품 등록 실패:", response.message)
        toast.error(response.message || "상품 등록에 실패했습니다")
        setUploading(false)
        return
      }

      const productId = response.data.id
      let thumbnailUrl: string | undefined = undefined

      // 2. 썸네일 이미지 업로드 (product_id가 있는 경우)
      if (thumbnailFile && productId) {
        console.log("이미지 업로드 시작:", thumbnailFile.name)
        const imagePath = generateImagePath(productId, thumbnailFile.name, "thumbnail")
        const uploadResult = await uploadImage(thumbnailFile, imagePath)

        if (!uploadResult.success) {
          console.error("이미지 업로드 실패:", uploadResult.error)
          toast.error(uploadResult.error || "이미지 업로드에 실패했습니다.")
          // 이미지 업로드 실패해도 상품은 등록됨
        } else {
          thumbnailUrl = uploadResult.url
          console.log("이미지 업로드 성공:", thumbnailUrl)

          // 3. 이미지 경로 업데이트
          const updateResponse = await productsApi.updateProduct(productId, {
            thumbnail_url: thumbnailUrl,
          })

          if (!updateResponse.success) {
            console.error("이미지 경로 업데이트 실패:", updateResponse.message)
            // 업데이트 실패해도 상품은 등록됨
          }
        }
      }

      // 3. 일반 이미지 업로드 (여러 개)
      if (productImages.length > 0 && productId) {
        console.log(`일반 이미지 ${productImages.length}개 업로드 시작`)
        for (const imageFile of productImages) {
          try {
            const imagePath = generateImagePath(productId, imageFile.name, "image")
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

      // 4. 성공 처리
      toast.success("상품이 등록되었습니다")
      setOpenCreateDialog(false)
      setThumbnailFile(null)
      setThumbnailPreview(null)
      setProductImages([])
      setProductImagePreviews([])
      // 폼 초기화
      setFormData({
        name: "",
        grade: "",
        code: "",
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
        available_documents: [],
      })
      
      setConfirmModal({
        open: true,
        title: "상품이 등록되었습니다",
        description: "",
        type: "success",
        action: "",
      })
      // 목록 새로고침
      fetchProducts()
    } catch (error) {
      console.error("상품 등록 오류:", error)
      toast.error("상품 등록 중 오류가 발생했습니다")
    } finally {
      setUploading(false)
    }
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 검증
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("JPEG, PNG, WebP 파일만 업로드 가능합니다.")
      return
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("파일 크기는 5MB 이하여야 합니다.")
      return
    }

    setThumbnailFile(file)
    
    // 미리보기 생성
    try {
      const preview = await createImagePreview(file)
      setThumbnailPreview(preview)
    } catch (error) {
      console.error("미리보기 생성 오류:", error)
    }
  }

  const handleProductImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // 파일 타입 및 크기 검증
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name}: 지원하지 않는 파일 형식`)
        continue
      }
      if (file.size > maxSize) {
        invalidFiles.push(`${file.name}: 파일 크기 초과 (5MB 이하)`)
        continue
      }
      validFiles.push(file)
    }

    if (invalidFiles.length > 0) {
      toast.error(`다음 파일을 제외했습니다:\n${invalidFiles.join("\n")}`)
    }

    if (validFiles.length > 0) {
      // 기존 이미지에 추가 (최대 10개)
      const newImages = [...productImages, ...validFiles].slice(0, 10)
      setProductImages(newImages)

      // 미리보기 생성
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

    // input 초기화
    e.target.value = ""
  }

  const handleRemoveProductImage = (index: number) => {
    const newImages = productImages.filter((_, i) => i !== index)
    const newPreviews = productImagePreviews.filter((_, i) => i !== index)
    setProductImages(newImages)
    setProductImagePreviews(newPreviews)
  }

  const handleExcelUpload = () => {
    setOpenExcelDialog(false)
    setConfirmModal({
      open: true,
      title: "엑셀 파일이 업로드되었습니다",
      description: "총 15개 상품이 등록되었습니다.",
      type: "success",
      action: "",
    })
  }

  const handleConfirmAction = async () => {
    // 삭제는 handleConfirmDelete에서 처리하므로 여기서는 다른 액션만 처리
    setConfirmModal({
      open: false,
      title: "",
      description: "",
      type: "success",
      action: "",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">제품 관리</h1>
        <div className="flex gap-2">
          {/* 엑셀 등록 기능은 현재 비활성화 */}
          {/* <Button variant="outline" className="gap-2" onClick={() => setOpenExcelDialog(true)}>
            <FileSpreadsheet className="h-4 w-4" />
            엑셀 등록
          </Button> */}
          <Button className="gap-2" onClick={() => setOpenCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            상품 등록
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">상품 리스트</TabsTrigger>
          <TabsTrigger value="grid">그리드 보기</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="상품명 또는 코드 검색" 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="등급" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="5">5점 (최고급)</SelectItem>
                  <SelectItem value="4">4점 (고급)</SelectItem>
                  <SelectItem value="3">3점 (중급)</SelectItem>
                  <SelectItem value="2">2점 (보통)</SelectItem>
                  <SelectItem value="1">1점 (일반)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>상품 목록</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center text-gray-500">로딩 중...</div>
              ) : products.length === 0 ? (
                <div className="py-8 text-center text-gray-500">등록된 상품이 없습니다.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        <th className="px-4 py-3 font-semibold">썸네일</th>
                        <th className="px-4 py-3 font-semibold">상품명</th>
                        <th className="px-4 py-3 font-semibold">등급</th>
                        <th className="px-4 py-3 font-semibold">생산일자</th>
                        <th className="px-4 py-3 font-semibold">고유코드</th>
                        <th className="px-4 py-3 font-semibold">등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleOpenProductDetail(product)}
                        >
                          <td className="px-4 py-4">
                            <img
                              src={product.thumbnail_url || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover border border-gray-200"
                            />
                          </td>
                          <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                          <td className="px-4 py-4">
                            <StarRating grade={product.grade} />
                          </td>
                          <td className="px-4 py-4 text-gray-600">
                            {product.production_date ? new Date(product.production_date).toLocaleDateString('ko-KR') : '-'}
                          </td>
                          <td className="px-4 py-4 font-mono text-xs text-gray-600">{product.code}</td>
                          <td className="px-4 py-4 text-gray-600">
                            {product.created_at ? new Date(product.created_at).toLocaleDateString('ko-KR') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid">
          {loading ? (
            <div className="py-8 text-center text-gray-500">로딩 중...</div>
          ) : products.length === 0 ? (
            <div className="py-8 text-center text-gray-500">등록된 상품이 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleOpenProductDetail(product)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square overflow-hidden rounded-md">
                      <img
                        src={product.thumbnail_url || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <StarRating grade={product.grade} size={14} />
                        <span>{product.price.toLocaleString('ko-KR')}원</span>
                      </div>
                      <div className="text-sm text-muted-foreground">코드: {product.code}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={openProductDetail} onOpenChange={setOpenProductDetail}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>상품 상세 정보</DialogTitle>
              <DialogDescription>상품 정보를 확인하고 수정 또는 삭제할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* 이미지 갤러리 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">상품 이미지</h3>
                
                {/* 썸네일 */}
                {selectedProduct.thumbnail_url && (
                  <div className="space-y-2">
                    <span className="text-xs text-gray-500">썸네일</span>
                    <div className="aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={selectedProduct.thumbnail_url}
                        alt={`${selectedProduct.name} 썸네일`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* 일반 이미지 */}
                {productDetailImages.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs text-gray-500">상품 이미지 ({productDetailImages.length}개)</span>
                    <div className="grid grid-cols-3 gap-3">
                      {productDetailImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="aspect-square overflow-hidden rounded-md border border-gray-200 bg-white"
                        >
                          <img
                            src={imageUrl}
                            alt={`${selectedProduct.name} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 이미지가 없는 경우 */}
                {!selectedProduct.thumbnail_url && productDetailImages.length === 0 && (
                  <div className="aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <span className="text-sm text-gray-400">이미지 없음</span>
                  </div>
                )}
              </div>

              {/* 기본 정보 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">기본 정보</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">상품명</span>
                    <p className="text-sm font-medium">{selectedProduct.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">등급</span>
                    <div>
                      <StarRating grade={selectedProduct.grade} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">가격</span>
                    <p className="text-sm font-medium">{selectedProduct.price.toLocaleString('ko-KR')}원</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">고유코드</span>
                    <p className="text-sm font-mono">{selectedProduct.code}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">등록일</span>
                    <p className="text-sm">
                      {selectedProduct.created_at ? new Date(selectedProduct.created_at).toLocaleDateString('ko-KR') : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 상품 상세 정보 */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">상품 상세 정보</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">종류</span>
                    <p className="text-sm font-medium">{selectedProduct.type || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">원산지</span>
                    <p className="text-sm">
                      {selectedProduct.origin_detail 
                        ? `${selectedProduct.origin_detail} (${selectedProduct.origin})` 
                        : selectedProduct.origin}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">규격</span>
                    <p className="text-sm font-medium">{selectedProduct.size || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">중량</span>
                    <p className="text-sm font-medium">{selectedProduct.weight || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">입수량</span>
                    <p className="text-sm font-medium">{selectedProduct.quantity ? `${selectedProduct.quantity}개` : '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">생산일자</span>
                    <p className="text-sm">
                      {selectedProduct.production_date ? new Date(selectedProduct.production_date).toLocaleDateString('ko-KR') : '-'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">생산년도</span>
                    <p className="text-sm font-medium">{selectedProduct.production_year || '-'}</p>
                  </div>
                </div>
              </div>

              {/* 제공 가능 서류 */}
              {selectedProduct.available_documents && (selectedProduct.available_documents as string[]).length > 0 && (
                <div className="space-y-3 border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">제공 가능 서류</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct.available_documents as string[]).map((doc, index) => (
                      <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 상품 설명 */}
              {selectedProduct.description && (
                <div className="space-y-2 border-t pt-4">
                  <span className="text-sm font-semibold text-gray-900">상품 설명:</span>
                  <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                    <p className="whitespace-pre-wrap">{selectedProduct.description}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenProductDetail(false)}>
                닫기
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpenProductDetail(false)
                  handleDeleteClick(selectedProduct)
                }}
              >
                삭제
              </Button>
              <Link href={`/admin/products/edit/${selectedProduct.id}`}>
                <Button>수정</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmModal
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="상품 삭제"
        description="정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        type="error"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenDeleteDialog(false)}
      >
        {selectedProduct && (
          <>
            <p className="font-medium text-gray-900">{selectedProduct.name}</p>
            <p className="text-sm text-gray-600">코드: {selectedProduct.code}</p>
          </>
        )}
      </ConfirmModal>

      {/* Create Product Dialog */}
      <Dialog 
        open={openCreateDialog} 
        onOpenChange={(open) => {
          setOpenCreateDialog(open)
          if (!open) {
            // 다이얼로그 닫을 때 폼 초기화
            setFormData({
              name: "",
              grade: "",
              code: "",
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
              available_documents: [],
            })
            setThumbnailFile(null)
            setThumbnailPreview(null)
            setProductImages([])
            setProductImagePreviews([])
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">새로운 상품 등록</DialogTitle>
            <DialogDescription className="text-gray-600">상품의 기본 정보를 입력하고 등록해주세요.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 기본 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">기본 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    상품명 <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="상품명을 입력하세요" 
                    required 
                    className="w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm font-medium">
                    등급 선택 <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger id="grade" className="w-full">
                    <SelectValue placeholder="등급을 선택하세요" />
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
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">
                    상품코드 <span className="text-red-500">*</span>
                    {codeGenerating && <span className="ml-2 text-xs text-gray-500">(생성 중...)</span>}
                  </Label>
                  <Input 
                    id="code" 
                    placeholder="생산일자 입력 시 자동 생성됩니다" 
                    required 
                    className="w-full bg-gray-50"
                    value={formData.code}
                    readOnly
                    disabled={codeGenerating}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    생산일자 입력 시 자동으로 생성됩니다 (형식: YYYYMMDD-XXX)
                  </p>
              </div>
                <div className="space-y-2">
                  <Label htmlFor="production_date" className="text-sm font-medium">
                    생산일자 <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="production_date" 
                    type="date" 
                    required 
                    className="w-full"
                    value={formData.production_date}
                    onChange={(e) => setFormData({ ...formData, production_date: e.target.value })}
                  />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-sm font-medium">
                    원산지 <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.origin} 
                    onValueChange={(value) => setFormData({ ...formData, origin: value })}
                  >
                    <SelectTrigger id="origin" className="w-full">
                      <SelectValue placeholder="원산지를 선택하세요" />
                  </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="한국">한국</SelectItem>
                      <SelectItem value="중국">중국</SelectItem>
                      <SelectItem value="일본">일본</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    가격 (원) <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="예: 33000" 
                    required 
                    className="w-full"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
              </div>
              </div>
            </div>

            {/* 상품 상세 정보 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">상품 상세 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    종류 <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type" className="w-full">
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
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-sm font-medium">
                    규격 <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.size} 
                    onValueChange={(value) => setFormData({ ...formData, size: value })}
                  >
                    <SelectTrigger id="size" className="w-full">
                      <SelectValue placeholder="규격을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19×21">19×21</SelectItem>
                      <SelectItem value="19×27">19×27</SelectItem>
                      <SelectItem value="21×21">21×21</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium">
                    중량 <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.weight} 
                    onValueChange={(value) => setFormData({ ...formData, weight: value })}
                  >
                    <SelectTrigger id="weight" className="w-full">
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
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    입수량 <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="예: 100" 
                    required 
                    className="w-full"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="production_year" className="text-sm font-medium">
                    생산년도 <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="production_year" 
                    type="number" 
                    placeholder="예: 2025" 
                    required 
                    className="w-full"
                    min="2000"
                    max="2100"
                    value={formData.production_year}
                    onChange={(e) => setFormData({ ...formData, production_year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin_detail" className="text-sm font-medium">
                    산지 상세
                  </Label>
                  <Input 
                    id="origin_detail" 
                    placeholder="예: 전라남도 완도군" 
                    className="w-full"
                    value={formData.origin_detail}
                    onChange={(e) => setFormData({ ...formData, origin_detail: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 제공 가능 서류 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">제공 가능 서류</h3>
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
                      id={`doc-${doc.id}`}
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
                    <Label htmlFor={`doc-${doc.id}`} className="text-sm font-normal cursor-pointer">
                      {doc.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 상품 설명 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">상품 설명</h3>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">상품 설명</Label>
                <Textarea 
                  id="description" 
                  placeholder="상품에 대한 설명을 입력하세요" 
                  rows={4}
                  className="w-full resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            
            {/* 이미지 업로드 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">이미지</h3>
              
              {/* 썸네일 이미지 */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-sm font-medium">썸네일 이미지</Label>
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="relative h-24 w-24 rounded-md border-2 border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    {thumbnailPreview ? (
                      <Image
                        src={thumbnailPreview}
                        alt="썸네일 미리보기"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Plus className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label htmlFor="thumbnail-upload">
                      <Button variant="outline" size="sm" asChild className="cursor-pointer">
                        <span>이미지 선택</span>
                      </Button>
                    </label>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">메인 이미지 (1장, 최대 5MB)</p>
                      <p className="text-xs text-gray-500">JPEG, PNG, WebP 형식 지원</p>
                      {thumbnailFile && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          ✓ {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)}MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 일반 이미지 (여러 개) */}
              <div className="space-y-2">
                <Label htmlFor="product-images" className="text-sm font-medium">
                  상품 이미지 (최대 10개)
                </Label>
                <div className="space-y-3">
                  {/* 이미지 미리보기 그리드 */}
                  {productImagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {productImagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-md border border-gray-200 overflow-hidden bg-white group">
                          <Image
                            src={preview}
                            alt={`상품 이미지 ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProductImage(index)}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* 이미지 업로드 버튼 */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="product-images-upload">
                      <Button variant="outline" size="sm" asChild className="cursor-pointer">
                        <span>이미지 추가</span>
                      </Button>
                    </label>
                    <input
                      id="product-images-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleProductImagesChange}
                    />
                    <p className="text-xs text-gray-500">
                      {productImages.length}/10개 등록됨 • 최대 5MB • JPEG, PNG, WebP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setOpenCreateDialog(false)
                setThumbnailFile(null)
                setThumbnailPreview(null)
                setProductImages([])
                setProductImagePreviews([])
              }}
              disabled={uploading}
            >
              취소
            </Button>
            <Button 
              className="bg-[#F95700] hover:bg-[#E04E00] text-white" 
              onClick={handleCreateProduct}
              disabled={uploading}
            >
              {uploading ? "등록 중..." : "등록"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Excel Upload Dialog - 현재 비활성화 */}
      {/* <Dialog open={openExcelDialog} onOpenChange={setOpenExcelDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>엑셀 파일로 상품 등록</DialogTitle>
            <DialogDescription>엑셀 파일을 업로드하여 여러 상품을 한 번에 등록할 수 있습니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
              <div className="mx-auto flex max-w-xs flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/90"
                  >
                    <span>파일 선택</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">또는 여기에 파일을 끌어다 놓으세요</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">XLSX, XLS 파일 (최대 10MB)</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p className="font-medium">참고사항:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>템플릿 파일을 다운로드하여 형식에 맞게 작성해주세요.</li>
                <li>상품명, 등급, 가격, 생산일자는 필수 입력 항목입니다.</li>
                <li>이미지는 별도로 등록해야 합니다.</li>
              </ul>
            </div>
            <Button variant="outline" size="sm" className="w-fit">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              템플릿 다운로드
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenExcelDialog(false)}>
              취소
            </Button>
            <Button onClick={handleExcelUpload}>업로드</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        description={confirmModal.description}
        type={confirmModal.type}
        onConfirm={handleConfirmAction}
        confirmText="확인"
        cancelText={confirmModal.action ? "취소" : undefined}
        onCancel={confirmModal.action ? () => {} : undefined}
      />
    </div>
  )
}
