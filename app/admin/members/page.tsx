"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmModal } from "@/components/confirm-modal"

export default function MembersPage() {
  const [openMemberDetail, setOpenMemberDetail] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject",
  })
  const [comment, setComment] = useState("")

  // Mock data for demonstration
  const members = [
    {
      id: 1,
      company: "㈜수산김",
      manager: "김일본",
      country: "일본",
      businessNumber: "111-22-33333",
      registrationDate: "2025-03-24",
      status: "waiting",
      businessLicense: "/placeholder.svg?height=300&width=400",
      email: "kim@example.jp",
      phone: "+81-3-1234-5678",
    },
    {
      id: 2,
      company: "해양물산",
      manager: "이중국",
      country: "중국",
      businessNumber: "222-33-44444",
      registrationDate: "2025-03-23",
      status: "approved",
      businessLicense: "/placeholder.svg?height=300&width=400",
      email: "lee@example.cn",
      phone: "+86-10-1234-5678",
    },
    {
      id: 3,
      company: "글로벌푸드",
      manager: "박미국",
      country: "미국",
      businessNumber: "333-44-55555",
      registrationDate: "2025-03-22",
      status: "rejected",
      businessLicense: "/placeholder.svg?height=300&width=400",
      email: "park@example.com",
      phone: "+1-123-456-7890",
    },
    {
      id: 4,
      company: "한국수산",
      manager: "최한국",
      country: "한국",
      businessNumber: "444-55-66666",
      registrationDate: "2025-03-21",
      status: "waiting",
      businessLicense: "/placeholder.svg?height=300&width=400",
      email: "choi@example.kr",
      phone: "+82-2-1234-5678",
    },
    {
      id: 5,
      company: "동남아식품",
      manager: "정태국",
      country: "태국",
      businessNumber: "555-66-77777",
      registrationDate: "2025-03-20",
      status: "waiting",
      businessLicense: "/placeholder.svg?height=300&width=400",
      email: "jung@example.th",
      phone: "+66-2-123-4567",
    },
  ]

  const handleOpenDetail = (member: any) => {
    setSelectedMember(member)
    setOpenMemberDetail(true)
  }

  const handleApprove = (member: any, fromDetail = false) => {
    setSelectedMember(member)
    setConfirmModal({
      open: true,
      title: `${member.company}의 회원 가입을 승인하시겠습니까?`,
      type: "success",
      action: "approve",
    })
    if (fromDetail) {
      setOpenMemberDetail(false)
    }
  }

  const handleReject = (member: any, fromDetail = false) => {
    setSelectedMember(member)
    setConfirmModal({
      open: true,
      title: `${member.company}의 회원 가입을 반려하시겠습니까?`,
      type: "error",
      action: "reject",
    })
    if (fromDetail) {
      setOpenMemberDetail(false)
    }
  }

  const handleConfirmAction = () => {
    // 실제 API 호출 로직이 여기에 들어갑니다
    if (confirmModal.action === "approve") {
      // 승인 처리 로직
      console.log(`${selectedMember.company} 승인 처리됨`, comment)
      setConfirmModal({
        open: true,
        title: "승인되었습니다",
        type: "success",
        action: "",
      })
    } else if (confirmModal.action === "reject") {
      // 반려 처리 로직
      console.log(`${selectedMember.company} 반려 처리됨`, comment)
      setConfirmModal({
        open: true,
        title: "반려되었습니다",
        type: "error",
        action: "",
      })
    }
    setComment("")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">회원 관리</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="회사명 또는 담당자 검색" className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="국가" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="kr">한국</SelectItem>
              <SelectItem value="jp">일본</SelectItem>
              <SelectItem value="cn">중국</SelectItem>
              <SelectItem value="us">미국</SelectItem>
              <SelectItem value="th">태국</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="waiting">대기</SelectItem>
              <SelectItem value="approved">승인</SelectItem>
              <SelectItem value="rejected">반려</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>회원 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 font-semibold">회사명</th>
                  <th className="px-4 py-3 font-semibold">담당자</th>
                  <th className="px-4 py-3 font-semibold">국가</th>
                  <th className="px-4 py-3 font-semibold">사업자번호</th>
                  <th className="px-4 py-3 font-semibold">가입일</th>
                  <th className="px-4 py-3 font-semibold">상태</th>
                  {/* 상태에 따른 작업 버튼은 상세 페이지로 이동 */}
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenDetail(member)}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">{member.company}</td>
                    <td className="px-4 py-4 text-gray-600">{member.manager}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                        {member.country}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-gray-600">{member.businessNumber}</td>
                    <td className="px-4 py-4 text-gray-600">{member.registrationDate}</td>
                    <td className="px-4 py-4">
                      {member.status === "waiting" && <Badge variant="waiting">승인대기</Badge>}
                      {member.status === "approved" && <Badge variant="approved">승인됨</Badge>}
                      {member.status === "rejected" && <Badge variant="rejected">반려됨</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Member Detail Modal */}
      {selectedMember && (
        <Dialog open={openMemberDetail} onOpenChange={setOpenMemberDetail}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>회원 상세 정보</DialogTitle>
              <DialogDescription>회원 정보를 확인하고 승인 또는 반려할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">회사명:</span>
                <span className="col-span-3">{selectedMember.company}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">담당자:</span>
                <span className="col-span-3">{selectedMember.manager}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">국가:</span>
                <span className="col-span-3">{selectedMember.country}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">사업자번호:</span>
                <span className="col-span-3">{selectedMember.businessNumber}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">이메일:</span>
                <span className="col-span-3">{selectedMember.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">연락처:</span>
                <span className="col-span-3">{selectedMember.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">가입일:</span>
                <span className="col-span-3">{selectedMember.registrationDate}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">사업자등록증:</span>
                <div className="mt-2 rounded border border-gray-200 p-2">
                  <img
                    src={selectedMember.businessLicense || "/placeholder.svg"}
                    alt="사업자등록증"
                    className="mx-auto h-auto max-w-full"
                  />
                </div>
              </div>
              {selectedMember.status === "waiting" && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">코멘트:</span>
                  <Textarea
                    placeholder="승인 또는 반려 사유를 입력하세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenMemberDetail(false)}>
                닫기
              </Button>
              {selectedMember.status === "waiting" && (
                <>
                  <Button variant="destructive" onClick={() => handleReject(selectedMember, true)}>
                    반려
                  </Button>
                  <Button onClick={() => handleApprove(selectedMember, true)}>승인</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.title}
        type={confirmModal.type}
        onConfirm={handleConfirmAction}
        confirmText="확인"
        cancelText={confirmModal.action ? "취소" : undefined}
        onCancel={confirmModal.action ? () => {} : undefined}
      />
    </div>
  )
}
