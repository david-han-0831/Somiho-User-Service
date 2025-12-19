"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Users, Package, TrendingUp, Calendar, FileText, LogOut } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigation = [
    { name: "대시보드", href: "/admin", icon: BarChart3 },
    { name: "회원 관리", href: "/admin/members", icon: Users },
    { name: "제품 관리", href: "/admin/products", icon: Package },
    // { name: "시세 관리", href: "/admin/market-price", icon: TrendingUp }, // 시세 테이블 생성 후 활성화
    { name: "예약 관리", href: "/admin/reservations", icon: Calendar },
    { name: "공지사항/뉴스", href: "/admin/notices", icon: FileText },
  ]

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      // API Route를 통해 로그아웃
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "로그아웃에 실패했습니다.")
      }

      // 클라이언트에서도 세션 정리
      const supabase = createClient()
      await supabase.auth.signOut()

      toast({
        title: "로그아웃 완료",
        description: "정상적으로 로그아웃되었습니다.",
      })

      // 로그인 페이지로 이동
      router.push("/admin/login")
      router.refresh()
    } catch (error: any) {
      console.error("Logout error:", error)
      toast({
        title: "로그아웃 실패",
        description: error.message || "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-full w-[220px] flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-bold text-[#F95700]">국제거래소 B2B</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? "bg-[#FFF1EB] text-[#F95700]" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? "text-[#F95700]" : "text-gray-500"}`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    </div>
  )
}
