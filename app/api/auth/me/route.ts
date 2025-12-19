/**
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보 조회 (Supabase Auth)
 */

import { NextRequest } from "next/server"
import { createServerClient, getSupabaseAdmin } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { responses } from "@/lib/utils/response"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // 현재 사용자 조회
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error("Auth error:", authError)
      return responses.unauthorized("인증이 필요합니다.")
    }

    // admin_users 정보 조회 (Service Role Key 사용하여 RLS 우회)
    const supabaseAdmin = getSupabaseAdmin()
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (adminError) {
      console.error("Admin user query error:", adminError)
      return responses.forbidden(
        `관리자 권한이 필요합니다. admin_users 테이블에 UID '${user.id}'가 등록되어 있는지 확인해주세요.`
      )
    }

    if (!adminUser) {
      return responses.forbidden("관리자 권한이 필요합니다.")
    }

    return responses.ok({
      id: user.id,
      email: user.email,
      name: adminUser.name,
      role: adminUser.role,
      is_active: adminUser.is_active,
      last_login_at: adminUser.last_login_at,
      created_at: adminUser.created_at,
    })
  } catch (error: any) {
    console.error("Get current user error:", error)
    return responses.serverError(
      error.message || "서버 오류가 발생했습니다."
    )
  }
}

