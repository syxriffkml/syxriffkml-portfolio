import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { workExperience } from '../data/experience'
import { Briefcase } from 'lucide-react'
import AnimatedTitle from './AnimatedTitle'

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return width
}

function getAdjustedCat(cat, windowWidth) {
  const baseWidth = parseFloat(cat.width)
  const baseRight = parseFloat(cat.right)
  const baseBottom = parseFloat(cat.bottom)

  let widthMult = 0, rightShiftPct = 0, bottomShiftPct = 0
  if (windowWidth <= 480) {
    widthMult = -0.2; rightShiftPct = 0.10; bottomShiftPct = 0.10
  } else if (windowWidth <= 640) {
    widthMult = -0.1; rightShiftPct = 0.05; bottomShiftPct = 0.05
  } else {
    return cat
  }

  const newWidth = baseWidth * (1 + widthMult)
  return {
    ...cat,
    width: `${newWidth}px`,
    right: `${baseRight - baseWidth * rightShiftPct}px`,
    bottom: `${baseBottom + baseWidth * bottomShiftPct}px`,
  }
}

/* Tweak per card: right, bottom, width, rotate */
const catConfigs = [
  { src: '/cute_chibi_cat_4.png', right: '-10px', bottom: '-36px', width: '180px', rotate: '-15deg' },
  { src: '/cute_chibi_cat_5.png', right: '-19px', bottom: '-22px', width: '155px', rotate: '-10deg' },
  { src: '/cute_chibi_cat_6.png', right: '-17px', bottom: '-40px', width: '180px', rotate: '-10deg' },
]

function ExperienceCard({ job, cat, motionProps }) {
  const cardRef = useRef(null)
  const catRef = useRef(null)
  const bulletRefs = useRef([])
  const prevPaddings = useRef([])
  const [paddings, setPaddings] = useState(() => job.bullets.map(() => 0))

  const measure = useCallback(() => {
    if (!cat || !cardRef.current || !catRef.current) return
    const cardRect = cardRef.current.getBoundingClientRect()
    const catRect = catRef.current.getBoundingClientRect()
    const reservedPx = Math.max(0, cardRect.right - catRect.left + 8)

    const next = bulletRefs.current.map(li => {
      if (!li) return 0
      const liRect = li.getBoundingClientRect()
      const overlaps = liRect.bottom > catRect.top && liRect.top < catRect.bottom
      return overlaps ? reservedPx : 0
    })

    const changed = next.some((p, i) => p !== prevPaddings.current[i])
    if (changed) {
      prevPaddings.current = next
      setPaddings(next)
    }
  }, [cat])

  useLayoutEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [measure])

  return (
    <motion.div
      ref={cardRef}
      {...motionProps}
      style={{
        position: 'relative',
        background: 'var(--color-card)',
        border: '2px solid var(--color-border)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Briefcase size={15} color="var(--color-primary-dark)" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text)' }}>{job.role}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>{job.company}</div>
        </div>
        <span style={{ background: 'var(--color-tag)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', padding: '0.25rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap' }}>{job.period}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
        {job.tags.map(tag => (
          <span key={tag} style={{ background: 'var(--color-surface-2)', color: 'var(--color-primary-dark)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', padding: '0.15rem 0.6rem', borderRadius: '999px' }}>{tag}</span>
        ))}
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {job.bullets.map((b, bi) => (
          <li
            key={bi}
            ref={el => { bulletRefs.current[bi] = el }}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', paddingRight: paddings[bi] || 0 }}
          >
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', flexShrink: 0, marginTop: '3px' }}>✦</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{b}</span>
          </li>
        ))}
      </ul>

      {cat && (
        <img
          ref={catRef}
          src={cat.src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: cat.right,
            bottom: cat.bottom,
            width: cat.width,
            height: cat.width,
            rotate: cat.rotate,
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: 0.9,
          }}
        />
      )}
    </motion.div>
  )
}

export default function Experience() {
  const windowWidth = useWindowWidth()

  return (
    <section id="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src="/cute_chibi_cat_2.png"
              alt=""
              aria-hidden="true"
              className="pastel-rgb-cat"
              style={{ position: 'absolute', top: '-50px', left: '10px', width: '58px', height: '58px', objectFit: 'contain', pointerEvents: 'none' }}
            />
            <span className="section-label pastel-rgb-label" style={{ position: 'relative', zIndex: 1 }}>Experience</span>
          </div>
          <AnimatedTitle className="section-title">Where I&apos;ve Worked</AnimatedTitle>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: 'var(--color-border)', borderRadius: '999px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {workExperience.map((job, i) => (
              <div key={job.id} style={{ position: 'relative' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute', left: '-2.5rem', top: '1.1rem',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'var(--color-primary)', border: '3px solid var(--color-card)',
                    boxShadow: '0 0 0 2px var(--color-primary)',
                  }}
                />
                <ExperienceCard
                  job={job}
                  cat={getAdjustedCat(catConfigs[i % catConfigs.length], windowWidth)}
                  motionProps={{
                    initial: { opacity: 0, x: 30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.45, delay: i * 0.1 + 0.05, ease: 'easeOut' },
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
