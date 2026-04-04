import { motion } from 'motion/react'
import { Download, ArrowDown } from 'lucide-react'

const sparkles = [
  { top: '12%', left: '8%', size: 22, delay: 0 },
  { top: '70%', left: '5%', size: 14, delay: 0.6 },
  { top: '20%', right: '6%', size: 18, delay: 0.3 },
  { top: '80%', right: '10%', size: 24, delay: 0.9 },
  { top: '50%', left: '50%', size: 12, delay: 1.2 },
  { top: '35%', left: '40%', size: 10, delay: 0.5 },
]

function Sparkle({ style, size, delay }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: 'absolute', ...style, pointerEvents: 'none' }}
      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        fill="var(--color-primary)"
      />
    </motion.svg>
  )
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
      }}
    >
      {/* Background sparkles */}
      {sparkles.map((s, i) => (
        <Sparkle key={i} style={{ top: s.top, left: s.left, right: s.right }} size={s.size} delay={s.delay} />
      ))}

      {/* Background blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40vw',
        height: '40vw',
        borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
        background: 'var(--color-surface)',
        zIndex: 0,
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-8%',
        left: '-8%',
        width: '30vw',
        height: '30vw',
        borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%',
        background: 'var(--color-surface-2)',
        zIndex: 0,
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
          className="hero-grid"
        >
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              style={{
                display: 'inline-block',
                background: 'var(--color-tag)',
                color: 'var(--color-primary-dark)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0.3rem 1rem',
                borderRadius: '999px',
                marginBottom: '1rem',
              }}
            >
              hey, i&apos;m 👋
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}
            >
              Syariff<br />
              <span style={{ color: 'var(--color-primary-dark)' }}>Kamil</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                marginBottom: '2rem',
                letterSpacing: '0.01em',
              }}
            >
              Front-end Developer · Malaysia 🇲🇾<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Building things that feel good to use.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 20px rgba(255,127,110,0.35)',
                }}
              >
                View Projects <ArrowDown size={16} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  color: 'var(--color-primary-dark)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '999px',
                  border: '2px solid var(--color-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                Download CV <Download size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Blob behind photo */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '88%',
                height: '88%',
                borderRadius: '62% 38% 55% 45% / 52% 58% 42% 48%',
                background: 'var(--color-surface-2)',
                zIndex: 0,
                top: '6%',
                left: '6%',
              }}
            />
            {/* Secondary blob accent */}
            <div style={{
              position: 'absolute',
              width: '40%',
              height: '40%',
              borderRadius: '50%',
              background: 'var(--color-accent-2)',
              opacity: 0.25,
              bottom: '5%',
              right: '5%',
              zIndex: 0,
            }} />

            <motion.img
              src="/Copy_of_Untitled_Design-removebg-preview.png"
              alt="Syariff Kamil"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '380px',
                borderRadius: '2rem',
                objectFit: 'cover',
                filter: 'drop-shadow(0 20px 40px rgba(183,153,245,0.3))',
              }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />

            {/* Floating badge */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '-2%',
                zIndex: 2,
                background: '#fff',
                border: '2px solid var(--color-border)',
                borderRadius: '1.25rem',
                padding: '0.6rem 1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'var(--color-text)',
                boxShadow: '0 8px 24px rgba(183,153,245,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              ✨ Open to work!
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
          .hero-grid button, .hero-grid a {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
