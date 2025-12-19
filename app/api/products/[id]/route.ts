/**
 * GET /api/products/[id] - 제품 상세 조회
 * PATCH /api/products/[id] - 제품 정보 수정
 * DELETE /api/products/[id] - 제품 삭제 (소프트 삭제)
 */

import { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { requireAuth } from "@/lib/middleware/auth"
import { responses } from "@/lib/utils/response"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET - 제품 상세 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return responses.notFound("제품을 찾을 수 없습니다.")
    }

    return responses.ok(data)
  } catch (error) {
    console.error("Get product error:", error)
    return responses.serverError()
  }
}

// PATCH - 제품 정보 수정
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { id } = await params
    const body = await request.json()
    
    // 허용된 필드만 업데이트
    const allowedFields = [
      "name", "grade", "production_date", "production_year", "origin", "origin_detail",
      "type", "size", "weight", "quantity", "price", "description", "thumbnail_url", "available_documents"
    ]
    const updates: any = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    if (Object.keys(updates).length === 0) {
      return responses.badRequest("수정할 항목이 없습니다.")
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Product update error:", error)
      return responses.serverError("제품 정보 수정 중 오류가 발생했습니다.")
    }

    return responses.ok(data, "제품 정보가 수정되었습니다.")
  } catch (error) {
    console.error("Update product error:", error)
    return responses.serverError()
  }
}

// DELETE - 제품 삭제 (소프트 삭제 + Storage 이미지 삭제)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 인증 확인
    const auth = await requireAuth(request)
    if ("error" in auth) {
      return Response.json(auth.error, { status: auth.status })
    }

    const { id } = await params
    
    // 1. Storage에서 상품 이미지 폴더 삭제
    try {
      // products/{product_id}/ 폴더의 모든 파일 목록 가져오기
      const { data: folders, error: listError } = await supabaseAdmin.storage
        .from("products")
        .list(id, {
          limit: 1000,
        })

      if (!listError && folders && folders.length > 0) {
        // 모든 하위 폴더와 파일 삭제
        const filesToDelete: string[] = []
        
        for (const folder of folders) {
          if (folder.id) {
            // 폴더인 경우 (thumbnails, img)
            const { data: files, error: filesError } = await supabaseAdmin.storage
              .from("products")
              .list(`${id}/${folder.name}`, {
                limit: 1000,
              })

            if (!filesError && files) {
              for (const file of files) {
                filesToDelete.push(`${id}/${folder.name}/${file.name}`)
              }
            }
          } else {
            // 파일인 경우
            filesToDelete.push(`${id}/${folder.name}`)
          }
        }

        // 모든 파일 삭제
        if (filesToDelete.length > 0) {
          const { error: deleteError } = await supabaseAdmin.storage
            .from("products")
            .remove(filesToDelete)

          if (deleteError) {
            console.error("Storage delete error:", deleteError)
            // Storage 삭제 실패해도 DB 삭제는 진행
          } else {
            console.log(`Deleted ${filesToDelete.length} image files for product ${id}`)
          }
        }
      }
    } catch (storageError) {
      console.error("Storage deletion error:", storageError)
      // Storage 삭제 실패해도 DB 삭제는 진행
    }

    // 2. 소프트 삭제 (is_active = false)
    const { error } = await supabaseAdmin
      .from("products")
      .update({ is_active: false })
      .eq("id", id)

    if (error) {
      console.error("Product delete error:", error)
      return responses.serverError("제품 삭제 중 오류가 발생했습니다.")
    }

    return responses.ok(null, "제품이 삭제되었습니다.")
  } catch (error) {
    console.error("Delete product error:", error)
    return responses.serverError()
  }
}

