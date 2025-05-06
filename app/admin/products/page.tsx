"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Plus, FileSpreadsheet, Upload } from "lucide-react"
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

export default function ProductsPage() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openExcelDialog, setOpenExcelDialog] = useState(false)
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    description: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "delete" | "create" | "excel",
  })

  // Mock data for demonstration
  const products = [
    {
      id: 1,
      name: "조미김 세트",
      grade: "A+",
      productionDate: "2025-03-15",
      code: "20250315-001",
      createdAt: "2025-03-20",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "33,000",
      description: "고급 조미김 세트입니다.",
    },
    {
      id: 2,
      name: "파래김 세트",
      grade: "A",
      productionDate: "2025-03-16",
      code: "20250316-002",
      createdAt: "2025-03-21",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "28,000",
      description: "신선한 파래김 세트입니다.",
    },
    {
      id: 3,
      name: "구운김 세트",
      grade: "B+",
      productionDate: "2025-03-17",
      code: "20250317-003",
      createdAt: "2025-03-22",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "25,000",
      description: "바삭한 구운김 세트입니다.",
    },
    {
      id: 4,
      name: "도시락김 세트",
      grade: "A",
      productionDate: "2025-03-18",
      code: "20250318-004",
      createdAt: "2025-03-23",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "22,000",
      description: "도시락용 김 세트입니다.",
    },
    {
      id: 5,
      name: "김밥용김 세트",
      grade: "A+",
      productionDate: "2025-03-19",
      code: "20250319-005",
      createdAt: "2025-03-24",
      thumbnail: "/placeholder.svg?height=80&width=80",
      origin: "한국",
      price: "30,000",
      description: "김밥용 김 세트입니다.",
    },
  ]

  const handleOpenProductDetail = (product: any) => {
    setSelectedProduct(product)
    setOpenProductDetail(true)
  }

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false)
    setConfirmModal({
      open: true,
      title: `${selectedProduct.name} 상품을 삭제하시겠습니까?`,
      description: "이 작업은 되돌릴 수 없습니다.",
      type: "error",
      action: "delete",
    })
  }

  const handleCreateProduct = () => {
    setOpenCreateDialog(false)
    setConfirmModal({
      open: true,
      title: "상품이 등록되었습니다",
      type: "success",
      action: "",
    })
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

  const handleConfirmAction = () => {
    // 실제 API 호출 로직이 여기에 들어갑니다
    if (confirmModal.action === "delete") {
      // 삭제 처리 로직
      console.log(`${selectedProduct.name} 삭제 처리됨`)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">제품 관리</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setOpenExcelDialog(true)}>
            <FileSpreadsheet className="h-4 w-4" />
            엑셀 등록
          </Button>
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
              <Input placeholder="상품명 또는 코드 검색" className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="등급" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="a-plus">A+</SelectItem>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b-plus">B+</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>상품 목록</CardTitle>
            </CardHeader>
            <CardContent>
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
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover border border-gray-200"
                          />
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-4 py-4">
                          <StarRating grade={product.grade} />
                        </td>
                        <td className="px-4 py-4 text-gray-600">{product.productionDate}</td>
                        <td className="px-4 py-4 font-mono text-xs text-gray-600">{product.code}</td>
                        <td className="px-4 py-4 text-gray-600">{product.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid">
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
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <StarRating grade={product.grade} size={14} />
                      <span>{product.price}원</span>
                    </div>
                    <div className="text-sm text-muted-foreground">코드: {product.code}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={openProductDetail} onOpenChange={setOpenProductDetail}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>상품 상세 정보</DialogTitle>
              <DialogDescription>상품 정보를 확인하고 수정 또는 삭제할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-md border border-gray-200">
                <img
                  src={selectedProduct.thumbnail || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">상품명:</span>
                <span className="col-span-3">{selectedProduct.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">등급:</span>
                <span className="col-span-3">
                  <StarRating grade={selectedProduct.grade} />
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">가격:</span>
                <span className="col-span-3">{selectedProduct.price}원</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">원산지:</span>
                <span className="col-span-3">{selectedProduct.origin}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">생산일자:</span>
                <span className="col-span-3">{selectedProduct.productionDate}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">고유코드:</span>
                <span className="col-span-3">{selectedProduct.code}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">등록일:</span>
                <span className="col-span-3">{selectedProduct.createdAt}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">상품 설명:</span>
                <div className="rounded-md border border-gray-200 p-3 text-sm">
                  <p>{selectedProduct.description}</p>
                </div>
              </div>
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
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>상품 삭제</DialogTitle>
            <DialogDescription>정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{selectedProduct?.name}</p>
            <p className="text-sm text-muted-foreground">코드: {selectedProduct?.code}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Product Dialog */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>상품 등록</DialogTitle>
            <DialogDescription>새로운 상품 정보를 입력하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">상품명</Label>
              <Input id="name" placeholder="상품명을 입력하세요" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="grade">등급</Label>
              <Select>
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
              <Input id="price" placeholder="예: 33,000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="productionDate">생산일자</Label>
              <Input id="productionDate" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="origin">원산지</Label>
              <Input id="origin" placeholder="원산지를 입력하세요" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">상품 설명</Label>
              <Textarea id="description" placeholder="상품에 대한 설명을 입력하세요" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnail">썸네일 이미지</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  이미지 업로드
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>
              취소
            </Button>
            <Button onClick={handleCreateProduct}>등록</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Excel Upload Dialog */}
      <Dialog open={openExcelDialog} onOpenChange={setOpenExcelDialog}>
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
      </Dialog>

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
