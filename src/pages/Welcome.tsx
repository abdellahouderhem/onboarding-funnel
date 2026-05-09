import { useNavigate } from 'react-router-dom'

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L24 9V15C24 20.5 19.5 25.5 14 27C8.5 25.5 4 20.5 4 15V9L14 4Z" stroke="#00FF85" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 14L13 17L18 12" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'AI Content Creation',
    description: 'Scroll-stopping content that fills your feed and your tables',
    tag: 'Social & Reels',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="#00FF85" strokeWidth="1.5" />
        <path d="M4 11H24" stroke="#00FF85" strokeWidth="1.5" />
        <path d="M9 17H12" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 17H19" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Paid Advertising',
    description: 'Targeted ads that put your restaurant in front of hungry customers',
    tag: 'Meta & Google',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 8C5 6.9 5.9 6 7 6H21C22.1 6 23 6.9 23 8V16C23 17.1 22.1 18 21 18H16L12 23V18H7C5.9 18 5 17.1 5 16V8Z" stroke="#00FF85" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="10" cy="12" r="1" fill="#00FF85" />
        <circle cx="14" cy="12" r="1" fill="#00FF85" />
        <circle cx="18" cy="12" r="1" fill="#00FF85" />
      </svg>
    ),
    title: 'AI Customer Support & Booking',
    description: '24/7 AI agent that handles DMs, calls, and reservations',
    tag: '24/7 Automation',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L16.5 9.5L22.5 10.5L18.5 14.5L19.5 20.5L14 17.5L8.5 20.5L9.5 14.5L5.5 10.5L11.5 9.5L14 4Z" stroke="#00FF85" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Review & Reputation Automation',
    description: 'Automatic review collection and AI-powered responses',
    tag: 'Google Reviews',
  },
]

const TRUST_POINTS = [
  'We never ask for your passwords',
  'You can revoke access with one click anytime',
  'All content and data remain 100% yours',
]

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Hero */}
      <div className="relative text-center py-12 sm:py-20">
        {/* Pulsing radial glow behind the headline — purely decorative */}
        <div
          aria-hidden="true"
          className="headline-glow"
        />

        {/* Badge */}
        <div className="fade-up-1 inline-flex items-center gap-2 bg-[#00FF85]/8 border border-[#00FF85]/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
          <span className="text-[#00FF85] text-sm font-medium tracking-wide">Your system is ready to activate</span>
        </div>

        <h1 className="fade-up-2 relative text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
          Welcome to{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #00FF85 0%, rgba(0,255,133,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DineAuto
          </span>
        </h1>

        <p className="fade-up-3 relative text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          Your AI-powered restaurant growth system is about to go live.
        </p>
      </div>

      {/* Services */}
      <section className="fade-up-4 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Here's What We're Building{' '}
            <span className="text-[#00FF85]">For You</span>
          </h2>
          <p className="text-secondary">Four systems. One integrated engine. All running on autopilot.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card group">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#00FF85]/8 border border-[#00FF85]/15 flex items-center justify-center group-hover:bg-[#00FF85]/12 transition-colors duration-300">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-base">{s.title}</h3>
                    <span className="text-[10px] font-semibold text-[#00FF85] bg-[#00FF85]/10 border border-[#00FF85]/20 px-2 py-0.5 rounded-full tracking-wider uppercase">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
              {/* Bottom accent line */}
              <div className="h-px bg-gradient-to-r from-[#00FF85]/20 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="fade-up-5 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Accounts{' '}
            <span className="text-[#00FF85]">Stay Safe</span>
          </h2>
          <p className="text-secondary">We work with you, not around you. Your access, your control.</p>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden mb-10 glass-card p-1">
          <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/PLACEHOLDER"
              title="DineAuto — How we keep your accounts secure"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
          {/* Glow frame */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 40px rgba(0,255,133,0.06)',
              border: '1px solid rgba(0,255,133,0.15)',
            }}
          />
        </div>

        {/* Trust Bullets */}
        <div className="glass-card rounded-2xl p-8">
          <div className="flex flex-col gap-5">
            {TRUST_POINTS.map((point, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00FF85]/12 border border-[#00FF85]/25 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-white/85 font-medium text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="fade-up-6 flex flex-col items-center gap-4 pb-8">
        <button
          onClick={() => navigate('/info')}
          className="btn-primary text-lg px-10 py-5 rounded-xl animate-pulse-glow"
          style={{ minWidth: 280 }}
        >
          Continue to Next Step
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#0a0f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-white/25 text-sm">Step 1 of 3 — Takes about 3 minutes</p>
      </div>
    </div>
  )
}
