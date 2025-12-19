/**
 * API 클라이언트 레이어
 * 프론트엔드에서 사용하는 API 호출 헬퍼 함수들
 */

import { createClient } from "@/lib/supabase/client"
import type {
  ApiResponse,
  PaginatedResponse,
  MemberFilterParams,
  ProductFilterParams,
  ReservationFilterParams,
  MarketPriceFilterParams,
  NoticeFilterParams,
  ApprovalRequest,
  RejectionRequest,
} from "@/types/api"
import type { Database } from "@/types/supabase"

type Member = Database["public"]["Tables"]["members"]["Row"]
type Product = Database["public"]["Tables"]["products"]["Row"]
type Reservation = Database["public"]["Views"]["reservations_detailed"]["Row"]
type MarketPrice = Database["public"]["Tables"]["market_prices"]["Row"]
type Notice = Database["public"]["Tables"]["notices"]["Row"]

/**
 * URL 쿼리 파라미터 생성 헬퍼
 */
function buildQueryString(params: Record<string, any>): string {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")
  
  return filtered ? `?${filtered}` : ""
}

// ==========================================
// 인증 API
// ==========================================

export const authApi = {
  /**
   * 로그인
   */
  async login(email: string, password: string): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "AUTH_ERROR", message: error.message },
      }
    }

    // admin_users 확인
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (!adminUser) {
      await supabase.auth.signOut()
      return {
        success: false,
        message: "관리자 권한이 필요합니다.",
        error: { code: "FORBIDDEN", message: "관리자 권한이 필요합니다." },
      }
    }

    return {
      success: true,
      message: "로그인 성공",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: adminUser.name,
          role: adminUser.role,
        },
        session: data.session,
      },
    }
  },

  /**
   * 로그아웃
   */
  async logout(): Promise<ApiResponse> {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "AUTH_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "로그아웃 성공",
    }
  },

  /**
   * 현재 사용자 조회
   */
  async getCurrentUser(): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        success: false,
        message: "인증이 필요합니다.",
        error: { code: "UNAUTHORIZED", message: "인증이 필요합니다." },
      }
    }

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: adminUser?.name,
        role: adminUser?.role,
      },
    }
  },
}

// ==========================================
// 회원 API
// ==========================================

export const membersApi = {
  /**
   * 회원 목록 조회
   */
  async getMembers(params?: MemberFilterParams): Promise<PaginatedResponse<Member>> {
    const supabase = createClient()
    
    let query = supabase
      .from("members")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params?.q) {
      query = query.or(`company.ilike.%${params.q}%,manager.ilike.%${params.q}%,email.ilike.%${params.q}%`)
    }

    // 상태 필터
    if (params?.status && params.status !== "all") {
      query = query.eq("status", params.status)
    }

    // 국가 필터
    if (params?.country) {
      query = query.eq("country", params.country)
    }

    // 정렬
    const sortBy = params?.sort_by || "created_at"
    const sortOrder = params?.sort_order === "asc"
    query = query.order(sortBy, { ascending: sortOrder })

    // 페이지네이션
    const page = params?.page || 1
    const perPage = params?.per_page || 20
    const start = (page - 1) * perPage
    const end = start + perPage - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
        meta: { total: 0, page, per_page: perPage, total_pages: 0 },
      }
    }

    return {
      success: true,
      data: data || [],
      meta: {
        total: count || 0,
        page,
        per_page: perPage,
        total_pages: Math.ceil((count || 0) / perPage),
      },
    }
  },

  /**
   * 회원 상세 조회
   */
  async getMember(id: string): Promise<ApiResponse<Member>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return {
        success: false,
        message: "회원을 찾을 수 없습니다.",
        error: { code: "NOT_FOUND", message: "회원을 찾을 수 없습니다." },
      }
    }

    return {
      success: true,
      data,
    }
  },

  /**
   * 회원 승인
   */
  async approveMember(id: string, request?: ApprovalRequest): Promise<ApiResponse<Member>> {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("approve_member", {
      p_member_id: id,
      p_admin_id: (await supabase.auth.getUser()).data.user?.id!,
      p_memo: request?.memo || null,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "RPC_ERROR", message: error.message },
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message,
        error: { code: "APPROVAL_FAILED", message: data.message },
      }
    }

    // 업데이트된 회원 정보 조회
    const updated = await this.getMember(id)
    return updated
  },

  /**
   * 회원 반려
   */
  async rejectMember(id: string, request: RejectionRequest): Promise<ApiResponse<Member>> {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("reject_member", {
      p_member_id: id,
      p_admin_id: (await supabase.auth.getUser()).data.user?.id!,
      p_rejection_reason: request.rejection_reason,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "RPC_ERROR", message: error.message },
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message,
        error: { code: "REJECTION_FAILED", message: data.message },
      }
    }

    const updated = await this.getMember(id)
    return updated
  },
}

