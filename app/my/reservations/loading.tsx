import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-8 w-48 mb-6" />

      {/* 필터 및 검색 스켈레톤 */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <Skeleton className="h-10 w-full max-w-md mx-auto mb-6" />

      {/* 테이블 스켈레톤 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3" colSpan={7}>
                <Skeleton className="h-4 w-full" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td className="px-4 py-4" colSpan={7}>
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
