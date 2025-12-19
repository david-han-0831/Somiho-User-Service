/**
 * API Route 인증 미들웨어 (Supabase Auth)
 */

import { createServerClient, getSupabaseAdmin } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import type { ApiResponse } from "@/types/api"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

/**
 * 인증 필요한 API Route에서 사용하는 미들웨어
 * 
 * @example
 * export async function GET(request: NextRequest) {
 *   const auth = await requireAuth(request)
 *   if ('error' in auth) {
 *     return Response.json(auth.error, { status: auth.status })
 *   }
 *   const user = auth.user
 *   // ... 로직 진행
 * }
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ user: AuthUser } | { error: ApiResponse; status: number }> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // Supabase Auth로 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        error: {
          success: false,
          message: "인증이 필요합니다.",
          error: {
            code: "UNAUTHORIZED",
            message: "로그인이 필요합니다.",
          },
        },
        status: 401,
      }
    }

    // admin_users 테이블에서 추가 정보 조회 (Service Role Key 사용하여 RLS 우회)
    const supabaseAdmin = getSupabaseAdmin()
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (adminError || !adminUser) {
      return {
        error: {
          success: false,
          message: "관리자 정보를 찾을 수 없습니다.",
          error: {
            code: "FORBIDDEN",
            message: "관리자 권한이 필요합니다.",
          },
        },
        status: 403,
      }
    }

    if (!adminUser.is_active) {
      return {
        error: {
          success: false,
          message: "비활성화된 계정입니다.",
          error: {
            code: "FORBIDDEN",
            message: "접근 권한이 없습니다.",
          },
        },
        status: 403,
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email!,
        name: adminUser.name,
        role: adminUser.role,
      },
    }
  } catch (error: any) {
    console.error("requireAuth error:", error)
    return {
      error: {
        success: false,
        message: error.message || "인증 처리 중 오류가 발생했습니다.",
        error: {
          code: "INTERNAL_ERROR",
          message: error.message || "서버 오류",
        },
      },
      status: 500,
    }
  }
}

/**
 * 역할 기반 접근 제어 (RBAC)
 */
export function requireRole(
  user: AuthUser,
  allowedRoles: string[]
): { error: ApiResponse; status: number } | null {
  if (!allowedRoles.includes(user.role)) {
    return {
      error: {
        success: false,
        message: "권한이 없습니다.",
        error: {
          code: "FORBIDDEN",
          message: `이 작업은 ${allowedRoles.join(", ")} 역할이 필요합니다.`,
        },
      },
      status: 403,
    }
  }

  return null
}

