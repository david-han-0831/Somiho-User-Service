/**
 * POST /api/auth/login
 * 관리자 로그인 API (Supabase Auth)
 */

import { NextRequest } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { responses } from "@/lib/utils/response"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 입력값 검증
    if (!email || !password) {
      return responses.badRequest("이메일과 비밀번호를 입력해주세요.")
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // Supabase Auth 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return responses.unauthorized("이메일 또는 비밀번호가 올바르지 않습니다.")
    }

    if (!data.user) {
      return responses.unauthorized("로그인에 실패했습니다.")
    }

    // admin_users 테이블에서 추가 정보 조회
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (adminError || !adminUser) {
      // 관리자가 아님
      await supabase.auth.signOut()
      return responses.forbidden("관리자 권한이 필요합니다.")
    }

    if (!adminUser.is_active) {
      await supabase.auth.signOut()
      return responses.forbidden("비활성화된 계정입니다. 관리자에게 문의하세요.")
    }

    // 마지막 로그인 시간 업데이트
    await supabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", data.user.id)

    return responses.ok(
      {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: adminUser.name,
          role: adminUser.role,
        },
        session: {
          access_token: data.session?.access_token,
          expires_at: data.session?.expires_at,
        },
      },
      "로그인 성공"
    )
  } catch (error) {
    console.error("Login error:", error)
    return responses.serverError("로그인 처리 중 오류가 발생했습니다.")
  }
}

