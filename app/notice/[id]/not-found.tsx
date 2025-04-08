import Link from "next/link"

export default function NotFound() {
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
