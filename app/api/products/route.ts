/**
 * GET /api/products - 제품 목록 조회
 * POST /api/products - 제품 등록
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses, paginatedResponse } from "@/lib/utils/response"
import type { ProductFilterParams } from "@/types/api"

// GET - 제품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const params: ProductFilterParams = {
      q: searchParams.get("q") || undefined,
      grade: (searchParams.get("grade") as any) || "all",
      is_active: searchParams.get("is_active") === "false" ? false : true,
      page: Number.parseInt(searchParams.get("page") || "1", 10),
      per_page: Number.parseInt(searchParams.get("per_page") || "20", 10),
      sort_by: searchParams.get("sort_by") || "created_at",
      sort_order: (searchParams.get("sort_order") as any) || "desc",
    }

    let query = supabaseAdmin
      .from("products")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params.q) {
      query = query.or(`name.ilike.%${params.q}%,code.ilike.%${params.q}%`)
    }

    // 등급 필터
    if (params.grade && params.grade !== "all") {
      query = query.eq("grade", params.grade)
    }

    // 활성화 상태 필터
    query = query.eq("is_active", params.is_active)

    // 정렬
    query = query.order(params.sort_by!, { ascending: params.sort_order === "asc" })

    // 페이지네이션
    const start = (params.page! - 1) * params.per_page!
    const end = start + params.per_page! - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      console.error("Products query error:", error)
      return responses.serverError("제품 목록 조회 중 오류가 발생했습니다.")
    }

    return Response.json(
      paginatedResponse(data || [], count || 0, params.page!, params.per_page!)
    )
  } catch (error) {
    console.error("Get products error:", error)
    return responses.serverError()
  }
}

// POST - 제품 등록
export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const body = await request.json()
    const { 
      name, grade, production_date, production_year, code, origin, origin_detail,
      type, size, weight, quantity, price, description, thumbnail_url, available_documents 
    } = body

    // 필수값 검증
    if (!name || !grade || !production_date || !production_year || !origin || !type || !size || !weight || !quantity || !price) {
      return responses.badRequest("필수 항목을 모두 입력해주세요.")
    }

    // 상품코드 자동 생성 (없거나 중복인 경우)
    let finalCode = code
    if (!finalCode || finalCode.trim() === "") {
      // 생산일자를 기반으로 코드 생성
      const dateStr = production_date.replace(/-/g, "").substring(0, 8)
      finalCode = `${dateStr}-001`
    }

    // 코드 중복 확인 및 자동 조정
    let codeExists = true
    let attemptCount = 0
    const maxAttempts = 1000 // 최대 1000개까지 시도

    while (codeExists && attemptCount < maxAttempts) {
      const { data: existing } = await supabaseAdmin
        .from("products")
        .select("id")
        .eq("code", finalCode)
        .single()

      if (!existing) {
        codeExists = false
      } else {
        // 다음 번호로 증가
        const parts = finalCode.split("-")
        if (parts.length === 2) {
          const number = Number.parseInt(parts[1]) + 1
          if (number > 999) {
            return responses.badRequest("해당 날짜의 상품코드가 모두 사용되었습니다.")
          }
          finalCode = `${parts[0]}-${String(number).padStart(3, "0")}`
        } else {
          // 형식이 잘못된 경우
          const dateStr = production_date.replace(/-/g, "").substring(0, 8)
          finalCode = `${dateStr}-001`
        }
        attemptCount++
      }
    }

    if (codeExists) {
      return responses.badRequest("상품코드 생성에 실패했습니다. 다시 시도해주세요.")
    }

    // 제품 등록
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        grade,
        production_date,
        production_year,
        code: finalCode,
        origin,
        origin_detail: origin_detail || null,
        type,
        size,
        weight,
        quantity,
        price,
        description: description || null,
        thumbnail_url: thumbnail_url || null,
        available_documents: available_documents || [],
        created_by: auth.user.userId,
      })
      .select()
      .single()

    if (error) {
      console.error("Product insert error:", error)
      return responses.serverError("제품 등록 중 오류가 발생했습니다.")
    }

    return responses.created(data, "제품이 등록되었습니다.")
  } catch (error) {
    console.error("Create product error:", error)
    return responses.serverError()
  }
}

