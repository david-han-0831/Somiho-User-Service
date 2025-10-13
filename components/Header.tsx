"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Header() {
  const [selectedLang, setSelectedLang] = useState("kr")

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo/존스김밥로고2.png" alt="온라인 마른김 거래소 로고" className="h-10 w-auto" />
            <span className="text-xl font-bold text-[#F95700]">온라인 마른김 거래소</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
            플랫폼 소개
          </Link>
          <Link href="/guide" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
            이용방법
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-[#F95700]">
            제품 보기
          </Link>
          {/* 시세 정보 - 비노출 처리 (2025.10.13 수정사항) */}
          {/* <Link href="/market-price" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
            시세 정보
          </Link> */}
          <Link href="/notice" className="text-sm font-medium text-gray-700 hover:text-[#F95700]">
            공지사항
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSelectedLang("kr")}
              className={`flex h-6 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white p-0.5 transition-all hover:opacity-80 ${selectedLang === "kr" ? "opacity-100 ring-2 ring-[#F95700]" : "opacity-50"}`}
            >
              <img src="https://flagcdn.com/kr.svg" alt="한국어" width={24} height={16} className="h-full w-full object-cover" />
            </button>
            <button 
              onClick={() => setSelectedLang("us")}
              className={`flex h-6 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white p-0.5 transition-all hover:opacity-80 ${selectedLang === "us" ? "opacity-100 ring-2 ring-[#F95700]" : "opacity-50"}`}
            >
              <img src="https://flagcdn.com/us.svg" alt="English" width={24} height={16} className="h-full w-full object-cover" />
            </button>
            <button 
              onClick={() => setSelectedLang("cn")}
              className={`flex h-6 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white p-0.5 transition-all hover:opacity-80 ${selectedLang === "cn" ? "opacity-100 ring-2 ring-[#F95700]" : "opacity-50"}`}
            >
              <img src="https://flagcdn.com/cn.svg" alt="中文" width={24} height={16} className="h-full w-full object-cover" />
            </button>
            <button 
              onClick={() => setSelectedLang("jp")}
              className={`flex h-6 w-8 items-center justify-center rounded-sm border border-gray-200 bg-white p-0.5 transition-all hover:opacity-80 ${selectedLang === "jp" ? "opacity-100 ring-2 ring-[#F95700]" : "opacity-50"}`}
            >
              <img src="https://flagcdn.com/jp.svg" alt="日本語" width={24} height={16} className="h-full w-full object-cover" />
            </button>
          </div>
          <Link href="/signup">
            <Button size="sm">회원가입</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
