import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사 정보</h3>
            <p className="text-gray-300 text-sm mb-1">소미호</p>
            <p className="text-gray-300 text-sm mb-1">경기도 이천시 신둔면원적로 512번길 202</p>
            <p className="text-gray-300 text-sm">202, Wonjeok-ro 512beon-gil, Sindun-myeon, Icheon-si, Gyeonggi-do, Korea, Zip.17300</p>
          </div>
 
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">문의처</h3>
            <p className="text-gray-300 text-sm mb-1">Tel: 070-4833-7310</p>
            <p className="text-gray-300 text-sm mb-1">Mobile: 010-7330-7314</p>
            <p className="text-gray-300 text-sm mb-1">Fax: 0504-265-7314</p>
            <p className="text-gray-300 text-sm">E mail: kwon@somiho.kr</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">링크</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="text-gray-300 text-sm hover:text-primary block">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-300 text-sm hover:text-primary block">
                이용약관
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">ⓒ 2025 SOMIHO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
