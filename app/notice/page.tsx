import Link from "next/link"

// Sample notice data
const notices = [
  {
    id: 1,
    title: "2025년 김 생산량 전망 및 시장 동향 분석",
    date: "2025.03.24",
    content:
      "올해 김 생산량은 전년 대비 15% 증가할 것으로 예상되며, 수출 시장에서도 긍정적인 성장세가 전망됩니다. 특히 중국과 일본 시장에서의 수요가 크게 증가하고 있어 국내 생산업체들의 수출 기회가 확대될 것으로 보입니다.",
  },
  {
    id: 2,
    title: "김 국제거래소 B2B 플랫폼 오픈 안내",
    date: "2025.03.23",
    content:
      "김 국제거래소 B2B 플랫폼이 정식 오픈하였습니다. 국내외 바이어들은 이제 온라인으로 한국의 고품질 김 제품을 쉽게 확인하고 예약할 수 있습니다. 많은 이용 부탁드립니다.",
  },
  {
    id: 3,
    title: "김 품질 등급 기준 개정 안내",
    date: "2025.03.22",
    content:
      "국내 김 품질 등급 기준이 개정되어 A+, A, B+, B 등급으로 세분화되었습니다. 새로운 등급 기준은 색상, 두께, 향미 등을 종합적으로 평가하여 더욱 정확한 품질 정보를 제공합니다.",
  },
  {
    id: 4,
    title: "2025년 1분기 김 수출 실적 발표",
    date: "2025.03.21",
    content:
      "2025년 1분기 김 수출 실적이 발표되었습니다. 전년 동기 대비 23% 증가한 5,200만 달러를 기록하며 역대 최고 실적을 달성했습니다. 주요 수출국은 미국, 중국, 일본, 호주 순으로 나타났습니다.",
  },
  {
    id: 5,
    title: "김 생산자 등록 절차 안내",
    date: "2025.03.20",
    content:
      "김 국제거래소에 제품을 등록하고자 하는 생산자를 위한 등록 절차를 안내드립니다. 사업자등록증, 생산시설 인증서, 품질검사 결과서 등의 서류를 준비하여 관리자에게 제출해 주시기 바랍니다.",
  },
  {
    id: 6,
    title: "해외 바이어 초청 김 품평회 개최 안내",
    date: "2025.03.19",
    content:
      "오는 4월 15일부터 17일까지 서울 코엑스에서 해외 바이어 초청 김 품평회가 개최됩니다. 국내 우수 생산업체와 해외 바이어 간의 직접 만남의 기회가 마련되오니 많은 참여 바랍니다.",
  },
]

export default function NoticePage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">공지사항</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {notices.map((notice, index) => (
            <div key={notice.id} className={`p-6 ${index !== notices.length - 1 ? "border-b border-gray-200" : ""}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                <Link
                  href={`/notice/${notice.id}`}
                  className="text-xl font-medium text-gray-900 hover:text-primary transition-colors"
                >
                  {notice.title}
                </Link>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">{notice.date}</span>
              </div>
              <Link href={`/notice/${notice.id}`} className="block">
                <p className="text-gray-600 hover:text-gray-900 transition-colors">
                  {notice.content.substring(0, 150)}...
                </p>
              </Link>
              <div className="mt-4">
                <Link href={`/notice/${notice.id}`} className="text-primary text-sm font-medium hover:underline">
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