// ==========================================
// 제품 API
// ==========================================

export const productsApi = {
  /**
   * 제품 목록 조회
   */
  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse<Product>> {
    const supabase = createClient()
    
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params?.q) {
      query = query.or(`name.ilike.%${params.q}%,code.ilike.%${params.q}%`)
    }

    // 등급 필터
    if (params?.grade && params.grade !== "all") {
      query = query.eq("grade", params.grade)
    }

    // 활성화 상태 필터
    const isActive = params?.is_active !== false
    query = query.eq("is_active", isActive)

    // 정렬
    const sortBy = params?.sort_by || "created_at"
    const sortOrder = params?.sort_order === "asc"
    query = query.order(sortBy, { ascending: sortOrder })

    // 페이지네이션
    const page = params?.page || 1
    const perPage = params?.per_page || 20
    const start = (page - 1) * perPage
    const end = start + perPage - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
        meta: { total: 0, page, per_page: perPage, total_pages: 0 },
      }
    }

    return {
      success: true,
      data: data || [],
      meta: {
        total: count || 0,
        page,
        per_page: perPage,
        total_pages: Math.ceil((count || 0) / perPage),
      },
    }
  },

  /**
   * 제품 상세 조회
   */
  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return {
        success: false,
        message: "제품을 찾을 수 없습니다.",
        error: { code: "NOT_FOUND", message: "제품을 찾을 수 없습니다." },
      }
    }

    return {
      success: true,
      data,
    }
  },

  /**
   * 제품 등록
   */
  async createProduct(product: Database["public"]["Tables"]["products"]["Insert"]): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "제품 등록에 실패했습니다.",
          error: result.error,
        }
      }

      return {
        success: true,
        message: result.message || "제품이 등록되었습니다.",
        data: result.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "제품 등록 중 오류가 발생했습니다.",
        error: { code: "NETWORK_ERROR", message: error.message },
      }
    }
  },

  /**
   * 제품 수정
   */
  async updateProduct(id: string, product: Database["public"]["Tables"]["products"]["Update"]): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "제품 수정에 실패했습니다.",
          error: result.error,
        }
      }

      return {
        success: true,
        message: result.message || "제품이 수정되었습니다.",
        data: result.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "제품 수정 중 오류가 발생했습니다.",
        error: { code: "NETWORK_ERROR", message: error.message },
      }
    }
  },

  /**
   * 제품 삭제 (소프트 삭제 + Storage 이미지 삭제)
   */
  async deleteProduct(id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "제품 삭제에 실패했습니다.",
          error: result.error,
        }
      }

      return {
        success: true,
        message: result.message || "제품이 삭제되었습니다.",
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "제품 삭제 중 오류가 발생했습니다.",
        error: { code: "NETWORK_ERROR", message: error.message },
      }
    }
  },
}

// ==========================================
// 예약 API
// ==========================================

