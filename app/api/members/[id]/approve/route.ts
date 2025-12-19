/**
 * POST /api/members/[id]/approve
 * 회원 승인
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

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { memo } = body

    // Supabase 함수 호출
    const { data, error } = await supabaseAdmin.rpc("approve_member", {
      p_member_id: params.id,
      p_admin_id: auth.user.userId,
      p_memo: memo || null,
    })

    if (error) {
      console.error("Approve member error:", error)
      return responses.serverError("회원 승인 중 오류가 발생했습니다.", error)
    }

    // 함수 결과 확인
    if (!data.success) {
      return responses.badRequest(data.message)
    }

    // 업데이트된 회원 정보 조회
    const { data: member } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("id", params.id)
      .single()

    return responses.ok(member, data.message)
  } catch (error) {
    console.error("Approve member error:", error)
    return responses.serverError()
  }
}

