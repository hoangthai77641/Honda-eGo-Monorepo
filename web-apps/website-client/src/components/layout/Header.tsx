'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/services' },
    { name: 'Cách thức hoạt động', href: '/how-it-works' },
    { name: 'Tài xế', href: '/driver' },
    { name: 'Về chúng tôi', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Honda <span className="text-primary-500">eGo</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <FiPhone className="w-4 h-4" />
                <span>1900-1234</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiMail className="w-4 h-4" />
                <span>support@honda-ego.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="btn-primary"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiPhone className="w-4 h-4" />
                  <span>1900-1234</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiMail className="w-4 h-4" />
                  <span>support@honda-ego.com</span>
                </div>
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/login"
                    className="text-center py-2 text-gray-700 hover:text-primary-500 font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary text-center"
                  >
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
