import { Star, StarHalf } from "lucide-react"

interface LuxStarGradeProps {
  className?: string
}

export default function LuxStarGrade({ className = "" }: LuxStarGradeProps) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: "#F95700" }}>
          룩스스타 등급
        </h3>
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: "rgba(249, 87, 0, 0.15)" }}>
                <th
                  className="border border-gray-200 px-2 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  윤기
                </th>
                <th
                  className="border border-gray-200 px-2 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  구멍기
                </th>
                <th
                  className="border border-gray-200 px-2 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  색태
                </th>
                <th
                  className="border border-gray-200 px-2 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  이물
                </th>
                <th
                  className="border border-gray-200 px-3 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  주름
                </th>
                <th
                  className="border border-gray-200 px-3 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  뭉침
                </th>
                <th
                  className="border border-gray-200 px-3 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  골태
                </th>
                <th
                  className="border border-gray-200 px-3 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  이취
                </th>
                <th
                  className="border border-gray-200 px-3 py-4 text-center font-bold text-base"
                  style={{ color: "#F95700" }}
                >
                  종합
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </td>
                <td className="border border-gray-200 px-3 py-4 text-center">
                  <div className="flex justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <StarHalf className="h-5 w-5 fill-current" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 