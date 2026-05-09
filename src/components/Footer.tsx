export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-6 mt-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/30 text-sm">
          © 2026 DineAuto LLC
        </p>
        <a
          href="https://dineauto.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 text-sm hover:text-[#00FF85] transition-colors duration-200"
        >
          dineauto.com
        </a>
      </div>
    </footer>
  )
}
