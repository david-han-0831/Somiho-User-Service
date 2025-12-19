/**
 * PATCH /api/market-prices/[id] - 시세 정보 수정
 * DELETE /api/market-prices/[id] - 시세 삭제
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

// PATCH - 시세 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    
    // 허용된 필드만 업데이트
    const allowedFields = ["price", "memo"]
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
      .from("market_prices")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Market price update error:", error)
      return responses.serverError("시세 정보 수정 중 오류가 발생했습니다.")
    }

    return responses.ok(data, "시세 정보가 수정되었습니다.")
  } catch (error) {
    console.error("Update market price error:", error)
    return responses.serverError()
  }
}

// DELETE - 시세 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { error } = await supabaseAdmin
      .from("market_prices")
      .delete()
      .eq("id", params.id)

    if (error) {
      console.error("Market price delete error:", error)
      return responses.serverError("시세 삭제 중 오류가 발생했습니다.")
    }

    return responses.ok(null, "시세가 삭제되었습니다.")
  } catch (error) {
    console.error("Delete market price error:", error)
    return responses.serverError()
  }
}

