import { useLocation } from 'react-router-dom'

const STEPS = [
  { path: '/', label: 'Welcome', step: 1 },
  { path: '/info', label: 'Your Info', step: 2 },
  { path: '/book', label: 'Book Call', step: 3 },
]

export default function ProgressBar() {
  const { pathname } = useLocation()
  const currentStep = STEPS.find((s) => s.path === pathname)?.step ?? 1

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Step labels */}
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s) => {
            const isActive = s.step === currentStep
            const isDone = s.step < currentStep
            return (
              <div key={s.path} className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 flex-shrink-0
                    ${isDone
                      ? 'bg-[#00FF85] text-[#0a0f0a]'
                      : isActive
                      ? 'bg-[#00FF85]/20 border border-[#00FF85] text-[#00FF85]'
                      : 'bg-white/5 border border-white/15 text-white/30'
                    }
                  `}
                >
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#0a0f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : s.step}
                </div>
                {/* Hide label text on very narrow screens — the numbered circles are enough */}
                <span
                  className={`hidden xs:block text-xs font-medium transition-all duration-300 ${
                    isActive ? 'text-[#00FF85]' : isDone ? 'text-white/60' : 'text-white/25'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Progress track */}
        <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
              background: 'linear-gradient(90deg, #00FF85, rgba(0,255,133,0.6))',
              boxShadow: '0 0 12px rgba(0,255,133,0.5)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
