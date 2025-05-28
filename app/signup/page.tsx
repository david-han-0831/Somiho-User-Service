"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, MessageCircle, User, Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"
export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone: "",
    mobile: "",
    companyName: "",
    namePosition: "",
    address: "",
    mainPort: "",
  })

  const [files, setFiles] = useState({
    businessLicense: null as File | null,
    companyProfile: null as File | null,
  })

  const [messengers, setMessengers] = useState({
    kakao: "",
    wechat: "",
    line: "",
    whatsapp: "",
    zalo: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragActive, setDragActive] = useState("")

  const messengerLabels = {
    kakao: "KAKAOTALK",
    wechat: "WECHAT",
    line: "LINE",
    whatsapp: "WHATSAPP",
    zalo: "ZALO",
  }

  const messengerPlaceholders = {
    kakao: "@kakao_id 또는 링크",
    wechat: "wechat_id",
    line: "line.me 링크 또는 ID",
    whatsapp: "+821012345678",
    zalo: "@zalo_id",
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleMessengerChange = (platform: string, value: string) => {
    setMessengers((prev) => ({ ...prev, [platform]: value }))
  }

  const handleFileUpload = (type: "businessLicense" | "companyProfile", file: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [type]: "PDF, JPG, PNG 파일만 업로드 가능합니다." }))
      return
    }

    setFiles((prev) => ({ ...prev, [type]: file }))
    setErrors((prev) => ({ ...prev, [type]: "" }))
  }

  const handleDrag = (e: React.DragEvent, type: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type)
    } else if (e.type === "dragleave") {
      setDragActive("")
    }
  }

  const handleDrop = (e: React.DragEvent, type: "businessLicense" | "companyProfile") => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive("")

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(type, e.dataTransfer.files[0])
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 필수 필드 검증
    if (!formData.username.trim()) newErrors.username = "아이디를 입력해주세요."
    if (!formData.password.trim()) newErrors.password = "비밀번호를 입력해주세요."
    else if (formData.password.length < 8) newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다."

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다."
    }

    if (!formData.email.trim()) newErrors.email = "이메일을 입력해주세요."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "올바른 이메일 형식이 아닙니다."

    if (!formData.phone.trim()) newErrors.phone = "연락처를 입력해주세요."
    if (!formData.mobile.trim()) newErrors.mobile = "핸드폰 번호를 입력해주세요."
    if (!formData.companyName.trim()) newErrors.companyName = "상호명을 입력해주세요."
    if (!formData.namePosition.trim()) newErrors.namePosition = "성함/직위를 입력해주세요."
    if (!formData.address.trim()) newErrors.address = "사업장 주소를 입력해주세요."

    if (!files.businessLicense) newErrors.businessLicense = "사업자등록증을 첨부해주세요."

    if (!agreed) newErrors.agreement = "개인정보 수집 및 이용에 동의해주세요."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // 가입 신청 처리
      alert("가입 신청이 완료되었습니다. 관리자 검수 후 승인됩니다.")
    }
  }

  return (
    <div className="min-h-screen bg-white">
    <Header />
      <div className="container mx-auto px-4 mt-20">
        
        <div className="max-w-3xl mx-auto">
          {/* 상단 안내 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">회원가입</h1>
            <p className="text-lg text-gray-600 mb-2">김 국제거래소 이용을 위한 사업자 회원 등록을 진행합니다.</p>
            <p className="text-gray-500">정확한 정보 입력 시, 승인 후 전체 기능 이용이 가능합니다.</p>
            <div className="w-24 h-1 bg-[#F95700] mx-auto rounded-full mt-6"></div>
          </div>

          {/* 회원가입 폼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 기본 정보 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <User className="w-6 h-6 text-[#F95700] mr-2" />
                  기본 정보
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 아이디 */}
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-2 block">
                      아이디 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="아이디를 입력하세요"
                      className={errors.username ? "border-red-500" : ""}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>

                  {/* 이메일 */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                      이메일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="example@company.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* 비밀번호 */}
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                      비밀번호 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="최소 8자 이상"
                        className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* 비밀번호 확인 */}
                  <div>
                    <Label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700 mb-2 block">
                      비밀번호 확인 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="passwordConfirm"
                        type={showPasswordConfirm ? "text" : "password"}
                        value={formData.passwordConfirm}
                        onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                        className={errors.passwordConfirm ? "border-red-500 pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.passwordConfirm && <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>}
                  </div>

                  {/* 연락처 */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                      연락처 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="02-1234-5678"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* 핸드폰 */}
                  <div>
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-2 block">
                      핸드폰 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      placeholder="010-1234-5678"
                      className={errors.mobile ? "border-red-500" : ""}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  {/* 상호명 */}
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium text-gray-700 mb-2 block">
                      상호명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="회사명 또는 브랜드명"
                      className={errors.companyName ? "border-red-500" : ""}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>

                  {/* 성함/직위 */}
                  <div>
                    <Label htmlFor="namePosition" className="text-sm font-medium text-gray-700 mb-2 block">
                      성함 / 직위 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="namePosition"
                      type="text"
                      value={formData.namePosition}
                      onChange={(e) => handleInputChange("namePosition", e.target.value)}
                      placeholder="홍길동 / 해외영업팀장"
                      className={errors.namePosition ? "border-red-500" : ""}
                    />
                    {errors.namePosition && <p className="text-red-500 text-sm mt-1">{errors.namePosition}</p>}
                  </div>

                  {/* 주사용 항구 */}
                  <div>
                    <Label htmlFor="mainPort" className="text-sm font-medium text-gray-700 mb-2 block">
                      주사용 항구
                    </Label>
                    <Input
                      id="mainPort"
                      type="text"
                      value={formData.mainPort}
                      onChange={(e) => handleInputChange("mainPort", e.target.value)}
                      placeholder="예: 인천항, 부산항 등"
                    />
                  </div>
                </div>

                {/* 사업장 주소 */}
                <div className="mt-6">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                    사업장 주소 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="상세 주소를 입력하세요"
                    rows={3}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* 파일 첨부 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Upload className="w-6 h-6 text-[#F95700] mr-2" />
                  파일 첨부
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 사업자등록증 */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      사업자등록증 <span className="text-red-500">*</span>
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive === "businessLicense"
                          ? "border-[#F95700] bg-[#F95700]/5"
                          : errors.businessLicense
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 hover:border-[#F95700]"
                      }`}
                      onDragEnter={(e) => handleDrag(e, "businessLicense")}
                      onDragLeave={(e) => handleDrag(e, "")}
                      onDragOver={(e) => handleDrag(e, "businessLicense")}
                      onDrop={(e) => handleDrop(e, "businessLicense")}
                    >
                      {files.businessLicense ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{files.businessLicense.name}</span>
                          <button
                            type="button"
                            onClick={() => setFiles((prev) => ({ ...prev, businessLicense: null }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG 지원</p>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              e.target.files?.[0] && handleFileUpload("businessLicense", e.target.files[0])
                            }
                            className="hidden"
                            id="businessLicense"
                          />
                          <label
                            htmlFor="businessLicense"
                            className="mt-2 inline-block bg-[#F95700] text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
                          >
                            파일 선택
                          </label>
                        </>
                      )}
                    </div>
                    {errors.businessLicense && <p className="text-red-500 text-sm mt-1">{errors.businessLicense}</p>}
                  </div>

                  {/* 회사소개서 */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">회사소개서 (선택)</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive === "companyProfile"
                          ? "border-[#F95700] bg-[#F95700]/5"
                          : "border-gray-300 hover:border-[#F95700]"
                      }`}
                      onDragEnter={(e) => handleDrag(e, "companyProfile")}
                      onDragLeave={(e) => handleDrag(e, "")}
                      onDragOver={(e) => handleDrag(e, "companyProfile")}
                      onDrop={(e) => handleDrop(e, "companyProfile")}
                    >
                      {files.companyProfile ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{files.companyProfile.name}</span>
                          <button
                            type="button"
                            onClick={() => setFiles((prev) => ({ ...prev, companyProfile: null }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                          <p className="text-xs text-gray-500">자유형식</p>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={(e) =>
                              e.target.files?.[0] && handleFileUpload("companyProfile", e.target.files[0])
                            }
                            className="hidden"
                            id="companyProfile"
                          />
                          <label
                            htmlFor="companyProfile"
                            className="mt-2 inline-block bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
                          >
                            파일 선택
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 메신저 정보 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 text-[#F95700] mr-2" />
                  메신저 및 커뮤니케이션 수단
                </h2>
                <p className="text-sm text-gray-600 mb-4">여러 개 입력 가능 (선택사항)</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(messengerLabels).map(([key, label]) => (
                    <div key={key}>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">{label}</Label>
                      <div className="relative">
                        {/* 아이콘 영역 - 추후 실제 아이콘 이미지로 교체 예정 */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500 font-bold">{key.charAt(0).toUpperCase()}</span>
                        </div>
                        <Input
                          type="text"
                          value={messengers[key as keyof typeof messengers]}
                          onChange={(e) => handleMessengerChange(key, e.target.value)}
                          placeholder={messengerPlaceholders[key as keyof typeof messengerPlaceholders]}
                          className="pl-12"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 약관 동의 및 가입 버튼 */}
              <div className="border-t pt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="agreement"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="data-[state=checked]:bg-[#F95700] data-[state=checked]:border-[#F95700]"
                  />
                  <Label htmlFor="agreement" className="text-sm text-gray-700">
                    개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">(필수)</span>
                  </Label>
                </div>
                {errors.agreement && <p className="text-red-500 text-sm mb-4">{errors.agreement}</p>}

                <Button
                  type="submit"
                  className="w-full bg-[#F95700] hover:bg-[#F95700]/90 text-white py-3 text-lg font-semibold"
                >
                  가입 신청하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
