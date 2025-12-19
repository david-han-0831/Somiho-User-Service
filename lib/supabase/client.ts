/**
 * Supabase 클라이언트 설정 (Client Component용)
 * 브라우저에서 사용하는 Supabase 클라이언트
 */

import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // 새로운 publishable 키 또는 기존 anon 키 지원
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

