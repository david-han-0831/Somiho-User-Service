import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">온라인 마른김 거래소</h3>
            <p className="mb-4 text-sm">전 세계 바이어를 위한 김 B2B 거래 플랫폼</p>
            <p className="text-sm">© 2025 온라인 마른김 거래소. All rights reserved.</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-white">
                  사업제휴
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
