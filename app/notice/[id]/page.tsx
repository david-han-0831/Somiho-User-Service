"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useParams } from 'next/navigation'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// Sample notice data (same as in the notice list page)
const notices = [
  {
    id: 1,
    title: "2025년 김 생산량 전망 및 시장 동향 분석",
    date: "2025.03.24",
    content:
      "올해 김 생산량은 전년 대비 15% 증가할 것으로 예상되며, 수출 시장에서도 긍정적인 성장세가 전망됩니다. 특히 중국과 일본 시장에서의 수요가 크게 증가하고 있어 국내 생산업체들의 수출 기회가 확대될 것으로 보입니다.\n\n한국수산해양개발원(KMI)의 최근 보고서에 따르면, 2025년 국내 김 생산량은 약 68만 톤으로 예상되며, 이는 2024년 59만 톤 대비 약 15% 증가한 수치입니다. 생산량 증가의 주요 원인으로는 양식 기술의 발전과 양식 면적 확대, 그리고 기후 조건의 개선 등이 꼽히고 있습니다.\n\n수출 시장에서는 특히 중국과 일본, 미국을 중심으로 한국산 김에 대한 수요가 꾸준히 증가하고 있습니다. 2024년 김 수출액은 약 7억 달러를 기록했으며, 2025년에는 8억 달러를 넘어설 것으로 전망됩니다. 특히 중국 시장에서는 한국산 조미김의 인기가 높아지고 있으며, 일본에서는 고급 마른김에 대한 수요가 증가하고 있습니다.\n\n다만, 국내 김 산업이 직면한 과제도 있습니다. 생산 비용 상승과 환경 규제 강화, 그리고 국제 경쟁 심화 등이 주요 도전 요인으로 지적되고 있습니다. 특히 중국과 일본의 자국 김 생산 기술 발전으로 인한 경쟁 심화는 장기적으로 한국 김 산업에 위협이 될 수 있습니다.\n\n이에 대응하기 위해 정부와 업계에서는 품질 경쟁력 강화와 브랜드 가치 제고, 그리고 신시장 개척 등의 전략을 추진하고 있습니다. 특히 김 국제거래소 B2B 플랫폼의 출범은 한국 김의 글로벌 경쟁력을 높이는 중요한 계기가 될 것으로 기대됩니다.",
  },
  {
    id: 2,
    title: "김 국제거래소 B2B 플랫폼 오픈 안내",
    date: "2025.03.23",
    content:
      "김 국제거래소 B2B 플랫폼이 정식 오픈하였습니다. 국내외 바이어들은 이제 온라인으로 한국의 고품질 김 제품을 쉽게 확인하고 예약할 수 있습니다. 많은 이용 부탁드립니다.\n\n김 국제거래소 B2B 플랫폼은 한국 김 산업의 글로벌 경쟁력 강화와 수출 활성화를 위해 개발된 온라인 거래 시스템입니다. 이 플랫폼을 통해 국내 김 생산자들은 자신의 제품을 국제 시장에 쉽게 소개할 수 있으며, 해외 바이어들은 한국의 고품질 김 제품을 편리하게 검색하고 구매할 수 있습니다.\n\n주요 기능으로는 실시간 김 시세 정보 제공, 제품 등록 및 검색, 온라인 예약 시스템 등이 있습니다. 특히 한국, 중국, 일본의 김 시세 정보를 한눈에 비교할 수 있어 시장 동향 파악에 큰 도움이 될 것입니다.\n\n플랫폼 이용을 위해서는 회원가입이 필요하며, 바이어는 사업자등록증 등의 서류를 제출하여 인증 절차를 거쳐야 합니다. 인증된 회원에게는 다양한 김 제품 정보와 시세 데이터에 대한 접근 권한이 부여됩니다.\n\n김 국제거래소 B2B 플랫폼은 앞으로도 지속적인 기능 개선과 서비스 확대를 통해 한국 김 산업의 발전에 기여할 것입니다. 많은 관심과 이용 부탁드립니다.",
  },
  {
    id: 3,
    title: "김 품질 등급 기준 개정 안내",
    date: "2025.03.22",
    content:
      "국내 김 품질 등급 기준이 개정되어 A+, A, B+, B 등급으로 세분화되었습니다. 새로운 등급 기준은 색상, 두께, 향미 등을 종합적으로 평가하여 더욱 정확한 품질 정보를 제공합니다.\n\n개정된 김 품질 등급 기준은 다음과 같습니다:\n\n1. A+ 등급 (최상급)\n- 색상: 진한 검은색, 광택이 뛰어남\n- 두께: 균일하고 적절한 두께\n- 향미: 풍부한 해양 향과 감칠맛\n- 형태: 완전한 전장, 손상 없음\n- 이물질: 없음\n\n2. A 등급 (상급)\n- 색상: 검은색, 광택 있음\n- 두께: 대체로 균일한 두께\n- 향미: 좋은 해양 향과 맛\n- 형태: 90% 이상 온전한 형태\n- 이물질: 거의 없음\n\n3. B+ 등급 (중급)\n- 색상: 약간 불균일할 수 있음\n- 두께: 부분적으로 불균일할 수 있음\n- 향미: 보통의 맛과 향\n- 형태: 80% 이상 온전한 형태\n- 이물질: 미량 허용\n\n4. B 등급 (일반)\n- 색상: 다소 불균일함\n- 두께: 불균일할 수 있음\n- 향미: 기본적인 맛과 향\n- 형태: 70% 이상 온전한 형태\n- 이물질: 소량 허용\n\n이번 등급 기준 개정은 소비자와 바이어에게 더 정확한 품질 정보를 제공하고, 생산자에게는 품질 향상의 동기를 부여하기 위해 시행되었습니다. 새로운 등급 기준은 2025년 4월 1일부터 전면 적용됩니다.",
  },
  {
    id: 4,
    title: "2025년 1분기 김 수출 실적 발표",
    date: "2025.03.21",
    content:
      '2025년 1분기 김 수출 실적이 발표되었습니다. 전년 동기 대비 23% 증가한 5,200만 달러를 기록하며 역대 최고 실적을 달성했습니다. 주요 수출국은 미국, 중국, 일본, 호주 순으로 나타났습니다.\n\n한국수산무역협회가 발표한 자료에 따르면, 2025년 1분기(1~3월) 김 수출액은 5,200만 달러로 전년 동기 4,230만 달러 대비 23% 증가했습니다. 수출량 기준으로는 8,500톤으로 전년 동기 7,200톤 대비 18% 증가했습니다.\n\n국가별 수출 현황을 살펴보면, 미국이 1,560만 달러(30%)로 가장 큰 비중을 차지했으며, 중국 1,300만 달러(25%), 일본 780만 달러(15%), 호주 520만 달러(10%) 순으로 나타났습니다. 특히 미국 시장에서는 건강식품으로서의 김 인식이 확산되면서 스낵용 김 제품의 인기가 크게 증가했습니다.\n\n제품 유형별로는 조미김이 2,860만 달러(55%)로 가장 큰 비중을 차지했으며, 마른김 1,560만 달러(30%), 김스낵 780만 달러(15%) 순이었습니다. 특히 김스낵 제품의 수출이 전년 동기 대비 40% 이상 증가하며 높은 성장세를 보였습니다.\n\n해양수산부 관계자는 "한국 김의 우수한 품질과 적극적인 해외 마케팅 활동이 수출 증가의 주요 요인"이라며 "앞으로도 김 수출 확대를 위한 다양한 지원 정책을 추진할 계획"이라고 밝혔습니다.',
  },
  {
    id: 5,
    title: "김 생산자 등록 절차 안내",
    date: "2025.03.20",
    content:
      "김 국제거래소에 제품을 등록하고자 하는 생산자를 위한 등록 절차를 안내드립니다. 사업자등록증, 생산시설 인증서, 품질검사 결과서 등의 서류를 준비하여 관리자에게 제출해 주시기 바랍니다.\n\n김 국제거래소 B2B 플랫폼에 제품을 등록하기 위한 절차는 다음과 같습니다:\n\n1. 생산자 회원가입\n- 김 국제거래소 웹사이트(www.kimexchange.com)에서 회원가입\n- 생산자 유형 선택 및 기본 정보 입력\n\n2. 필요 서류 제출\n- 사업자등록증 사본\n- 생산시설 인증서 (HACCP, ISO 등)\n- 품질검사 결과서 (최근 3개월 이내 발급)\n- 수산물 이력제 등록 증명서\n- 생산자 프로필 및 생산시설 소개 자료\n\n3. 서류 심사 및 승인\n- 제출된 서류에 대한 관리자 검토 (약 3~5 영업일 소요)\n- 필요시 추가 자료 요청 또는 현장 실사 진행\n- 심사 통과 시 생산자 계정 승인\n\n4. 제품 등록\n- 승인된 계정으로 로그인 후 제품 등록 메뉴 접속\n- 제품 정보 입력 (제품명, 규격, 생산일자, 등급, 가격 등)\n- 제품 이미지 및 영상 업로드 (최소 3장 이상의 이미지 필수)\n\n5. 제품 심사 및 게시\n- 등록된 제품 정보에 대한 관리자 검토 (약 1~2 영업일 소요)\n- 승인 시 플랫폼에 제품 게시 및 바이어 노출\n\n등록 과정에서 문의사항이 있으시면 김 국제거래소 운영팀(02-1234-5678, support@kimexchange.com)으로 연락 주시기 바랍니다.",
  },
  {
    id: 6,
    title: "해외 바이어 초청 김 품평회 개최 안내",
    date: "2025.03.19",
    content:
      "오는 4월 15일부터 17일까지 서울 코엑스에서 해외 바이어 초청 김 품평회가 개최됩니다. 국내 우수 생산업체와 해외 바이어 간의 직접 만남의 기회가 마련되오니 많은 참여 바랍니다.\n\n해양수산부와 한국수산무역협회가 공동 주최하는 이번 품평회는 한국 김의 우수성을 해외에 알리고 수출 확대를 도모하기 위해 마련되었습니다. 미국, 중국, 일본, 유럽 등 20개국에서 약 100명의 바이어가 참가할 예정입니다.\n\n행사 일정은 다음과 같습니다:\n\n- 4월 15일(화): 개막식 및 한국 김 산업 소개 세미나\n- 4월 16일(수): 제품 전시 및 1:1 비즈니스 미팅\n- 4월 17일(목): 생산시설 현장 방문 및 네트워킹 만찬\n\n참가를 희망하는 국내 생산업체는 3월 31일까지 김 국제거래소 웹사이트를 통해 신청할 수 있습니다. 참가비는 업체당 50만원이며, 부스 설치 및 통역 서비스가 제공됩니다.\n\n이번 품평회는 김 국제거래소 B2B 플랫폼의 공식 출범 이후 첫 오프라인 행사로, 플랫폼을 통한 온라인 거래와 함께 직접적인 비즈니스 네트워크 구축의 기회가 될 것입니다.\n\n자세한 내용은 김 국제거래소 웹사이트(www.kimexchange.com/event)에서 확인하실 수 있습니다.",
  },
]

