/**
 * GET /api/members/[id] - 회원 상세 조회
 * PATCH /api/members/[id] - 회원 정보 수정
 * DELETE /api/members/[id] - 회원 삭제
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

// GET - 회원 상세 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { data, error } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !data) {
      return responses.notFound("회원을 찾을 수 없습니다.")
    }

    return responses.ok(data)
  } catch (error) {
    console.error("Get member error:", error)
    return responses.serverError()
  }
}

// PATCH - 회원 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    
    // 허용된 필드만 업데이트
    const allowedFields = ["company", "manager", "country", "phone", "memo", "business_license_url"]
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
      .from("members")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Member update error:", error)
      return responses.serverError("회원 정보 수정 중 오류가 발생했습니다.")
    }

    return responses.ok(data, "회원 정보가 수정되었습니다.")
  } catch (error) {
    console.error("Update member error:", error)
    return responses.serverError()
  }
}

// DELETE - 회원 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { error } = await supabaseAdmin
      .from("members")
      .delete()
      .eq("id", params.id)

    if (error) {
      console.error("Member delete error:", error)
      return responses.serverError("회원 삭제 중 오류가 발생했습니다.")
    }

    return responses.ok(null, "회원이 삭제되었습니다.")
  } catch (error) {
    console.error("Delete member error:", error)
    return responses.serverError()
  }
}

