import Link from "next/link"
import { Clock } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-[80vh] flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-4">회원가입 신청이 완료되었습니다</h1>

          <p className="text-gray-600 mb-8">
            관리자의 승인을 기다려 주세요. 승인이 완료되면 등록하신 이메일로 알림을 보내드립니다.
          </p>

          <Link href="/" className="btn-primary block w-full py-3">
            홈으로 이동
          </Link>

          <div className="mt-6 text-sm text-gray-500">
            문의사항이 있으시면{" "}
            <a href="mailto:contact@somio.com" className="text-primary hover:underline">
              contact@somio.com
            </a>
            으로 연락주세요.
          </div>
        </div>
      </div>
    </div>
  )
}
