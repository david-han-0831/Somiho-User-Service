/**
 * POST /api/reservations/[id]/approve
 * 예약 승인
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
    const { data, error } = await supabaseAdmin.rpc("approve_reservation", {
      p_reservation_id: params.id,
      p_admin_id: auth.user.userId,
    })

    if (error) {
      console.error("Approve reservation error:", error)
      return responses.serverError("예약 승인 중 오류가 발생했습니다.", error)
    }

    // 함수 결과 확인
    if (!data.success) {
      return responses.badRequest(data.message)
    }

    // 업데이트된 예약 정보 조회 (상세 정보 포함)
    const { data: reservation } = await supabaseAdmin
      .from("reservations_detailed")
      .select("*")
      .eq("id", params.id)
      .single()

    return responses.ok(reservation, data.message)
  } catch (error) {
    console.error("Approve reservation error:", error)
    return responses.serverError()
  }
}

