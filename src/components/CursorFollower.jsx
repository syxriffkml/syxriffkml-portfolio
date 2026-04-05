import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const COLORS = [
  '#B799F5', '#7C4DFF', '#FF7F6E', '#FFD166', '#EC4899', '#fff'
]

let idCounter = 0

export default function CursorFollower() {
  const [particles, setParticles] = useState([])
  const throttle = useRef(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      if (throttle.current) return
      throttle.current = true
      setTimeout(() => { throttle.current = false }, 30)

      const id = idCounter++
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size = Math.random() * 18 + 12
      const angle = Math.random() * 360
      const drift = Math.random() * 20 + 8

      setParticles(prev => [...prev.slice(-30), { id, x: e.clientX, y: e.clientY, color, size, angle, drift }])
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <AnimatePresence>
        {particles.map(({ id, x, y, color, size, angle, drift }) => (
          <motion.svg
            key={id}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            initial={{
              x: x - size / 2,
              y: y - size / 2,
              opacity: 1,
              scale: 1,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: x - size / 2 + Math.cos((angle * Math.PI) / 180) * drift,
              y: y - size / 2 + Math.sin((angle * Math.PI) / 180) * drift,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setParticles(prev => prev.filter(p => p.id !== id))
            }
            style={{ position: 'absolute', pointerEvents: 'none', filter: `drop-shadow(0 0 ${size / 2}px ${color})` }}
          >
            <path
              d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
              fill={color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  )
}
