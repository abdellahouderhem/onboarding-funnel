import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzQPUvBExtf3aSAJhU9flLO7ATNNU0m8PVOJOSikZfitft5bezjOvVaQzqbj2GJ3PWWDw/exec'

interface FormData {
  restaurantName: string
  monthlyCustomers: string
  websiteUrl: string
  instagramHandle: string
  facebookPageUrl: string
  googleBusinessUrl: string
  monthlyAdBudget: string
  topGoals: string
}

interface FormErrors {
  [key: string]: string
}

const REQUIRED_FIELDS: (keyof FormData)[] = [
  'restaurantName',
  'monthlyCustomers',
  'monthlyAdBudget',
  'topGoals',
]

export default function RestaurantInfo() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [form, setForm] = useState<FormData>({
    restaurantName: '',
    monthlyCustomers: '',
    websiteUrl: '',
    instagramHandle: '',
    facebookPageUrl: '',
    googleBusinessUrl: '',
    monthlyAdBudget: '',
    topGoals: '',
  })

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) {
      const firstError = document.querySelector('.input-dark.error')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        restaurantName: form.restaurantName,
        monthlyCustomers: form.monthlyCustomers,
        websiteUrl: form.websiteUrl,
        instagramHandle: form.instagramHandle,
        facebookPageUrl: form.facebookPageUrl,
        googleBusinessUrl: form.googleBusinessUrl,
        monthlyAdBudget: form.monthlyAdBudget,
        topGoals: form.topGoals,
      }

      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      navigate('/book')
    } catch {
      // no-cors mode means we can't read the response — treat as success
      navigate('/book')
    }
  }

  const inputClass = (field: keyof FormData) =>
    `input-dark${errors[field] ? ' error' : ''}`

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="fade-up-1 inline-flex items-center gap-2 bg-[#00FF85]/8 border border-[#00FF85]/20 rounded-full px-4 py-2 mb-6">
          <span className="text-[#00FF85] text-sm font-medium">Step 2 of 3</span>
        </div>
        <h1 className="fade-up-2 text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Tell Us About Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00FF85, rgba(0,255,133,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Restaurant
          </span>
        </h1>
        <p className="fade-up-3 text-secondary text-lg">
          Fill in your details so we can start building your custom AI system.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="fade-up-4">
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">

          {/* RESTAURANT BASICS */}
          <SectionLabel icon="🍽️" label="Restaurant Basics" />

          <Field label="Restaurant Name" required error={errors.restaurantName}>
            <input
              type="text"
              className={inputClass('restaurantName')}
              placeholder="e.g., Marco's Italian Kitchen"
              value={form.restaurantName}
              onChange={update('restaurantName')}
            />
          </Field>

          <Field label="Number of Monthly Customers" required error={errors.monthlyCustomers}>
            <select
              className={inputClass('monthlyCustomers')}
              value={form.monthlyCustomers}
              onChange={update('monthlyCustomers')}
            >
              <option value="">Select range...</option>
              <option value="Under 500">Under 500</option>
              <option value="500-1000">500–1,000</option>
              <option value="1000-3000">1,000–3,000</option>
              <option value="3000+">3,000+</option>
            </select>
          </Field>

          <div className="h-px bg-white/5" />

          {/* ONLINE PRESENCE */}
          <SectionLabel icon="🌐" label="Online Presence" />

          <Field label="Website URL">
            <input
              type="text"
              className="input-dark"
              placeholder="Leave blank if you don't have one"
              value={form.websiteUrl}
              onChange={update('websiteUrl')}
            />
          </Field>

          <Field label="Instagram Handle">
            <input
              type="text"
              className="input-dark"
              placeholder="@yourrestaurant"
              value={form.instagramHandle}
              onChange={update('instagramHandle')}
            />
          </Field>

          <Field label="Facebook Page URL">
            <input
              type="text"
              className="input-dark"
              placeholder="https://facebook.com/yourrestaurant"
              value={form.facebookPageUrl}
              onChange={update('facebookPageUrl')}
            />
          </Field>

          <Field label="Google Business Profile URL">
            <input
              type="text"
              className="input-dark"
              placeholder="https://maps.google.com/..."
              value={form.googleBusinessUrl}
              onChange={update('googleBusinessUrl')}
            />
          </Field>

          <div className="h-px bg-white/5" />

          {/* YOUR GOALS */}
          <SectionLabel icon="🎯" label="Your Goals" />

          <Field label="Monthly Ad Budget" required error={errors.monthlyAdBudget}>
            <select
              className={inputClass('monthlyAdBudget')}
              value={form.monthlyAdBudget}
              onChange={update('monthlyAdBudget')}
            >
              <option value="">Select budget...</option>
              <option value="$300-500">$300–500/mo</option>
              <option value="$500-1000">$500–1,000/mo</option>
              <option value="$1000-2000">$1,000–2,000/mo</option>
              <option value="$2000+">$2,000+/mo</option>
            </select>
          </Field>

          <Field label="Top 3 Goals for Next 90 Days" required error={errors.topGoals}>
            <textarea
              className={`${inputClass('topGoals')} resize-none`}
              rows={4}
              placeholder="What matters most to you right now? (e.g., More walk-in traffic, better online reviews, fill more weekend reservations)"
              value={form.topGoals}
              onChange={update('topGoals')}
            />
          </Field>

        </div>

        {/* Submit */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary text-base px-8 py-4 rounded-xl w-full sm:w-auto"
            style={{ minWidth: 320 }}
          >
            {submitting ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#0a0f0a" strokeWidth="2" strokeDasharray="22" strokeDashoffset="6" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit & Book Your Onboarding Call
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="#0a0f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
          <p className="text-white/25 text-sm text-center">
            Your information is secure and never shared with third parties
          </p>
        </div>
      </form>
    </div>
  )
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 pb-1">
      <span className="text-xl">{icon}</span>
      <h3 className="text-sm font-semibold text-[#00FF85] tracking-wider uppercase">{label}</h3>
      <div className="flex-1 h-px bg-[#00FF85]/10" />
    </div>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-[#00FF85] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5 mt-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 4V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6" cy="8.5" r="0.6" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
