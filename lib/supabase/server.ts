/**
 * Supabase 서버 클라이언트 설정
 * Next.js Server Components 및 API Routes에서 사용
 */

import { createServerClient as createClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

/**
 * Server Component 및 Route Handler용 Supabase 클라이언트
 * 쿠키 기반 세션 관리
 * 
 * Next.js 16: cookies()는 이제 Promise를 반환하므로 await가 필요합니다.
 */
export function createServerClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // 새로운 publishable 키 또는 기존 anon 키 지원
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component에서는 set이 안될 수 있음
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // Server Component에서는 remove가 안될 수 있음
          }
        },
      },
    }
  )
}

/**
 * Admin 전용 클라이언트 (Service Role Key 사용)
 * RLS를 우회하므로 서버 사이드에서만 사용
 */
export function createAdminClient() {
  // 동적 import 사용 (Next.js 16 호환)
  const { createClient } = require("@supabase/supabase-js")
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase 환경 변수가 설정되지 않았습니다. " +
      "NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 확인해주세요."
    )
  }
  
  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

/**
 * Admin 전용 클라이언트 인스턴스 (Service Role Key 사용)
 * API Routes에서 직접 사용할 수 있는 싱글톤 인스턴스
 * 
 * ⚠️ 주의: Service Role Key는 RLS를 우회하므로 서버 사이드에서만 사용하세요.
 * 클라이언트 사이드에서는 절대 사용하지 마세요.
 */
let supabaseAdminInstance: ReturnType<typeof createAdminClient> | null = null

export function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createAdminClient()
  }
  return supabaseAdminInstance
}

// 하위 호환성을 위한 export
export const supabaseAdmin = getSupabaseAdmin()

