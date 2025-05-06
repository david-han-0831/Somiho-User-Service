import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              국제거래소 B2B
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                상품
              </Link>
              <Link href="/market-price" className="text-gray-600 hover:text-gray-900">
                시세정보
              </Link>
              <Link href="/notice" className="text-gray-600 hover:text-gray-900">
                공지사항
              </Link>
              <Link href="/my/reservations" className="text-gray-600 hover:text-gray-900">
                예약내역
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2">
              로그인
            </Button>
            <Button className="bg-[#F95700] hover:bg-[#E04E00] text-white">회원가입</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
