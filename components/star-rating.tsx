import { Star } from "lucide-react"

interface StarRatingProps {
  grade: string
  size?: number
  showText?: boolean
}

export function StarRating({ grade, size = 16, showText = false }: StarRatingProps) {
  // 등급을 별 개수로 변환
  const getStarCount = (grade: string): number => {
    switch (grade) {
      case "A+":
        return 5
      case "A":
        return 4
      case "B+":
        return 3
      case "B":
        return 2
      case "C":
        return 1
      default:
        return 0
    }
  }

  const starCount = getStarCount(grade)

  return (
    <span className="inline-flex items-center" title={`등급: ${grade}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
      {showText && <span className="ml-1 text-xs text-gray-500">({grade})</span>}
    </span>
  )
}
