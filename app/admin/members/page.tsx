"use client"

import { useState, useEffect, useCallback } from "react"
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
import { membersApi } from "@/lib/api"
import type { Database } from "@/types/supabase"
import { toast } from "sonner"

type Member = Database["public"]["Tables"]["members"]["Row"]

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [openMemberDetail, setOpenMemberDetail] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    type: "success" as "success" | "warning" | "error" | "info",
    action: "" as "approve" | "reject" | "",
  })
  const [comment, setComment] = useState("")
  
  // 필터 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 회원 목록 조회
  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await membersApi.getMembers({
        q: searchQuery || undefined,
        country: selectedCountry !== "all" ? selectedCountry : undefined,
        status: selectedStatus as any,
        sort_by: "created_at",
        sort_order: "desc",
      })

      if (response.success && response.data) {
        setMembers(response.data)
      } else {
        toast.error(response.message || "회원 목록 조회에 실패했습니다.")
      }
    } catch (error) {
      console.error("회원 조회 오류:", error)
      toast.error("회원 목록을 불러오는 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedCountry, selectedStatus])

  // 필터 변경 시 데이터 조회 (검색어는 디바운스 적용)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers()
    }, searchQuery ? 300 : 0) // 검색어가 있을 때만 디바운스

    return () => clearTimeout(timer)
  }, [fetchMembers])

  const handleOpenDetail = (member: Member) => {
    setSelectedMember(member)
    setOpenMemberDetail(true)
  }

  const handleApprove = (member: Member, fromDetail = false) => {
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

  const handleReject = (member: Member, fromDetail = false) => {
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

  const handleConfirmAction = async () => {
    if (!selectedMember) return

    try {
      if (confirmModal.action === "approve") {
        // 승인 처리
        const response = await membersApi.approveMember(selectedMember.id, {
          memo: comment || undefined,
        })

        if (response.success) {
          toast.success("승인되었습니다")
          setConfirmModal({
            open: false,
            title: "",
            type: "success",
            action: "",
          })
          setComment("")
          // 목록 새로고침
          fetchMembers()
        } else {
          toast.error(response.message || "승인에 실패했습니다")
        }
      } else if (confirmModal.action === "reject") {
        // 반려 처리
        if (!comment.trim()) {
          toast.error("반려 사유를 입력해주세요")
          return
        }

        const response = await membersApi.rejectMember(selectedMember.id, {
          rejection_reason: comment,
        })

        if (response.success) {
          toast.success("반려되었습니다")
          setConfirmModal({
            open: false,
            title: "",
            type: "success",
            action: "",
          })
          setComment("")
          // 목록 새로고침
          fetchMembers()
        } else {
          toast.error(response.message || "반려에 실패했습니다")
        }
      }
    } catch (error) {
      console.error("회원 처리 오류:", error)
      toast.error("처리 중 오류가 발생했습니다")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">회원 관리</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="회사명 또는 담당자 검색" 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="국가" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="한국">한국</SelectItem>
              <SelectItem value="일본">일본</SelectItem>
              <SelectItem value="중국">중국</SelectItem>
              <SelectItem value="미국">미국</SelectItem>
              <SelectItem value="태국">태국</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>회원 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-gray-500">로딩 중...</div>
          ) : members.length === 0 ? (
            <div className="py-8 text-center text-gray-500">등록된 회원이 없습니다.</div>
          ) : (
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
                      <td className="px-4 py-4 font-mono text-xs text-gray-600">{member.business_number}</td>
                      <td className="px-4 py-4 text-gray-600">
                        {member.registration_date ? new Date(member.registration_date).toLocaleDateString('ko-KR') : '-'}
                      </td>
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
          )}
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
                <span className="col-span-3">{selectedMember.business_number}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">이메일:</span>
                <span className="col-span-3">{selectedMember.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">연락처:</span>
                <span className="col-span-3">{selectedMember.phone || '-'}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">가입일:</span>
                <span className="col-span-3">
                  {selectedMember.registration_date ? new Date(selectedMember.registration_date).toLocaleDateString('ko-KR') : '-'}
                </span>
              </div>
              {selectedMember.business_license_url && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">사업자등록증:</span>
                  <div className="mt-2 rounded border border-gray-200 p-2">
                    <img
                      src={selectedMember.business_license_url}
                      alt="사업자등록증"
                      className="mx-auto h-auto max-w-full"
                    />
                  </div>
                </div>
              )}
              {selectedMember.rejection_reason && (
                <div className="space-y-2">
                  <span className="text-sm font-medium text-red-600">반려 사유:</span>
                  <p className="text-sm text-gray-600">{selectedMember.rejection_reason}</p>
                </div>
              )}
              {selectedMember.memo && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">메모:</span>
                  <p className="text-sm text-gray-600">{selectedMember.memo}</p>
                </div>
              )}
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
