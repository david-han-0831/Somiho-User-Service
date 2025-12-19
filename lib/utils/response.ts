/**
 * API 응답 유틸리티
 */

import type { ApiResponse, ApiError } from "@/types/api"

/**
 * 성공 응답 생성
 */
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  }
}

/**
 * 에러 응답 생성
 */
export function errorResponse(
  message: string,
  code: string = "ERROR",
  details?: any
): ApiResponse {
  return {
    success: false,
    message,
    error: {
      code,
      message,
      details,
    },
  }
}

/**
 * 페이지네이션 응답 생성
 */
export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  perPage: number
) {
  return {
    success: true,
    data,
    meta: {
      total,
      page,
      per_page: perPage,
      total_pages: Math.ceil(total / perPage),
    },
  }
}

/**
 * HTTP 상태 코드별 응답 헬퍼
 */
export const responses = {
  ok: <T>(data: T, message?: string) => 
    Response.json(successResponse(data, message), { status: 200 }),
  
  created: <T>(data: T, message?: string) => 
    Response.json(successResponse(data, message), { status: 201 }),
  
  noContent: () => 
    new Response(null, { status: 204 }),
  
  badRequest: (message: string, details?: any) => 
    Response.json(errorResponse(message, "BAD_REQUEST", details), { status: 400 }),
  
  unauthorized: (message: string = "인증이 필요합니다.") => 
    Response.json(errorResponse(message, "UNAUTHORIZED"), { status: 401 }),
  
  forbidden: (message: string = "권한이 없습니다.") => 
    Response.json(errorResponse(message, "FORBIDDEN"), { status: 403 }),
  
  notFound: (message: string = "리소스를 찾을 수 없습니다.") => 
    Response.json(errorResponse(message, "NOT_FOUND"), { status: 404 }),
  
  conflict: (message: string, details?: any) => 
    Response.json(errorResponse(message, "CONFLICT", details), { status: 409 }),
  
  serverError: (message: string = "서버 오류가 발생했습니다.", details?: any) => 
    Response.json(errorResponse(message, "INTERNAL_ERROR", details), { status: 500 }),
}

