"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ConfirmModal } from "@/components/confirm-modal"

export default function EditNoticePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState<string>("")
  const [isPublished, setIsPublished] = useState(true)
  const [loading, setLoading] = useState(true)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
  })

  // Mock data for demonstration
  const notices = [
    {
      id: 1,
      title: "김 수확 시작 알림",
      createdAt: "2025-03-24",
      category: "notice",
      isPublished: true,
      content: "2025년 김 수확이 시작되었습니다. 올해는 작황이 좋아 품질이 우수할 것으로 예상됩니다.",
    },
    {
      id: 2,
      title: "중국 김 시장 동향",
      createdAt: "2025-03-23",
      category: "news",
      isPublished: true,
      content: "중국 김 시장이 확대되고 있습니다. 특히 젊은 층을 중심으로 한국 김에 대한 수요가 증가하고 있습니다.",
    },
    {
      id: 3,
      title: "일본 김 수출 증가",
      createdAt: "2025-03-22",
      category: "news",
      isPublished: true,
      content: "일본으로의 김 수출이 전년 대비 15% 증가했습니다. 고급 김에 대한 수요가 특히 높습니다.",
    },
    {
      id: 4,
      title: "시스템 점검 안내",
      createdAt: "2025-03-21",
      category: "notice",
      isPublished: false,
      content:
        "2025년 4월 1일 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다. 이 시간 동안 서비스 이용이 제한됩니다.",
    },
    {
      id: 5,
      title: "신규 바이어 등록 절차 안내",
      createdAt: "2025-03-20",
      category: "notice",
      isPublished: true,
      content: "신규 바이어 등록 절차가 간소화되었습니다. 사업자등록증만 업로드하면 빠르게 승인 처리됩니다.",
    },
  ]

  // 데이터 로드
  useEffect(() => {
    // 실제 API 호출 대신 Mock 데이터에서 찾기
    const id = Number.parseInt(params.id)
    const notice = notices.find((n) => n.id === id)

    if (notice) {
      setTitle(notice.title)
      setContent(notice.content)
      setCategory(notice.category)
      setIsPublished(notice.isPublished)
    }

    // 로딩 상태 해제
    setLoading(false)
  }, [params.id])

  const handleSave = () => {
    // 필수 입력 필드 검증
    if (!title.trim()) {
      setConfirmModal({
        open: true,
        title: "제목을 입력해주세요",
        type: "warning",
      })
      return
    }

    if (!content.trim()) {
      setConfirmModal({
        open: true,
        title: "내용을 입력해주세요",
        type: "warning",
      })
      return
    }

    if (!category) {
      setConfirmModal({
        open: true,
        title: "분류를 선택해주세요",
        type: "warning",
      })
      return
    }

    // 실제 API 호출 로직이 여기에 들어갑니다
    console.log({
      id: params.id,
      title,
      content,
      category,
      isPublished,
      updatedAt: new Date().toISOString(),
    })

    // 성공 모달 표시
    setConfirmModal({
      open: true,
      title: "공지사항이 수정되었습니다",
      type: "success",
    })
  }

  const handleConfirm = () => {
    if (confirmModal.type === "success") {
      // 성공 시 목록 페이지로 이동
      router.push("/admin/notices")
    }
  }

  const handleCancel = () => {
    router.push("/admin/notices")
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-gray-500">공지사항 정보를 불러오는 중...</p>
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
          <h1 className="text-2xl font-bold">공지사항 수정</h1>
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
        {/* 왼쪽 컬럼 - 설정 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>게시 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">분류</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="분류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notice">공지사항</SelectItem>
                    <SelectItem value="news">뉴스</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border">
                  <div>
                    <Label htmlFor="published" className="text-base font-medium">
                      게시 여부
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isPublished ? "저장 시 즉시 게시됩니다." : "저장 후 나중에 게시할 수 있습니다."}
                    </p>
                  </div>
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
                  />
                </div>
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                <p>등록일: {notices.find((n) => n.id === Number.parseInt(params.id))?.createdAt || "-"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 컬럼 - 내용 */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  placeholder="내용을 입력하세요"
                  className="min-h-[400px] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        type={confirmModal.type}
        onConfirm={handleConfirm}
        confirmText="확인"
      />
    </div>
  )
}
