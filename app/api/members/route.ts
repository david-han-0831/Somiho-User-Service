/**
 * GET /api/members - 회원 목록 조회
 * POST /api/members - 회원 등록
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses, paginatedResponse } from "@/lib/utils/response"
import type { MemberFilterParams } from "@/types/api"

// GET - 회원 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { searchParams } = new URL(request.url)
    
    // 쿼리 파라미터 파싱
    const params: MemberFilterParams = {
      q: searchParams.get("q") || undefined,
      status: (searchParams.get("status") as any) || "all",
      country: searchParams.get("country") || undefined,
      page: Number.parseInt(searchParams.get("page") || "1", 10),
      per_page: Number.parseInt(searchParams.get("per_page") || "20", 10),
      sort_by: searchParams.get("sort_by") || "created_at",
      sort_order: (searchParams.get("sort_order") as any) || "desc",
    }

    let query = supabaseAdmin
      .from("members")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params.q) {
      query = query.or(`company.ilike.%${params.q}%,manager.ilike.%${params.q}%,email.ilike.%${params.q}%`)
    }

    // 상태 필터
    if (params.status && params.status !== "all") {
      query = query.eq("status", params.status)
    }

    // 국가 필터
    if (params.country) {
      query = query.eq("country", params.country)
    }

    // 정렬
    query = query.order(params.sort_by!, { ascending: params.sort_order === "asc" })

    // 페이지네이션
    const start = (params.page! - 1) * params.per_page!
    const end = start + params.per_page! - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      console.error("Members query error:", error)
      return responses.serverError("회원 목록 조회 중 오류가 발생했습니다.")
    }

    return Response.json(
      paginatedResponse(data || [], count || 0, params.page!, params.per_page!)
    )
  } catch (error) {
    console.error("Get members error:", error)
    return responses.serverError()
  }
}

// POST - 회원 등록
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { company, manager, country, business_number, email, phone, business_license_url } = body

    // 필수값 검증
    if (!company || !manager || !country || !business_number || !email) {
      return responses.badRequest("필수 항목을 모두 입력해주세요.")
    }

    // 이메일 중복 확인
    const { data: existing } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("email", email)
      .single()

    if (existing) {
      return responses.conflict("이미 등록된 이메일입니다.")
    }

    // 사업자번호 중복 확인
    const { data: existingBusiness } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("business_number", business_number)
      .single()

    if (existingBusiness) {
      return responses.conflict("이미 등록된 사업자번호입니다.")
    }

    // 회원 등록
    const { data, error } = await supabaseAdmin
      .from("members")
      .insert({
        company,
        manager,
        country,
        business_number,
        email,
        phone,
        business_license_url,
        status: "waiting",
      })
      .select()
      .single()

    if (error) {
      console.error("Member insert error:", error)
      return responses.serverError("회원 등록 중 오류가 발생했습니다.")
    }

    return responses.created(data, "회원이 등록되었습니다.")
  } catch (error) {
    console.error("Create member error:", error)
    return responses.serverError()
  }
}