export const reservationsApi = {
  /**
   * 예약 목록 조회 (상세 정보 포함)
   */
  async getReservations(params?: ReservationFilterParams): Promise<PaginatedResponse<Reservation>> {
    const supabase = createClient()
    
    let query = supabase
      .from("reservations_detailed")
      .select("*", { count: "exact" })

    // 상태 필터
    if (params?.status && params.status !== "all") {
      query = query.eq("status", params.status)
    }

    // 회원 필터
    if (params?.member_id) {
      query = query.eq("member_id", params.member_id)
    }

    // 제품 필터
    if (params?.product_id) {
      query = query.eq("product_id", params.product_id)
    }

    // 날짜 범위 필터
    if (params?.from_date) {
      query = query.gte("reservation_date", params.from_date)
    }
    if (params?.to_date) {
      query = query.lte("reservation_date", params.to_date)
    }

    // 검색어 필터
    if (params?.q) {
      query = query.or(`company.ilike.%${params.q}%,product_name.ilike.%${params.q}%`)
    }

    // 정렬
    const sortBy = params?.sort_by || "created_at"
    const sortOrder = params?.sort_order === "asc"
    query = query.order(sortBy, { ascending: sortOrder })

    // 페이지네이션
    const page = params?.page || 1
    const perPage = params?.per_page || 20
    const start = (page - 1) * perPage
    const end = start + perPage - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
        meta: { total: 0, page, per_page: perPage, total_pages: 0 },
      }
    }

    return {
      success: true,
      data: data || [],
      meta: {
        total: count || 0,
        page,
        per_page: perPage,
        total_pages: Math.ceil((count || 0) / perPage),
      },
    }
  },

  /**
   * 예약 승인
   */
  async approveReservation(id: string): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("approve_reservation", {
      p_reservation_id: id,
      p_admin_id: (await supabase.auth.getUser()).data.user?.id!,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "RPC_ERROR", message: error.message },
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message,
        error: { code: "APPROVAL_FAILED", message: data.message },
      }
    }

    return {
      success: true,
      message: data.message,
    }
  },

  /**
   * 예약 반려
   */
  async rejectReservation(id: string, request: RejectionRequest): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("reject_reservation", {
      p_reservation_id: id,
      p_admin_id: (await supabase.auth.getUser()).data.user?.id!,
      p_rejection_reason: request.rejection_reason,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "RPC_ERROR", message: error.message },
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message,
        error: { code: "REJECTION_FAILED", message: data.message },
      }
    }

    return {
      success: true,
      message: data.message,
    }
  },
}

// ==========================================
// 시세 API
// ==========================================

export const marketPricesApi = {
  /**
   * 시세 목록 조회
   */
  async getMarketPrices(params: MarketPriceFilterParams): Promise<ApiResponse<MarketPrice[]>> {
    const supabase = createClient()
    
    let query = supabase
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
    const page = params.page || 1
    const perPage = params.per_page || 30
    const start = (page - 1) * perPage
    const end = start + perPage - 1
    query = query.range(start, end)

    const { data, error } = await query

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      data: data || [],
    }
  },

  /**
   * 시세 등록
   */
  async createMarketPrice(marketPrice: Database["public"]["Tables"]["market_prices"]["Insert"]): Promise<ApiResponse<MarketPrice>> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from("market_prices")
      .insert({
        ...marketPrice,
        author_id: user?.id,
      })
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "INSERT_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "시세가 등록되었습니다.",
      data,
    }
  },

  /**
   * 시세 수정
   */
  async updateMarketPrice(id: string, marketPrice: Database["public"]["Tables"]["market_prices"]["Update"]): Promise<ApiResponse<MarketPrice>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("market_prices")
      .update(marketPrice)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "UPDATE_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "시세가 수정되었습니다.",
      data,
    }
  },

  /**
   * 시세 삭제
   */
  async deleteMarketPrice(id: string): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from("market_prices")
      .delete()
      .eq("id", id)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "DELETE_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "시세가 삭제되었습니다.",
    }
  },
}

