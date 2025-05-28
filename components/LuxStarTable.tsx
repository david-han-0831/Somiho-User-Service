import LuxStarGrade from "./LuxStarGrade"
import LuxStarStandard from "./LuxStarStandard"

interface LuxStarTableProps {
  className?: string
  showGrade?: boolean
  showStandard?: boolean
}

export default function LuxStarTable({ className = "", showGrade = true, showStandard = true }: LuxStarTableProps) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      {showGrade && (
        <>
          <LuxStarGrade />
          {/* 구분선 추가 */}
          {showStandard && <div className="w-full border-b-2 border-orange-500/30 my-16"></div>}
        </>
      )}
      {showStandard && <LuxStarStandard />}
    </div>
  )
}
