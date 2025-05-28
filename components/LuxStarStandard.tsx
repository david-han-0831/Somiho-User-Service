import { Star } from "lucide-react"

interface LuxStarStandardProps {
  className?: string
}

export default function LuxStarStandard({ className = "" }: LuxStarStandardProps) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: "#F95700" }}>
          룩스스타 등급기준표
        </h3>

        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr style={{ backgroundColor: "rgba(249, 87, 0, 0.1)" }}>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                등급
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                윤기
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                구멍기
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                색태
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                이물
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                주름
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                뭉침
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                골태
              </th>
              <th
                className="border border-gray-200 px-4 py-3 text-center font-bold text-sm whitespace-nowrap"
                style={{ color: "#F95700" }}
              >
                이취
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                무성
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">7mm이상</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">갈</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">다량 이물 혼입</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">딱딱한 주름</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">두꺼운 뭉침</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">50%이상</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">묵은냄새</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                <div className="flex justify-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">매우탁함</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">7mm미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">황,갈,자</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">5개미만 혼입</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">유</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">진한뭉침</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">40%미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">비린냄새</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                <div className="flex justify-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">탁함</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">5mm미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">황,자</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">3개 미만 혼입</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">유</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">진한뭉침</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                <div className="flex justify-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">탁함</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">3mm미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">연흑</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">1개미만 혼입</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">약간</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">연한뭉침</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                <div className="flex justify-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">윤기</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">1mm미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">흑</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">5%미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">-</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3 text-center font-medium text-sm whitespace-nowrap">
                <div className="flex justify-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">윤기</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">1mm미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">흑</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">없음</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">1%미만</td>
              <td className="border border-gray-200 px-4 py-3 text-center text-sm whitespace-nowrap">신선향</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm font-medium mt-2 text-center" style={{ color: "#F95700" }}>
          * 김 1장을 기준으로 함.
        </p>
      </div>
    </div>
  )
} 