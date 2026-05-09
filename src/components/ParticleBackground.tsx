import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  fadeDir: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // More particles, tuned for visibility without being distracting
    const COUNT = 65

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle(atBottom = false): Particle {
      const h = canvas?.height ?? window.innerHeight
      const w = canvas?.width ?? window.innerWidth
      return {
        x: Math.random() * w,
        y: atBottom ? h + Math.random() * 40 : Math.random() * h,
        // Slight horizontal drift, predominantly upward
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.5 + 0.2),
        radius: Math.random() * 1.8 + 0.5,
        // Start in a visible range — 0.12 to 0.6
        opacity: Math.random() * 0.35 + 0.12,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      }
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < COUNT; i++) {
      particlesRef.current.push(createParticle())
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        // Gently breathe opacity
        p.opacity += p.fadeDir * 0.0015

        if (p.opacity <= 0.08 || p.opacity >= 0.65) p.fadeDir *= -1

        // Wrap: when particle drifts off-screen, respawn at bottom
        if (p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
          particlesRef.current[i] = createParticle(true)
          return
        }

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#00FF85'
        // Stronger glow so dots are clearly visible
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00FF85'
        ctx.fill()
        ctx.restore()
      })

      // Subtle connecting lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i]
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.save()
            ctx.globalAlpha = ((110 - dist) / 110) * 0.05
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#00FF85'
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}
