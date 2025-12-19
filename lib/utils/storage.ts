/**
 * Supabase Storage 유틸리티
 * 이미지 업로드 및 관리
 */

import { createClient } from "@/lib/supabase/client"

const BUCKET_NAME = "products" // 상품 이미지용 bucket

/**
 * 이미지 파일 업로드
 * @param file 업로드할 파일
 * @param path 저장 경로 (예: "thumbnails/product-123.jpg")
 * @returns 업로드된 파일의 public URL
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const supabase = createClient()

    // 파일 타입 검증
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "JPEG, PNG, WebP 파일만 업로드 가능합니다.",
      }
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: "파일 크기는 5MB 이하여야 합니다.",
      }
    }

    // 파일 업로드
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false, // 기존 파일 덮어쓰기 방지
      })

    if (error) {
      console.error("Storage upload error:", error)
      return {
        success: false,
        error: error.message || "이미지 업로드에 실패했습니다.",
      }
    }

    // Public URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

    return {
      success: true,
      url: publicUrl,
    }
  } catch (error: any) {
    console.error("Upload image error:", error)
    return {
      success: false,
      error: error.message || "이미지 업로드 중 오류가 발생했습니다.",
    }
  }
}

/**
 * 이미지 파일 삭제
 * @param path 삭제할 파일 경로
 */
export async function deleteImage(
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // URL에서 경로 추출 (전체 URL이 들어온 경우)
    const pathToDelete = path.includes(BUCKET_NAME)
      ? path.split(`${BUCKET_NAME}/`)[1]
      : path

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([pathToDelete])

    if (error) {
      console.error("Storage delete error:", error)
      return {
        success: false,
        error: error.message || "이미지 삭제에 실패했습니다.",
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Delete image error:", error)
    return {
      success: false,
      error: error.message || "이미지 삭제 중 오류가 발생했습니다.",
    }
  }
}

/**
 * 고유한 파일 경로 생성
 * @param productId 상품 ID (필수)
 * @param filename 원본 파일명
 * @param type 이미지 타입 ("thumbnail" | "image")
 * @returns 저장 경로 (예: "products/{product_id}/thumbnails/{filename}" 또는 "products/{product_id}/img/{filename}")
 */
export function generateImagePath(
  productId: string,
  filename: string,
  type: "thumbnail" | "image" = "image"
): string {
  if (!productId) {
    throw new Error("productId is required")
  }

  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  const extension = filename.split(".").pop() || "jpg"
  const folder = type === "thumbnail" ? "thumbnails" : "img"

  // products/{product_id}/thumbnails/{timestamp}-{random}.{extension}
  // 또는 products/{product_id}/img/{timestamp}-{random}.{extension}
  return `${productId}/${folder}/${timestamp}-${random}.${extension}`
}

/**
 * 이미지 파일 미리보기 URL 생성
 */
export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error("파일 읽기 실패"))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 상품의 일반 이미지 목록 가져오기
 * @param productId 상품 ID
 * @returns 이미지 URL 배열
 */
export async function getProductImages(
  productId: string
): Promise<{ success: boolean; urls?: string[]; error?: string }> {
  try {
    const supabase = createClient()
    
    // products/{product_id}/img/ 폴더의 파일 목록 가져오기
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(`${productId}/img`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })

    if (error) {
      console.error("Storage list error:", error)
      // 폴더가 없을 수도 있으므로 빈 배열 반환
      return {
        success: true,
        urls: [],
      }
    }

    // Public URL 생성
    const urls = (data || [])
      .filter((file) => {
        // 이미지 파일만 필터링
        const ext = file.name.split(".").pop()?.toLowerCase()
        return ["jpg", "jpeg", "png", "webp"].includes(ext || "")
      })
      .map((file) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET_NAME).getPublicUrl(`${productId}/img/${file.name}`)
        return publicUrl
      })

    return {
      success: true,
      urls,
    }
  } catch (error: any) {
    console.error("Get product images error:", error)
    return {
      success: false,
      error: error.message || "이미지 목록을 가져오는 중 오류가 발생했습니다.",
    }
  }
}

/**
 * 상품의 모든 이미지 폴더 삭제
 * @param productId 상품 ID
 * @returns 삭제 성공 여부
 */
export async function deleteProductImages(
  productId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    // products/{product_id}/ 폴더의 모든 파일 목록 가져오기
    const { data: folders, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(productId, {
        limit: 1000,
      })

    if (listError) {
      console.error("Storage list error:", listError)
      // 폴더가 없을 수도 있으므로 성공으로 처리
      return {
        success: true,
      }
    }

    if (!folders || folders.length === 0) {
      // 이미지가 없는 경우
      return {
        success: true,
      }
    }

    // 모든 하위 폴더와 파일 삭제
    const filesToDelete: string[] = []
    
    for (const folder of folders) {
      if (folder.id) {
        // 폴더인 경우 (thumbnails, img)
        const { data: files, error: filesError } = await supabase.storage
          .from(BUCKET_NAME)
          .list(`${productId}/${folder.name}`, {
            limit: 1000,
          })

        if (!filesError && files) {
          for (const file of files) {
            filesToDelete.push(`${productId}/${folder.name}/${file.name}`)
          }
        }
      } else {
        // 파일인 경우
        filesToDelete.push(`${productId}/${folder.name}`)
      }
    }

    // 모든 파일 삭제
    if (filesToDelete.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(filesToDelete)

      if (deleteError) {
        console.error("Storage delete error:", deleteError)
        return {
          success: false,
          error: deleteError.message || "이미지 삭제에 실패했습니다.",
        }
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Delete product images error:", error)
    return {
      success: false,
      error: error.message || "이미지 삭제 중 오류가 발생했습니다.",
    }
  }
}


