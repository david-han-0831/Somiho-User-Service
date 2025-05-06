import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">국제거래소 B2B</h3>
            <p className="text-gray-300 text-sm">비즈니스부터 유통까지, 해산물 거래의 새로운 기준을 제시합니다.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  상품
                </Link>
              </li>
              <li>
                <Link href="/market-price" className="text-gray-300 hover:text-white">
                  시세정보
                </Link>
              </li>
              <li>
                <Link href="/notice" className="text-gray-300 hover:text-white">
                  공지사항
                </Link>
              </li>
              <li>
                <Link href="/my/reservations" className="text-gray-300 hover:text-white">
                  예약내역
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <address className="text-sm text-gray-300 not-italic">
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>전화: 02-123-4567</p>
              <p>이메일: info@koreaseafood-b2b.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 text-center">
          &copy; 2025 국제거래소 B2B. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
