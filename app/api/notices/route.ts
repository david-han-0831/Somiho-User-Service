/**
 * GET /api/notices - 공지사항 목록 조회
 * POST /api/notices - 공지사항 등록
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses, paginatedResponse } from "@/lib/utils/response"
import type { NoticeFilterParams } from "@/types/api"

// GET - 공지사항 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const params: NoticeFilterParams = {
      q: searchParams.get("q") || undefined,
      category: (searchParams.get("category") as any) || "all",
      is_published: searchParams.get("is_published") === "true" ? true : searchParams.get("is_published") === "false" ? false : undefined,
      page: Number.parseInt(searchParams.get("page") || "1", 10),
      per_page: Number.parseInt(searchParams.get("per_page") || "20", 10),
      sort_by: searchParams.get("sort_by") || "created_at",
      sort_order: (searchParams.get("sort_order") as any) || "desc",
    }

    let query = supabaseAdmin
      .from("notices")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params.q) {
      query = query.or(`title.ilike.%${params.q}%,content.ilike.%${params.q}%`)
    }

    // 분류 필터
    if (params.category && params.category !== "all") {
      query = query.eq("category", params.category)
    }

    // 게시 상태 필터
    if (params.is_published !== undefined) {
      query = query.eq("is_published", params.is_published)
    }

    // 정렬
    query = query.order(params.sort_by!, { ascending: params.sort_order === "asc" })

    // 페이지네이션
    const start = (params.page! - 1) * params.per_page!
    const end = start + params.per_page! - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      console.error("Notices query error:", error)
      return responses.serverError("공지사항 목록 조회 중 오류가 발생했습니다.")
    }

    return Response.json(
      paginatedResponse(data || [], count || 0, params.page!, params.per_page!)
    )
  } catch (error) {
    console.error("Get notices error:", error)
    return responses.serverError()
  }
}

// POST - 공지사항 등록
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { title, content, category, is_published } = body

    // 필수값 검증
    if (!title || !content || !category) {
      return responses.badRequest("필수 항목을 모두 입력해주세요.")
    }

    // 공지사항 등록
    const { data, error } = await supabaseAdmin
      .from("notices")
      .insert({
        title,
        content,
        category,
        is_published: is_published || false,
        author_id: auth.user.userId,
      })
      .select()
      .single()

    if (error) {
      console.error("Notice insert error:", error)
      return responses.serverError("공지사항 등록 중 오류가 발생했습니다.")
    }

    return responses.created(data, "공지사항이 등록되었습니다.")
  } catch (error) {
    console.error("Create notice error:", error)
    return responses.serverError()
  }
}