// Make the component async to properly handle params
export default function NoticeDetailPage() {
  const params = useParams()
  const noticeId = Number.parseInt(params.id as string)
  const notice = notices.find((n) => n.id === noticeId)

  if (!notice) {
    return (
      <div className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">공지사항을 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
            <Link href="/notice" className="btn-primary">
              공지사항 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Format content with line breaks
  const formattedContent = notice.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ))

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
      <div className="container-custom px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 mt-12">
          <Link href="/notice" className="text-gray-600 hover:text-primary flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            공지사항 목록으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{notice.title}</h1>
              <span className="text-sm text-gray-500 mt-2 sm:mt-0">{notice.date}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="prose max-w-none text-gray-700 leading-relaxed">{formattedContent}</div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/notice" className="text-gray-600 hover:text-primary flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                목록으로
              </Link>

              <div className="flex space-x-4">
                {noticeId > 1 && (
                  <Link href={`/notice/${noticeId - 1}`} className="text-gray-600 hover:text-primary text-sm">
                    이전 글
                  </Link>
                )}
                {noticeId < notices.length && (
                  <Link href={`/notice/${noticeId + 1}`} className="text-gray-600 hover:text-primary text-sm">
                    다음 글
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Notices */}
        <div className="mt-12 mb-12">
          <h2 className="text-xl font-bold mb-4">다른 공지사항</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {notices
              .filter((n) => n.id !== noticeId)
              .slice(0, 3)
              .map((relatedNotice) => (
                <Link
                  key={relatedNotice.id}
                  href={`/notice/${relatedNotice.id}`}
                  className="block p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{relatedNotice.title}</h3>
                    <span className="text-sm text-gray-500">{relatedNotice.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
        <Footer />
    </div>
  )
}
