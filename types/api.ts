/**
 * API 공통 타입 정의
 */

// API 응답 기본 형식
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: ApiError
}

// API 에러 형식
export interface ApiError {
  code: string
  message: string
  details?: any
}

// 페이지네이션 메타 정보
export interface PaginationMeta {
  total: number
  page: number
  per_page: number
  total_pages: number
}

// 페이지네이션 응답
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// 검색/필터 파라미터
export interface SearchParams {
  q?: string // 검색어
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: "asc" | "desc"
}

// 회원 필터 파라미터
export interface MemberFilterParams extends SearchParams {
  status?: "waiting" | "approved" | "rejected" | "all"
  country?: string
}

// 제품 필터 파라미터
export interface ProductFilterParams extends SearchParams {
  grade?: number | "all" // 1~5 별점
  is_active?: boolean
}

// 예약 필터 파라미터
export interface ReservationFilterParams extends SearchParams {
  status?: "waiting" | "approved" | "rejected" | "all"
  member_id?: string
  product_id?: string
  from_date?: string
  to_date?: string
}

// 시세 필터 파라미터
export interface MarketPriceFilterParams extends SearchParams {
  country: "korea" | "china" | "japan"
  from_date?: string
  to_date?: string
}

// 공지사항 필터 파라미터
export interface NoticeFilterParams extends SearchParams {
  category?: "notice" | "news" | "all"
  is_published?: boolean
}

// 승인/반려 요청
export interface ApprovalRequest {
  memo?: string
}

export interface RejectionRequest {
  rejection_reason: string
}

// 로그인 요청/응답
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  token: string
  expires_at: string
}

// 파일 업로드 응답
export interface UploadResponse {
  url: string
  path: string
  size: number
}

