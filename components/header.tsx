"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">김 국제거래소 B2B</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
              제품 보기
            </Link>
            <Link href="/market-price" className="text-gray-700 hover:text-primary transition-colors">
              김 시세 정보
            </Link>
            <Link href="/notice" className="text-gray-700 hover:text-primary transition-colors">
              공지사항
            </Link>
          </nav>

          {/* Right Side - Language & Sign Up */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/my/reservations" className="text-gray-700 hover:text-primary transition-colors">
              예약 내역
            </Link>
            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="ko"
              >
                <option value="ko">한국어</option>
                <option value="en" disabled>
                  English
                </option>
                <option value="zh" disabled>
                  中文
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <Link href="/signup" className="btn-primary">
              회원가입
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              제품 보기
            </Link>
            <Link
              href="/market-price"
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              김 시세 정보
            </Link>
            <Link
              href="/notice"
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              공지사항
            </Link>
            <Link
              href="/my/reservations"
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              예약 내역
            </Link>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <select
                  className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="ko"
                >
                  <option value="ko">한국어</option>
                  <option value="en" disabled>
                    English
                  </option>
                  <option value="zh" disabled>
                    中文
                  </option>
                </select>
                <Link href="/signup" className="btn-primary">
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
