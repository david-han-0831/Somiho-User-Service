import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl font-bold">접근 권한 없음</CardTitle>
          </div>
          <CardDescription>이 페이지에 접근할 권한이 없습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            관리자 권한이 필요하거나 계정이 비활성화되었을 수 있습니다. 관리자에게 문의하세요.
          </p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/admin/login">로그인 페이지</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">홈으로</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