// ==========================================
// 공지사항 API
// ==========================================

export const noticesApi = {
  /**
   * 공지사항 목록 조회
   */
  async getNotices(params?: NoticeFilterParams): Promise<PaginatedResponse<Notice>> {
    const supabase = createClient()
    
    let query = supabase
      .from("notices")
      .select("*", { count: "exact" })

    // 검색어 필터
    if (params?.q) {
      query = query.or(`title.ilike.%${params.q}%,content.ilike.%${params.q}%`)
    }

    // 분류 필터
    if (params?.category && params.category !== "all") {
      query = query.eq("category", params.category)
    }

    // 게시 상태 필터
    if (params?.is_published !== undefined) {
      query = query.eq("is_published", params.is_published)
    }

    // 정렬
    const sortBy = params?.sort_by || "created_at"
    const sortOrder = params?.sort_order === "asc"
    query = query.order(sortBy, { ascending: sortOrder })

    // 페이지네이션
    const page = params?.page || 1
    const perPage = params?.per_page || 20
    const start = (page - 1) * perPage
    const end = start + perPage - 1
    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
        meta: { total: 0, page, per_page: perPage, total_pages: 0 },
      }
    }

    return {
      success: true,
      data: data || [],
      meta: {
        total: count || 0,
        page,
        per_page: perPage,
        total_pages: Math.ceil((count || 0) / perPage),
      },
    }
  },

  /**
   * 공지사항 상세 조회
   */
  async getNotice(id: string): Promise<ApiResponse<Notice>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return {
        success: false,
        message: "공지사항을 찾을 수 없습니다.",
        error: { code: "NOT_FOUND", message: "공지사항을 찾을 수 없습니다." },
      }
    }

    return {
      success: true,
      data,
    }
  },

  /**
   * 공지사항 등록
   */
  async createNotice(notice: Database["public"]["Tables"]["notices"]["Insert"]): Promise<ApiResponse<Notice>> {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from("notices")
      .insert({
        ...notice,
        author_id: user?.id,
      })
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "INSERT_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "공지사항이 등록되었습니다.",
      data,
    }
  },

  /**
   * 공지사항 수정
   */
  async updateNotice(id: string, notice: Database["public"]["Tables"]["notices"]["Update"]): Promise<ApiResponse<Notice>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("notices")
      .update(notice)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "UPDATE_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "공지사항이 수정되었습니다.",
      data,
    }
  },

  /**
   * 공지사항 삭제
   */
  async deleteNotice(id: string): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { error } = await supabase
      .from("notices")
      .delete()
      .eq("id", id)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "DELETE_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      message: "공지사항이 삭제되었습니다.",
    }
  },

  /**
   * 공지사항 게시/미게시 토글
   */
  async togglePublish(id: string): Promise<ApiResponse<Notice>> {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("toggle_notice_published", {
      p_notice_id: id,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "RPC_ERROR", message: error.message },
      }
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message,
        error: { code: "TOGGLE_FAILED", message: data.message },
      }
    }

    const updated = await this.getNotice(id)
    return updated
  },
}

// ==========================================
// 대시보드 API
// ==========================================

export const dashboardApi = {
  /**
   * 대시보드 통계 조회
   */
  async getStats(): Promise<ApiResponse> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("dashboard_stats")
      .select("*")
      .single()

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      data,
    }
  },

  /**
   * 최근 제품 조회
   */
  async getRecentProducts(limit: number = 5): Promise<ApiResponse<Product[]>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      data: data || [],
    }
  },

  /**
   * 최근 예약 조회
   */
  async getRecentReservations(limit: number = 5): Promise<ApiResponse<Reservation[]>> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("reservations_detailed")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) {
      return {
        success: false,
        message: error.message,
        error: { code: "QUERY_ERROR", message: error.message },
      }
    }

    return {
      success: true,
      data: data || [],
    }
  },
}

