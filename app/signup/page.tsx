"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Check, AlertCircle } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    country: "KR",
    phone: "",
    contactName: "",
    email: "",
  })
  const [businessLicense, setBusinessLicense] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setBusinessLicense(file)

      // Create preview for PDF or images
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setFilePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }

      // Clear error
      if (errors.businessLicense) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.businessLicense
          return newErrors
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "회사명을 입력해주세요."
    }

    if (!formData.businessNumber.trim()) {
      newErrors.businessNumber = "사업자등록번호를 입력해주세요."
    } else if (!/^\d{10}$/.test(formData.businessNumber.replace(/-/g, ""))) {
      newErrors.businessNumber = "올바른 사업자등록번호 형식이 아닙니다."
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요."
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "담당자 이름을 입력해주세요."
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다."
    }

    if (!businessLicense) {
      newErrors.businessLicense = "사업자등록증을 업로드해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/pending-approval")
    }, 1500)
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">바이어 회원가입</h1>
          <p className="text-gray-600 mb-8 text-center">김 국제거래소 B2B 서비스 이용을 위한 회원가입 양식입니다.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    회사명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    사업자등록번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    value={formData.businessNumber}
                    onChange={handleInputChange}
                    placeholder="000-00-00000"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.businessNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.businessNumber && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.businessNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    국가 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="KR">대한민국</option>
                    <option value="CN">중국</option>
                    <option value="JP">일본</option>
                    <option value="US">미국</option>
                    <option value="OTHER">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+82-10-0000-0000"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    담당자 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.contactName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.contactName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    담당자 이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사업자등록증 업로드 <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 ${
                    errors.businessLicense ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-primary"
                  } transition-colors cursor-pointer`}
                  onClick={() => document.getElementById("businessLicense")?.click()}
                >
                  <input
                    type="file"
                    id="businessLicense"
                    name="businessLicense"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {filePreview ? (
                    <>
                      {businessLicense?.type === "application/pdf" ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-20 bg-gray-100 flex items-center justify-center rounded border border-gray-300 mb-2">
                            <span className="text-xs text-gray-500">PDF</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate max-w-full">{businessLicense.name}</p>
                          <span className="text-xs text-green-600 flex items-center mt-2">
                            <Check size={14} className="mr-1" /> 업로드 완료
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <img
                            src={filePreview || "/placeholder.svg"}
                            alt="사업자등록증 미리보기"
                            className="max-h-40 max-w-full object-contain mb-2"
                          />
                          <span className="text-xs text-green-600 flex items-center mt-2">
                            <Check size={14} className="mr-1" /> 업로드 완료
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">클릭하여 사업자등록증을 업로드하세요</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG 파일 (최대 10MB)</p>
                    </>
                  )}
                </div>
                {errors.businessLicense && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.businessLicense}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    처리 중...
                  </>
                ) : (
                  "가입 신청하기"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
