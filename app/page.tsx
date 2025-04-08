import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">대한민국 김 국제거래소</h1>
            <p className="text-xl mb-8">국내외 바이어들을 위한 최고 품질의 김 제품과 실시간 시세 정보를 제공합니다.</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                제품 보기
              </Link>
              <Link
                href="/market-price"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                시세 정보
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Price Summary */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">최신 김 경매 시세 요약</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Korea */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary">
              <h3 className="text-xl font-semibold mb-4">한국 시세</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균가</span>
                  <span className="font-medium">₩12,500/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최고가</span>
                  <span className="font-medium">₩15,200/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최저가</span>
                  <span className="font-medium">₩10,800/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">전일대비</span>
                  <span className="font-medium text-green-600">+2.3%</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/market-price" className="text-primary flex items-center hover:underline">
                  자세히 보기 <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* China */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">중국 시세</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균가</span>
                  <span className="font-medium">¥85.2/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최고가</span>
                  <span className="font-medium">¥92.5/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최저가</span>
                  <span className="font-medium">¥78.3/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">전일대비</span>
                  <span className="font-medium text-red-600">-1.2%</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/market-price" className="text-primary flex items-center hover:underline">
                  자세히 보기 <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Japan */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4">일본 시세</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균가</span>
                  <span className="font-medium">¥1,350/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최고가</span>
                  <span className="font-medium">¥1,520/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최저가</span>
                  <span className="font-medium">¥1,180/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">전일대비</span>
                  <span className="font-medium text-green-600">+0.8%</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/market-price" className="text-primary flex items-center hover:underline">
                  자세히 보기 <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Notices */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">공지사항 및 뉴스</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium hover:text-primary">
                      <Link href={`/notice/${item}`}>2025년 김 생산량 전망 및 시장 동향 분석</Link>
                    </h3>
                    <span className="text-sm text-gray-500">2025.03.{10 + item}</span>
                  </div>
                  <p className="text-gray-600">
                    올해 김 생산량은 전년 대비 15% 증가할 것으로 예상되며, 수출 시장에서도 긍정적인 성장세가 전망됩니다.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/notice" className="btn-outline">
                더 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
