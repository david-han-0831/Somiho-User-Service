"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ConfirmModal } from "@/components/confirm-modal"

export default function NoticesPage() {
  const router = useRouter()

  // 상태 관리 부분 수정
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    description: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "delete" | "edit" | "visibility",
    selectedNotice: null as any,
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

  // 삭제 버튼 클릭 핸들러 수정
  const handleDeleteClick = (notice: any) => {
    setConfirmModal({
      open: true,
      title: "공지사항/뉴스 삭제",
      description: "정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      type: "error",
      action: "delete",
      selectedNotice: notice,
    })
  }

  // 수정 버튼 클릭 핸들러 추가
  const handleEditClick = (notice: any) => {
    setConfirmModal({
      open: true,
      title: "공지사항/뉴스 수정",
      description: "이 항목을 수정하시겠습니까?",
      type: "info",
      action: "edit",
      selectedNotice: notice,
    })
  }

  // 게시/미게시 버튼 클릭 핸들러 추가
  const handleVisibilityClick = (notice: any) => {
    setConfirmModal({
      open: true,
      title: notice.isPublished ? "공지사항/뉴스 미게시" : "공지사항/뉴스 게시",
      description: notice.isPublished
        ? "이 항목을 미게시 상태로 변경하시겠습니까? 사용자에게 더 이상 보이지 않게 됩니다."
        : "이 항목을 게시 상태로 변경하시겠습니까? 사용자에게 공개됩니다.",
      type: notice.isPublished ? "warning" : "success",
      action: "visibility",
      selectedNotice: notice,
    })
  }

  // 확인 모달 액션 핸들러 추가
  const handleConfirmAction = () => {
    const notice = confirmModal.selectedNotice
    if (!notice) return

    if (confirmModal.action === "delete") {
      // 삭제 처리 로직
      console.log(`${notice.title} 삭제 처리됨`)
    } else if (confirmModal.action === "edit") {
      // 수정 페이지로 이동
      router.push(`/admin/notices/edit/${notice.id}`)
    } else if (confirmModal.action === "visibility") {
      // 게시/미게시 상태 변경 로직
      console.log(`${notice.title}의 게시 상태가 ${notice.isPublished ? "미게시" : "게시"}로 변경됨`)
    }

    setConfirmModal({ ...confirmModal, open: false })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">공지사항/뉴스 관리</h1>
        <Link href="/admin/notices/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            등록하기
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="제목 검색" className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="분류" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="notice">공지사항</SelectItem>
              <SelectItem value="news">뉴스</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="게시여부" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="published">게시중</SelectItem>
              <SelectItem value="unpublished">미게시</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notices Table */}
      <Card>
        <CardHeader>
          <CardTitle>공지사항/뉴스 목록</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 font-semibold">제목</th>
                  <th className="px-4 py-3 font-semibold">등록일</th>
                  <th className="px-4 py-3 font-semibold">분류</th>
                  <th className="px-4 py-3 font-semibold">게시여부</th>
                  <th className="px-4 py-3 font-semibold">작업</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id} className="border-b border-gray-100 text-sm hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">{notice.title}</td>
                    <td className="px-4 py-4 text-gray-600">{notice.createdAt}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          notice.category === "notice" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {notice.category === "notice" ? "공지사항" : "뉴스"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {notice.isPublished ? (
                        <Badge variant="approved">게시중</Badge>
                      ) : (
                        <Badge variant="waiting">미게시</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditClick(notice)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVisibilityClick(notice)
                          }}
                        >
                          {notice.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(notice)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        description={confirmModal.description}
        type={confirmModal.type}
        onConfirm={handleConfirmAction}
        confirmText={confirmModal.action === "delete" ? "삭제" : "확인"}
        cancelText="취소"
        onCancel={() => {}}
      />
    </div>
  )
}
