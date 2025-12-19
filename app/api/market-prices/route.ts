/**
 * GET /api/market-prices - 시세 목록 조회
 * POST /api/market-prices - 시세 등록
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses } from "@/lib/utils/response"
import type { MarketPriceFilterParams } from "@/types/api"

// GET - 시세 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const params: MarketPriceFilterParams = {
      country: (searchParams.get("country") as any) || "korea",
      from_date: searchParams.get("from_date") || undefined,
      to_date: searchParams.get("to_date") || undefined,
      page: Number.parseInt(searchParams.get("page") || "1", 10),
      per_page: Number.parseInt(searchParams.get("per_page") || "30", 10),
    }

    let query = supabaseAdmin
      .from("market_prices")
      .select("*")
      .eq("country", params.country)

    // 날짜 범위 필터
    if (params.from_date) {
      query = query.gte("date", params.from_date)
    }
    if (params.to_date) {
      query = query.lte("date", params.to_date)
    }

    // 날짜 내림차순 정렬
    query = query.order("date", { ascending: false })

    // 페이지네이션
    const start = (params.page! - 1) * params.per_page!
    const end = start + params.per_page! - 1
    query = query.range(start, end)

    const { data, error } = await query

    if (error) {
      console.error("Market prices query error:", error)
      return responses.serverError("시세 목록 조회 중 오류가 발생했습니다.")
    }

    return responses.ok(data || [])
  } catch (error) {
    console.error("Get market prices error:", error)
    return responses.serverError()
  }
}

// POST - 시세 등록
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { country, date, price, memo } = body

    // 필수값 검증
    if (!country || !date || !price) {
      return responses.badRequest("필수 항목을 모두 입력해주세요.")
    }

    // 중복 확인 (국가-날짜 조합)
    const { data: existing } = await supabaseAdmin
      .from("market_prices")
      .select("id")
      .eq("country", country)
      .eq("date", date)
      .single()

    if (existing) {
      return responses.conflict("해당 날짜의 시세가 이미 등록되어 있습니다.")
    }

    // 시세 등록
    const { data, error } = await supabaseAdmin
      .from("market_prices")
      .insert({
        country,
        date,
        price,
        memo,
        author_id: auth.user.userId,
      })
      .select()
      .single()

    if (error) {
      console.error("Market price insert error:", error)
      return responses.serverError("시세 등록 중 오류가 발생했습니다.")
    }

    return responses.created(data, "시세가 등록되었습니다.")
  } catch (error) {
    console.error("Create market price error:", error)
    return responses.serverError()
  }
}

