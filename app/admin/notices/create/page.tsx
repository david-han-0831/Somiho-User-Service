"use client"

import { useState } from "react"
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

export default function CreateNoticePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState<string>("")
  const [isPublished, setIsPublished] = useState(true)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
  })

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
      title,
      content,
      category,
      isPublished,
      createdAt: new Date().toISOString(),
    })

    // 성공 모달 표시
    setConfirmModal({
      open: true,
      title: "공지사항이 등록되었습니다",
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">공지사항 등록</h1>
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
