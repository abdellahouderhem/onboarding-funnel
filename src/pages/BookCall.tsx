import { useEffect, useRef, useState } from 'react'

const CALL_STEPS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 14.2 8 12Z" stroke="#00FF85" strokeWidth="1.5" />
        <path d="M12 4V6M12 18V20M4 12H6M18 12H20" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Connect',
    description: "We'll link your social media and Google Business Profile to DineAuto",
    step: '01',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="#00FF85" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="#00FF85" strokeWidth="1.5" />
        <path d="M9 12H15M9 16H13" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Roadmap',
    description: "You'll see exactly what gets built over the next 7 days",
    step: '02',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L10 17L19 8" stroke="#00FF85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Launch',
    description: 'By Day 7, your entire AI system will be live and running',
    step: '03',
  },
]

const FAQ = [
  {
    q: 'What do I need for the onboarding call?',
    a: 'Just 30 minutes and access to your social media and Google Business Profile login. We\'ll connect everything together on the call.',
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. We never access your passwords. All connections are made through secure integrations that you can revoke anytime with one click.',
  },
  {
    q: 'What happens after the free month?',
    a: 'If you love the results, billing starts automatically at $2,500/month. If not, you can cancel anytime — no questions asked.',
  },
]

type CalFn = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void
  q?: unknown[]
  loaded?: boolean
  ns?: Record<string, CalFn>
}

declare global {
  interface Window {
    Cal?: CalFn
  }
}

export default function BookCall() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [calLoaded, setCalLoaded] = useState(false)

  useEffect(() => {
    // If the namespace is already live (StrictMode double-mount, back-navigation),
    // nothing to do — the calendar is already rendered in the DOM.
    if (window.Cal?.ns?.['dineauto-onboarding']) {
      setCalLoaded(true)
      return
    }

    // ── Official Cal.com shim ────────────────────────────────────────────────
    // Creates window.Cal as an in-memory queue *before* embed.js loads.
    // Every Cal() call below is recorded in that queue and replayed the
    // instant embed.js finishes loading — no race condition, no onload race.
    if (!window.Cal) {
      const cal: CalFn = function (...args: unknown[]) {
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = []
          const s = document.createElement('script')
          s.id = 'cal-embed-script'
          s.src = 'https://app.cal.com/embed/embed.js'
          s.async = true
          document.head.appendChild(s)
          cal.loaded = true
        }
        if (args[0] === 'init') {
          const ns: CalFn = function (...a: unknown[]) {
            ns.q = ns.q ?? []
            ns.q.push(a)
          }
          ns.q = []
          const namespaceName = args[1] as string
          cal.ns![namespaceName] = cal.ns![namespaceName] ?? ns
          cal.q!.push(args)
          return
        }
        cal.q!.push(args)
      } as CalFn
      cal.q = []
      cal.loaded = false
      window.Cal = cal
    }

    // ── Wire up the embed ────────────────────────────────────────────────────
    // These calls are queued immediately and executed once embed.js loads.
    window.Cal!('init', 'dineauto-onboarding', { origin: 'https://app.cal.com' })

    window.Cal!.ns!['dineauto-onboarding']('inline', {
      elementOrSelector: '#my-cal-inline-dineauto-onboarding',
      calLink: 'abdellah-ouderhem/dineauto-onboarding',
      config: {
        layout: 'month_view',
        theme: 'dark',
        useSlotsViewOnSmallScreen: 'true',
      },
    })

    window.Cal!.ns!['dineauto-onboarding']('ui', {
      theme: 'dark',
      hideEventTypeDetails: false,
      layout: 'month_view',
    })

    // Show the container right away — the iframe renders inside it
    // as soon as embed.js processes the queue (~200–500 ms).
    setCalLoaded(true)
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="fade-up-1 inline-flex items-center gap-2 bg-[#00FF85]/8 border border-[#00FF85]/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00FF85]" style={{ animation: 'none', boxShadow: '0 0 8px #00FF85' }} />
          <span className="text-[#00FF85] text-sm font-medium">Step 3 of 3 — Final Step!</span>
        </div>

        <h1 className="fade-up-2 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          You're Almost{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00FF85, rgba(0,255,133,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            There!
          </span>
        </h1>

        <p className="fade-up-3 text-secondary text-lg max-w-xl mx-auto">
          Book your 30-minute onboarding call and we'll connect everything together.
        </p>
      </div>

      {/* What Happens On The Call */}
      <div className="fade-up-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {CALL_STEPS.map((s, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 text-center relative overflow-hidden group hover:border-[#00FF85]/25 transition-all duration-300"
          >
            {/* Step number */}
            <div
              className="absolute top-4 right-4 text-xs font-bold tabular-nums"
              style={{ color: 'rgba(0,255,133,0.25)' }}
            >
              {s.step}
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#00FF85]/8 border border-[#00FF85]/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00FF85]/12 transition-colors duration-300">
              {s.icon}
            </div>
            <h3 className="font-bold text-base mb-2 text-white">{s.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Timeline indicator */}
      <div className="fade-up-5 flex items-center justify-center gap-2 mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00FF85]/20" />
        <div className="flex items-center gap-6 text-sm">
          {['Day 1', 'Day 3', 'Day 7'].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#00FF85]/60" />
              <span className="text-white/30 text-xs">{d}</span>
            </div>
          ))}
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00FF85]/20" />
      </div>

      {/* Cal.com Calendar Embed */}
      <div className="fade-up-5 mb-12">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00FF85]" style={{ boxShadow: '0 0 8px #00FF85' }} />
            <span className="text-white/70 text-sm font-medium">Book Your 30-Minute Onboarding Call</span>
          </div>

          {/* Cal embed container — ID must match elementOrSelector in initCal */}
          <div style={{ position: 'relative', minHeight: 600 }}>
            {!calLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#00FF85]/30 border-t-[#00FF85] animate-spin" />
                  <p className="text-white/30 text-sm">Loading calendar...</p>
                </div>
              </div>
            )}
            <div
              id="my-cal-inline-dineauto-onboarding"
              style={{ width: '100%', height: '100%', minHeight: 600, overflow: 'scroll' }}
            />
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="fade-up-6 mb-12">
        <h2 className="text-xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.q}
              answer={item.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Final reassurance */}
      <div className="fade-up-6 glass-card rounded-2xl p-6 flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/20 flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 3L20 7.5V12C20 16.7 16 20.9 11 22C6 20.9 2 16.7 2 12V7.5L11 3Z" stroke="#00FF85" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7.5 11L10 13.5L14.5 9" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-sm text-white">100% Risk-Free</p>
          <p className="text-secondary text-sm">
            Try DineAuto free. No credit card needed. Cancel anytime, no questions asked.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── AccordionItem ─────────────────────────────────────────────────────────────
// Uses a ref to read actual scrollHeight so the height transition is exact —
// no fixed max-height guessing, no jarring speed mismatch.
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!bodyRef.current) return
    // Measure after paint so the DOM has the content
    const measured = bodyRef.current.scrollHeight
    setHeight(isOpen ? measured : 0)
  }, [isOpen])

  return (
    <div className="accordion-item">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm sm:text-base text-white/90 leading-snug">{question}</span>
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            background: isOpen ? 'rgba(0,255,133,0.12)' : 'rgba(255,255,255,0.05)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2V10M2 6H10"
              stroke={isOpen ? '#00FF85' : 'rgba(255,255,255,0.4)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      {/* Height animates from 0 → exact scrollHeight, so expansion is always smooth */}
      <div
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={bodyRef} className="px-5 pb-5">
          <div className="h-px bg-white/5 mb-4" />
          <p className="text-secondary text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}
