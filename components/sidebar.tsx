"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Package, TrendingUp, Calendar, FileText, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "대시보드", href: "/admin", icon: BarChart3 },
    { name: "회원 관리", href: "/admin/members", icon: Users },
    { name: "제품 관리", href: "/admin/products", icon: Package },
    { name: "시세 관리", href: "/admin/market-price", icon: TrendingUp },
    { name: "예약 관리", href: "/admin/reservations", icon: Calendar },
    { name: "공지사항/뉴스", href: "/admin/notices", icon: FileText },
  ]

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
        <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <LogOut className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
          로그아웃
        </button>
      </div>
    </div>
  )
}
