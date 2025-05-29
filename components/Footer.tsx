import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">김 국제거래소 B2B</h3>
            <p className="mb-4 text-sm">전 세계 바이어를 위한 김 B2B 거래 플랫폼</p>
            <p className="text-sm">© 2025 김 국제거래소 B2B. All rights reserved.</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">연락처</h3>
            <p className="mb-2 text-sm">경기도 이천시 신둔면 원적로 512번길 202</p>
            <p className="mb-2 text-sm">202, Wonjeok-ro 512beon-gil, Sindun-myeon, Icheon-si, Gyeonggi-do, Korea, Zip. 17300</p>
            <p className="mb-2 text-sm">Email: kwon@somiho.kr</p>
            <p className="text-sm">Tel: +82 70-4833-7310</p>
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
                <Link href="/faq" className="hover:text-white">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
