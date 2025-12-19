/**
 * GET /api/reservations - 예약 목록 조회
 * POST /api/reservations - 예약 등록
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses, paginatedResponse } from "@/lib/utils/response"
import type { ReservationFilterParams } from "@/types/api"

// GET - 예약 목록 조회 (상세 정보 포함)
export async function GET(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { searchParams } = new URL(request.url)
    
    const params: ReservationFilterParams = {
      q: searchParams.get("q") || undefined,
      status: (searchParams.get("status") as any) || "all",
      member_id: searchParams.get("member_id") || undefined,
      product_id: searchParams.get("product_id") || undefined,
      from_date: searchParams.get("from_date") || undefined,
      to_date: searchParams.get("to_date") || undefined,
      page: Number.parseInt(searchParams.get("page") || "1", 10),
      per_page: Number.parseInt(searchParams.get("per_page") || "20", 10),
      sort_by: searchParams.get("sort_by") || "created_at",
      sort_order: (searchParams.get("sort_order") as any) || "desc",
    }

    // reservations_detailed 뷰 사용
    let query = supabaseAdmin
      .from("reservations_detailed")
      .select("*", { count: "exact" })

    // 상태 필터
    if (params.status && params.status !== "all") {
      query = query.eq("status", params.status)
    }

    // 회원 필터
    if (params.member_id) {
      query = query.eq("member_id", params.member_id)
    }

    // 제품 필터
    if (params.product_id) {
      query = query.eq("product_id", params.product_id)
    }

    // 날짜 범위 필터
    if (params.from_date) {
      query = query.gte("reservation_date", params.from_date)
    }
    if (params.to_date) {
      query = query.lte("reservation_date", params.to_date)
    }

    // 검색어 필터 (회사명, 제품명)
    if (params.q) {
      query = query.or(`company.ilike.%${params.q}%,product_name.ilike.%${params.q}%`)
    }

    // 정렬
    query = query.order(params.sort_by!, { ascending: params.sort_order === "asc" })

    // 페이지네이션
    const start = (params.page! - 1) * params.per_page!
    const end = start + params.per_page! - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      console.error("Reservations query error:", error)
      return responses.serverError("예약 목록 조회 중 오류가 발생했습니다.")
    }

    return Response.json(
      paginatedResponse(data || [], count || 0, params.page!, params.per_page!)
    )
  } catch (error) {
    console.error("Get reservations error:", error)
    return responses.serverError()
  }
}

// POST - 예약 등록
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { member_id, product_id, reservation_date, quantity, memo } = body

    // 필수값 검증
    if (!member_id || !product_id || !reservation_date) {
      return responses.badRequest("필수 항목을 모두 입력해주세요.")
    }

    // 예약 등록
    const { data, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        member_id,
        product_id,
        reservation_date,
        quantity: quantity || 1,
        memo,
        status: "waiting",
      })
      .select()
      .single()

    if (error) {
      console.error("Reservation insert error:", error)
      return responses.serverError("예약 등록 중 오류가 발생했습니다.")
    }

    return responses.created(data, "예약이 등록되었습니다.")
  } catch (error) {
    console.error("Create reservation error:", error)
    return responses.serverError()
  }
}

