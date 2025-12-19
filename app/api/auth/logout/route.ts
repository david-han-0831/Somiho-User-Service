/**
 * POST /api/auth/logout
 * 로그아웃 API (Supabase Auth)
 */

import { NextRequest } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { responses } from "@/lib/utils/response"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // Supabase Auth 로그아웃
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Logout error:", error)
      return responses.serverError("로그아웃 처리 중 오류가 발생했습니다.")
    }

    return responses.ok(null, "로그아웃 성공")
  } catch (error) {
    console.error("Logout error:", error)
    return responses.serverError("로그아웃 처리 중 오류가 발생했습니다.")
  }
}

