import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#F95700]" />
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    </div>
  )
}
