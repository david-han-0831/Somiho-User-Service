/**
 * GET /api/notices/[id] - 공지사항 상세 조회
 * PATCH /api/notices/[id] - 공지사항 정보 수정
 * DELETE /api/notices/[id] - 공지사항 삭제
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses } from "@/lib/utils/response"

interface RouteParams {
  params: {
    id: string
  }
}

// GET - 공지사항 상세 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { data, error } = await supabaseAdmin
      .from("notices")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !data) {
      return responses.notFound("공지사항을 찾을 수 없습니다.")
    }

    // 조회수 증가
    await supabaseAdmin
      .from("notices")
      .update({ view_count: data.view_count + 1 })
      .eq("id", params.id)

    return responses.ok({ ...data, view_count: data.view_count + 1 })
  } catch (error) {
    console.error("Get notice error:", error)
    return responses.serverError()
  }
}

// PATCH - 공지사항 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    
    // 허용된 필드만 업데이트
    const allowedFields = ["title", "content", "category", "is_published"]
    const updates: any = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    if (Object.keys(updates).length === 0) {
      return responses.badRequest("수정할 항목이 없습니다.")
    }

    const { data, error } = await supabaseAdmin
      .from("notices")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Notice update error:", error)
      return responses.serverError("공지사항 수정 중 오류가 발생했습니다.")
    }

    return responses.ok(data, "공지사항이 수정되었습니다.")
  } catch (error) {
    console.error("Update notice error:", error)
    return responses.serverError()
  }
}

// DELETE - 공지사항 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { error } = await supabaseAdmin
      .from("notices")
      .delete()
      .eq("id", params.id)

    if (error) {
      console.error("Notice delete error:", error)
      return responses.serverError("공지사항 삭제 중 오류가 발생했습니다.")
    }

    return responses.ok(null, "공지사항이 삭제되었습니다.")
  } catch (error) {
    console.error("Delete notice error:", error)
    return responses.serverError()
  }
}

