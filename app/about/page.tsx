import { CheckCircle, Shield, Users, Globe, TrendingUp, Star, MapPin } from "lucide-react"
import LuxStarTable from "@/components/LuxStarTable"  
import Header from "@/components/Header"
import LuxStarStandard from "@/components/LuxStarStandard"
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 김 국제거래소 개요 (맨 위로 이동) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              김 국제거래소 <span className="text-[#F95700]">소개</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
              얼굴을 걸고 하는 만큼 확실한 서비스를 선보이겠습니다.
            </p>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽 텍스트 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                김 국제거래소 <span className="text-[#F95700]">개요</span>
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium text-[#F95700]">그동안 김을 수매하기 위해 고생 많으셨죠?</p>

                <div className="space-y-3">
                  <p>
                    한국어를 몰라 시장 상황 파악이나 가격 협상하기 어려워 통역원을 고용하거나 수수료를 지불하고 계시지
                    않나요?
                  </p>
                  <p>
                    시장을 파악하기 위해 비행기를 타고 오셔서 단기 원룸 또는 호텔에 비용을 지불하시면서도 원하는 김을 못
                    찾으시지 않으셨나요?
                  </p>
                  <p>원하는 품질의 김이 없어 돌아다니느라 시간과 비용도 많이 들지는 않으셨나요?</p>
                  <p>혹시나 김 바꿔치기, 속박기 등의 사기를 당하지 않을까 걱정하지 않으셨나요?</p>
                </div>

                <div className="bg-[#F95700]/10 border-l-4 border-[#F95700] p-6 rounded-r-lg">
                  <p className="text-lg font-bold text-[#F95700]">
                    이러한 고충을 전격 해소해드리고자 김 국제거래소가 2025년 9월 9일부로 출범하게 되었습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽 이미지/통계 */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#F95700]/10 to-orange-100 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <Globe className="w-16 h-16 text-[#F95700] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">글로벌 김 거래</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <TrendingUp className="w-8 h-8 text-[#F95700] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">100+</div>
                    <div className="text-sm text-gray-600">거래 파트너</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <Star className="w-8 h-8 text-[#F95700] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">5★</div>
                    <div className="text-sm text-gray-600">품질 등급</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 임직원 사진 섹션 (개요 바로 아래로 이동) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-4">
              <div className="text-center text-gray-600">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">임직원 파이팅 넘치는 사진</p>
                <p className="text-sm text-gray-500">(파일 추가 예정)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 고객사와의 약속 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              고객사와의 <span className="text-[#F95700]">약속</span>
            </h2>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F95700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F95700] transition-colors duration-300">
                  <CheckCircle className="w-8 h-8 text-[#F95700] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">투명한 거래</h3>
                <p className="text-gray-600 leading-relaxed">시장 상황에 반하는 행위를 하지 않겠습니다</p>
                <div className="mt-4 text-sm text-gray-500">투명한 시세 기반 거래 운영</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F95700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F95700] transition-colors duration-300">
                  <Shield className="w-8 h-8 text-[#F95700] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">확실한 검수</h3>
                <p className="text-gray-600 leading-relaxed">김 검수를 확실하게 하겠습니다</p>
                <div className="mt-4 text-sm text-gray-500">검수 기준 표준화 및 영상 보증</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F95700]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F95700] transition-colors duration-300">
                  <Users className="w-8 h-8 text-[#F95700] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">정보 보안</h3>
                <p className="text-gray-600 leading-relaxed">거래처 및 단가를 제3자에 노출하지 않습니다</p>
                <div className="mt-4 text-sm text-gray-500">고객 보안 철저 이행</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 룩스스타 등급기준 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              룩스스타 <span className="text-[#F95700]">등급기준</span>
            </h2>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <LuxStarStandard/>
          </div>
        </div>
      </section>

      {/* 회원 등급별 혜택 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              회원 등급별 <span className="text-[#F95700]">혜택</span>
            </h2>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
          </div>

          {/* 회원 등급별 혜택 테이블 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#F95700] to-orange-600 text-white">
                    <th className="p-6 text-center font-semibold border-r border-white/20">비회원/회원 구분</th>
                    <th className="p-6 text-center font-semibold">등급별 혜택</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-6 border-r border-gray-200">
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                          <div className="font-semibold mb-2 text-lg text-gray-700">비회원</div>
                          <div className="text-gray-600">기본시세열람, 최신 업로드4개 마른김 열람</div>
                        </div>
                        <div className="p-4 bg-[#F95700]/10 rounded-lg border-l-4 border-[#F95700]">
                          <div className="font-semibold mb-2 text-lg text-[#F95700]">회원</div>
                          <div className="text-gray-700">
                            한국물김시세 열람, 마른김시세열람, 마른김구매 등 모든 기능 사용
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-gray-50 rounded border-l-4 border-gray-400">
                          <div className="font-semibold mb-1">클래식</div>
                          <div>12월~6월 매월 한국마른김시황 자료 송부</div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                          <div className="font-semibold text-blue-700 mb-1">베스트</div>
                          <div>클래식 + 수수료할인 0.1%p + 무료샘플월/3회</div>
                        </div>

                        <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <div className="font-semibold text-green-700 mb-1">에이스</div>
                          <div>클래식 + 수수료할인 0.3%p + 무료샘플월/5회</div>
                        </div>

                        <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                          <div className="font-semibold text-purple-700 mb-1">프리미어</div>
                          <div>베스트 + 수수료할인 0.6%p + 예탁금 면제 + 샘플 무제한무료</div>
                          <div className="mt-1 text-xs bg-purple-100 p-2 rounded">
                            * 주주총회 참관자격 초청장발송 초청비자 발급 + 왕복항공권 지원 + 5성급 호텔지원 + 한국방문
                            의전
                          </div>
                        </div>

                        <div className="p-3 bg-[#F95700]/10 rounded border-l-4 border-[#F95700]">
                          <div className="font-semibold text-[#F95700] mb-1">VIP</div>
                          <div>해당기업 기업대표자 특별초청 비즈니스 상담</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 등급별 혜택 요약 카드 */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6">
              거래누계 금액별 <span className="text-[#F95700]">회원등급</span>
            </h3>
            <div className="grid lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-gray-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-700 font-bold">C</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">클래식</h3>
                  <div className="text-sm text-gray-600">99만불 미만</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs">시황 자료 송부</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-blue-400">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-700 font-bold">B</span>
                  </div>
                  <h3 className="font-bold text-blue-700 mb-2">베스트</h3>
                  <div className="text-sm text-gray-600">100만~299만불</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs">수수료 0.1%↓</div>
                    <div className="text-xs">무료샘플 3회/월</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-green-400">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-700 font-bold">A</span>
                  </div>
                  <h3 className="font-bold text-green-700 mb-2">에이스</h3>
                  <div className="text-sm text-gray-600">300만~699만불</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs">수수료 0.3%↓</div>
                    <div className="text-xs">무료샘플 5회/월</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-purple-400">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-700 font-bold">P</span>
                  </div>
                  <h3 className="font-bold text-purple-700 mb-2">프리미어</h3>
                  <div className="text-sm text-gray-600">700만불 이상</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs">수수료 0.6%↓</div>
                    <div className="text-xs">예탁금 면제</div>
                    <div className="text-xs">항공+호텔 지원</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-[#F95700]">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F95700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#F95700] font-bold">V</span>
                  </div>
                  <h3 className="font-bold text-[#F95700] mb-2">VIP</h3>
                  <div className="text-sm text-gray-600">1000만불 이상</div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs">기업대표자 초청</div>
                    <div className="text-xs">특별 비즈니스 상담</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 찾아오시는 길 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              찾아오시는 <span className="text-[#F95700]">길</span>
            </h2>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 지도 영역 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">오시는 길</h3>
              <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">지도 영역</p>
                  <p className="text-sm text-gray-500">(투자처에 따라 변경 예정)</p>
                </div>
              </div>
            </div>

            {/* 주소 및 연락처 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">주소 및 연락처</h3>

              <div className="p-6 bg-[#F95700]/5 rounded-lg border-l-4 border-[#F95700]">
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-[#F95700] mb-2 text-lg">주소</div>
                    <div className="text-gray-700">경기도 이천시</div>
                    <div className="text-sm text-gray-500 mt-1">(상세 주소는 투자처에 따라 변경 예정)</div>
                  </div>

                  <div>
                    <div className="font-semibold text-[#F95700] mb-2 text-lg">연락처</div>
                    <div className="text-gray-700">투자처 확정 후 안내</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
