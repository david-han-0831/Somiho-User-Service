import { Star } from "lucide-react"

interface StarRatingProps {
  grade: number // 1~5 별점
  size?: number
  showText?: boolean
}

export function StarRating({ grade, size = 16, showText = false }: StarRatingProps) {
  // 1~5 범위 확인
  const starCount = Math.max(1, Math.min(5, grade))

  // 등급 텍스트 변환 (옵션)
  const gradeText = starCount === 5 ? "최고급" : 
                    starCount === 4 ? "고급" : 
                    starCount === 3 ? "중급" : 
                    starCount === 2 ? "보통" : "일반"

  return (
    <span className="inline-flex items-center" title={`등급: ${starCount}점 (${gradeText})`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
      {showText && <span className="ml-1 text-xs text-gray-500">({starCount}점)</span>}
    </span>
  )
}
