"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Supabase Auth 로그인
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error("로그인에 실패했습니다.")
      }

      // admin_users 테이블 확인 (API Route를 통해 확인)
      // 클라이언트에서 직접 조회하면 RLS 정책 문제가 발생할 수 있으므로
      // API Route를 통해 Service Role Key로 확인
      const checkAdminResponse = await fetch("/api/auth/me")
      const checkAdminData = await checkAdminResponse.json()

      if (!checkAdminResponse.ok || !checkAdminData.success) {
        await supabase.auth.signOut()
        throw new Error(
          checkAdminData.message || 
          `관리자 권한이 필요합니다. admin_users 테이블에 UID '${data.user.id}'가 등록되어 있는지 확인해주세요.`
        )
      }

      const adminUser = checkAdminData.data

      if (!adminUser.is_active) {
        await supabase.auth.signOut()
        throw new Error("비활성화된 계정입니다.")
      }

      // 로그인 성공 - 로딩 상태 먼저 해제
      setIsLoading(false)

      // 로그인 성공 메시지 표시
      toast({
        title: "로그인 성공",
        description: `${adminUser.name}님 환영합니다!`,
      })

      // 쿠키 동기화를 위한 지연 후 리다이렉트
      // window.location.href를 사용하여 강제 페이지 리로드로 쿠키 동기화 보장
      setTimeout(() => {
        window.location.href = "/admin"
      }, 300)
    } catch (error: any) {
      console.error("Login error:", error)
      setIsLoading(false)
      toast({
        title: "로그인 실패",
        description: error.message || "이메일 또는 비밀번호를 확인해주세요.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">관리자 로그인</CardTitle>
          <CardDescription>온라인 마른김 거래소 관리 시스템</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@johns635.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

