import {
    ArrowRight,
    UserPlus,
    ShoppingCart,
    Clock,
    Phone,
    FileText,
    FileSignature,
    Ship,
    DollarSign,
    AlertTriangle,
    Package,
    Truck,
    CreditCard,
    Globe,
  } from "lucide-react"
  import Header from "../../components/Header"
  import Footer from "../../components/Footer"
  export default function GuidePage() {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">거래가 처음이신가요?</h1>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full mt-8"></div>
            </div>
          </div>
        </section>
  
        {/* 전체 프로세스 안내 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                전체 <span className="text-[#F95700]">프로세스</span>
              </h2>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full mt-4"></div>
            </div>
  
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center items-center">
                {/* 프로세스 스텝 1 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700] rounded-full flex items-center justify-center text-white mb-3">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">회원가입</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 2 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/90 rounded-full flex items-center justify-center text-white mb-3">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">제품 선택</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 3 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/80 rounded-full flex items-center justify-center text-white mb-3">
                    <Package className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">바구니 담기</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 4 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/70 rounded-full flex items-center justify-center text-white mb-3">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">홀딩 요청</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 5 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/60 rounded-full flex items-center justify-center text-white mb-3">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">담당자 연락</p>
                    <p className="text-xs text-gray-500">(30분 이내)</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 6 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/50 rounded-full flex items-center justify-center text-white mb-3">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">거래방식 협의</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 7 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/40 rounded-full flex items-center justify-center text-white mb-3">
                    <FileSignature className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">계약서 체결</p>
                  </div>
                </div>
  
                <ArrowRight className="w-6 h-6 text-gray-400 mx-1 hidden md:block" />
  
                {/* 프로세스 스텝 8 */}
                <div className="flex flex-col items-center mx-4 mb-8 w-32">
                  <div className="w-16 h-16 bg-[#F95700]/30 rounded-full flex items-center justify-center text-white mb-3">
                    <Ship className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">무역 진행</p>
                  </div>
                </div>
              </div>
  
              <div className="text-center mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">
                  <span className="font-medium">참고:</span> 계약 미체결 시 홀딩이 자동으로 해제됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* 수수료 안내 - 비노출 처리 (2025.10.13 수정사항) */}
        {/* <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                수수료 <span className="text-[#F95700]">안내</span>
              </h2>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
            </div>
  
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="bg-[#F95700] rounded-full p-4 text-white mb-4 md:mb-0 md:mr-6">
                    <DollarSign className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">고정 수수료율: 2%</h3>
                    <p className="text-gray-600">총거래금액 × 1.02</p>
                  </div>
                </div>
  
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2">포함사항</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>인증서류 발급비</li>
                    <li>출장검품비</li>
                    <li>국내운반비</li>
                    <li>플랫폼이용비</li>
                  </ul>
                </div>
  
                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#F95700]">
                  <h4 className="font-bold text-lg mb-2 text-[#F95700]">수수료 계산 예시</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">거래금액 1,000,000원</span>
                    <span className="font-bold">→</span>
                    <span className="text-gray-700">수수료 20,000원</span>
                    <span className="font-bold">=</span>
                    <span className="font-bold text-[#F95700]">총 1,020,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
  
        {/* 거래 조건 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                거래 <span className="text-[#F95700]">조건</span>
              </h2>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
            </div>
  
            <div className="max-w-5xl mx-auto">
              {/* 기본 조건 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">기본 조건</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6 flex items-start">
                    <div className="bg-[#F95700]/10 rounded-full p-3 mr-4">
                      <Globe className="w-6 h-6 text-[#F95700]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">무역조건</h4>
                      <p className="text-gray-700">FOB 기준</p>
                    </div>
                  </div>
  
                  <div className="bg-gray-50 rounded-xl p-6 flex items-start">
                    <div className="bg-[#F95700]/10 rounded-full p-3 mr-4">
                      <CreditCard className="w-6 h-6 text-[#F95700]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">결제조건</h4>
                      <div className="space-y-2 text-gray-700 text-sm">
                        <p className="whitespace-nowrap"><span className="font-semibold">T/T:</span> 선금 50%, 잔금 50% 완납 후 선하증권 발행</p>
                        <p className="whitespace-nowrap"><span className="font-semibold">L/C:</span> 조건부 가능 (매입자 수수료 부담 조건)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* 특수 조건 - 비노출 처리 (2025.10.13 수정사항) */}
              {/* <div className="space-y-8 mb-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">특수조건 – 예약 구매</h3>
  
                  <div className="mb-6">
                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400 mb-4">
                      <h4 className="font-bold text-blue-700 mb-2">연중상시 출고조건</h4>
                      <p className="text-gray-700">
                        보증금 20% 선납 ㅣ 출고시 부대비용 가감 후 거래 
                      </p>
                    </div>
                  </div>
  
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 text-center">부대비용 명세</h4>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="py-3 px-4 text-center font-semibold text-blue-800">구분</th>
                            <th className="py-3 px-4 text-center font-semibold text-blue-800">입/출고료</th>
                            <th className="py-3 px-4 text-center font-semibold text-blue-800">보관료</th>
                            <th className="py-3 px-4 text-center font-semibold text-blue-800">이자</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 px-4 text-center font-medium">박스당</td>
                            <td className="py-3 px-4 text-center">700원</td>
                            <td className="py-3 px-4 text-center">1일/50원</td>
                            <td className="py-3 px-4 text-center">1일/0.017%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
  
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3 text-center">예시: 박스당 72만원 60일 후 550박스 거래</h4>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#F95700] text-white">
                            <th className="py-3 px-4 text-center font-semibold">거래대금</th>
                            <th className="py-3 px-4 text-center font-semibold">입출고료</th>
                            <th className="py-3 px-4 text-center font-semibold">보관료</th>
                            <th className="py-3 px-4 text-center font-semibold">이자</th>
                            <th className="py-3 px-4 text-center font-semibold">총합</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-3 px-4 text-center font-medium">396,000,000</td>
                            <td className="py-3 px-4 text-center">385,000</td>
                            <td className="py-3 px-4 text-center">1,650,000</td>
                            <td className="py-3 px-4 text-center">673,200</td>
                            <td className="py-3 px-4 text-center font-bold text-[#F95700]">398,708,200</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
  
                  <div className="mb-6 bg-blue-50 rounded-lg p-4">
                    <h5 className="font-bold text-blue-700 mb-2">계산 방법</h5>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>• 입출고료: 550박스 × 700원 = 385,000원</div>
                      <div>• 보관료: 550박스 × 50원 × 60일 = 1,650,000원</div>
                      <div>• 이자: 396,000,000원 × 0.017% × 60일 = 673,200원</div>
                      <div className="pt-2 border-t border-blue-200 font-semibold text-blue-800">
                        • 총합: 396,000,000 + 385,000 + 1,650,000 + 673,200 = 398,708,200원
                      </div>
                    </div>
                  </div>
  
                  <div className="space-y-3">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 flex">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-yellow-700 font-medium mb-1">* 사전협의 없이 6개월 이내 미출고시</p>
                        <p className="text-yellow-600">보증금은 반환되지 않으며 경매거래로 출품되어집니다.</p>
                      </div>
                    </div>
  
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 flex">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-orange-700 font-medium mb-1">** 6개월 이후 기간 연장필요시</p>
                        <p className="text-orange-600">
                          기 발생한 부대비용을 선정산하면 6개월 추가 연장되며 연장은 최대 2회 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
  
        {/* 샘플 요청 안내 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                샘플 요청 <span className="text-[#F95700]">안내</span>
              </h2>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
            </div>
  
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#F95700]/5 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-[#F95700]/10 rounded-full p-4 mb-4">
                      <DollarSign className="w-8 h-8 text-[#F95700]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">비용</h4>
                    <p className="text-gray-700">
                      실비 청구
                      <br />
                      (샘플 수량 + 국제 배송비)
                    </p>
                  </div>
  
                  <div className="bg-[#F95700]/5 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-[#F95700]/10 rounded-full p-4 mb-4">
                      <FileText className="w-8 h-8 text-[#F95700]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">조건</h4>
                    <p className="text-gray-700">
                      거래계약 체결시 발생한 
                      <br />
                      샘플비용 할인
                    </p>
                  </div>
  
                  <div className="bg-[#F95700]/5 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="bg-[#F95700]/10 rounded-full p-4 mb-4">
                      <AlertTriangle className="w-8 h-8 text-[#F95700]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">주의</h4>
                    <p className="text-gray-700">
                      샘플배송중 해당자호 
                      <br />
                      재고소진 될 수 있음 
                    </p>
                  </div>
                </div>
  
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">샘플 요청 절차</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>회원 로그인 후 제품 상세페이지에서 '샘플 요청' 버튼 클릭</li>
                    <li>요청 수량 및 배송지 정보 입력</li>
                    <li>샘플 비용 결제 (배송비 포함)</li>
                    <li>담당자 확인 후 3일 이내 발송</li>
                    <li>추후 해당 제품 구매 시 샘플 비용 차감</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* 컨테이너 적재량 안내 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                컨테이너 적재량 <span className="text-[#F95700]">안내</span>
              </h2>
              <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full"></div>
            </div>
  
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#F95700] to-orange-600 text-white">
                        <th className="py-4 px-6 text-left font-semibold">상품 종류</th>
                        <th className="py-4 px-6 text-center font-semibold">20FT</th>
                        <th className="py-4 px-6 text-center font-semibold">40HQ</th>
                        <th className="py-4 px-6 text-center font-semibold">40RF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">재래김</td>
                        <td className="py-4 px-6 text-center">230</td>
                        <td className="py-4 px-6 text-center">550</td>
                        <td className="py-4 px-6 text-center">530</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">김밥김</td>
                        <td className="py-4 px-6 text-center">230</td>
                        <td className="py-4 px-6 text-center">550</td>
                        <td className="py-4 px-6 text-center">530</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">자반김</td>
                        <td className="py-4 px-6 text-center">230</td>
                        <td className="py-4 px-6 text-center">550</td>
                        <td className="py-4 px-6 text-center">530</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-3">주의사항</h4>
                  <p className="text-gray-700 mb-4">
                    * 홀딩요청된 수량에 따라 컨테이너 조정 또는 자호수량 분할이 담당자와 협의후 결정되어집니다.
                  </p>
                  <p className="text-gray-700">
                    예) 홀딩요청수량 재래김 600박스 경우 40HQ컨테이너로 결정되며 남은 50박스는 선택된 롯트에서 분리되어
                    홀딩에서 제외 되어집니다.
                  </p>
                </div>
  
                <div className="mt-6 flex items-center bg-[#F95700]/10 p-4 rounded-lg">
                  <Truck className="w-8 h-8 text-[#F95700] mr-4 flex-shrink-0" />
                  <p className="text-gray-700">
                    컨테이너 적재량은 제품의 포장 상태 및 컨테이너 상태에 따라 약간의 차이가 있을 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
  