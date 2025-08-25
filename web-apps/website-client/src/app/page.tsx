'use client'

import { useState, useEffect } from 'react'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import HowItWorks from '../components/sections/HowItWorks'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'
import Stats from '../components/sections/Stats'
import Contact from '../components/sections/Contact'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Services Section */}
      <Services />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Contact Section */}
      <Contact />
      
      <Footer />
    </main>
  )
}
