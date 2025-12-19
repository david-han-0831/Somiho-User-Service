/**
 * POST /api/notices/[id]/toggle-publish
 * 공지사항 게시/미게시 토글
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

    // Supabase 함수 호출
    const { data, error } = await supabaseAdmin.rpc("toggle_notice_published", {
      p_notice_id: params.id,
    })

    if (error) {
      console.error("Toggle notice published error:", error)
      return responses.serverError("게시 상태 변경 중 오류가 발생했습니다.", error)
    }

    // 함수 결과 확인
    if (!data.success) {
      return responses.badRequest(data.message)
    }

    // 업데이트된 공지사항 정보 조회
    const { data: notice } = await supabaseAdmin
      .from("notices")
      .select("*")
      .eq("id", params.id)
      .single()

    return responses.ok(notice, data.message)
  } catch (error) {
    console.error("Toggle notice published error:", error)
    return responses.serverError()
  }
}

