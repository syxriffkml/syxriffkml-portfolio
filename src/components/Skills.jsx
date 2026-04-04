import { useEffect, useRef } from 'react'
import { motion, useAnimate } from 'motion/react'
import { skills } from '../data/skills'
import AnimatedTitle from './AnimatedTitle'

function MarqueeRow({ items, direction = 1, duration = 28 }) {
  const doubled = [...items, ...items]
  const [scope, animate] = useAnimate()
  const animRef = useRef(null)

  useEffect(() => {
    animRef.current = animate(
      scope.current,
      { x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] },
      { duration, ease: 'linear', repeat: Infinity }
    )
  }, [])

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => animRef.current?.pause()}
      onMouseLeave={() => animRef.current?.play()}
    >
      <div
        ref={scope}
        style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon
          return (
            <div
              key={`${skill.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#fff',
                border: '2px solid var(--color-border)',
                borderRadius: '999px',
                padding: '0.55rem 1.1rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px rgba(183,153,245,0.08)',
              }}
            >
              <Icon size={18} style={{ color: skill.color, flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--color-text)',
              }}>
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const row1 = skills
  const row2 = [...skills].reverse()

  return (
    <section id="skills">
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="section-label">Skills</span>
          <AnimatedTitle className="section-title">My Tech Stack</AnimatedTitle>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            maxWidth: '480px',
          }}>
            Tools and technologies I&apos;ve worked with — and always adding more to the list. ✨
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — full bleed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <MarqueeRow items={row1} direction={1} duration={30} />
        <MarqueeRow items={row2} direction={-1} duration={26} />
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
          ...and always learning more 🌱
        </p>
      </div>
    </section>
  )
}
