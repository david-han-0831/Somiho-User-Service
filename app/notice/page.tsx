import Link from "next/link"
import { ArrowLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
export default function NoticePage() {
  // Mock data for demonstration
  const notices = [
    {
      id: 1,
      title: "2025년 김 수확 시즌 시작, 작황 양호",
      date: "2025.05.06",
      category: "뉴스",
      content: "2025년 김 수확이 시작되었습니다. 올해는 작황이 좋아 품질이 우수할 것으로 예상됩니다.",
    },
    {
      id: 2,
      title: "중국 김 수출량 전년 대비 15% 증가",
      date: "2025.05.04",
      category: "시장동향",
      content: "중국 김 시장이 확대되고 있습니다. 특히 젊은 층을 중심으로 한국 김에 대한 수요가 증가하고 있습니다.",
    },
    {
      id: 3,
      title: "[중요] 김 품질 등급 기준 개정 안내",
      date: "2025.05.01",
      category: "공지",
      content: "김 품질 등급 기준이 개정되었습니다. 자세한 내용은 공지사항을 참고해주세요.",
    },
    {
      id: 4,
      title: "일본 김 수출 증가",
      date: "2025.04.28",
      category: "뉴스",
      content: "일본으로의 김 수출이 전년 대비 15% 증가했습니다. 고급 김에 대한 수요가 특히 높습니다.",
    },
    {
      id: 5,
      title: "[중요] 시스템 점검 안내",
      date: "2025.04.25",
      category: "공지",
      content:
        "2025년 5월 15일 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다. 이 시간 동안 서비스 이용이 제한됩니다.",
    },
    {
      id: 6,
      title: "신규 바이어 등록 절차 안내",
      date: "2025.04.20",
      category: "공지",
      content: "신규 바이어 등록 절차가 간소화되었습니다. 사업자등록증만 업로드하면 빠르게 승인 처리됩니다.",
    },
    {
      id: 7,
      title: "김 가공 기술 세미나 개최 안내",
      date: "2025.04.15",
      category: "이벤트",
      content: "김 가공 기술 세미나가 서울 코엑스에서 개최됩니다. 많은 참여 바랍니다.",
    },
    {
      id: 8,
      title: "미국 시장 진출 성공 사례",
      date: "2025.04.10",
      category: "시장동향",
      content: "한국 김 제품의 미국 시장 진출 성공 사례를 소개합니다.",
    },
  ]

  // Function to get badge style based on category
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "공지":
        return "bg-blue-100 text-blue-800"
      case "뉴스":
        return "bg-green-100 text-green-800"
      case "시장동향":
        return "bg-gray-100 text-gray-800"
      case "이벤트":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-[#F95700]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">김 정보 · 뉴스</h1>
          <p className="text-gray-600">김 산업의 최신 뉴스, 공지사항, 시장동향을 빠르게 확인하세요</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="검색어를 입력하세요" className="pl-10" />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="notice">공지</TabsTrigger>
            <TabsTrigger value="news">뉴스</TabsTrigger>
            <TabsTrigger value="market">시장동향</TabsTrigger>
            <TabsTrigger value="event">이벤트</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notice Table */}
        <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  분류
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  제목
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  등록일
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  상세보기
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge className={getBadgeStyle(notice.category)}>{notice.category}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{notice.content}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{notice.date}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <Link href={`/notice/${notice.id}`} className="text-[#F95700] hover:underline">
                      <span className="flex items-center justify-end">
                        상세보기
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center">
          <nav className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">이전 페이지</span>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-gray-100 p-0 text-gray-700">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">다음 페이지</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 py-12 text-gray-300">
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
    </div>
  )
}
