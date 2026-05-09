import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ParticleBackground from './ParticleBackground'
import ProgressBar from './ProgressBar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0f0a' }}>
      <ParticleBackground />
      <ProgressBar />

      {/* Main content — key forces remount on route change so fade-up animations replay */}
      <main key={pathname} className="relative z-10 pt-24 pb-8 page-enter">
        {children}
      </main>

      <Footer />
    </div>
  )
}
