import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Download, ArrowDown } from 'lucide-react'

const sparkles = [
  { top: '12%', left: '8%', size: 22, delay: 0 },
  { top: '70%', left: '5%', size: 14, delay: 0.6 },
  { top: '20%', right: '6%', size: 18, delay: 0.3 },
  { top: '80%', right: '10%', size: 24, delay: 0.9 },
  { top: '50%', left: '50%', size: 12, delay: 1.2 },
  { top: '35%', left: '40%', size: 10, delay: 0.5 },
]

const codeSnippets = [
  { text: '<div />', top: '15%', left: '3%', delay: 0, rotate: -12, duration: 2.5 },
  { text: '{ }', top: '72%', left: '2%', delay: 0.4, rotate: 8, duration: 2 },
  { text: 'useEffect', top: '30%', right: '2%', delay: 0.2, rotate: 10, duration: 2.8 },
  { text: 'useState', top: '62%', right: '3%', delay: 0.6, rotate: -8, duration: 2.2 },
  { text: '</>', top: '85%', left: '30%', delay: 0.3, rotate: 5, duration: 2.5 },
  { text: 'npm install', top: '8%', right: '22%', delay: 0.1, rotate: -6, duration: 3 },
  { text: 'flex', top: '45%', left: '1%', delay: 0.5, rotate: 14, duration: 2 },
  { text: ':root', top: '90%', right: '18%', delay: 0.7, rotate: -10, duration: 2.6 },
]

function Sparkle({ style, size, delay }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: 'absolute', ...style, pointerEvents: 'none', zIndex: 1 }}
      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        fill="var(--color-primary)"
      />
    </motion.svg>
  )
}

function CodeSnippet({ text, top, left, right, delay, rotate, duration }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        pointerEvents: 'none',
        zIndex: 1,
        fontFamily: 'monospace',
        fontSize: '0.78rem',
        fontWeight: 700,
        color: 'var(--color-primary-dark)',
        background: 'var(--color-tag)',
        border: '1.5px solid var(--color-border)',
        borderRadius: '0.5rem',
        padding: '0.2rem 0.55rem',
        opacity: 0.7,
        rotate,
      }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.5, 0.85, 0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {text}
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms — aggressive, blobs fully slide off by the time About is visible
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-160%'])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-120%'])
  const blob3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
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

      {/* Floating code snippets */}
      {codeSnippets.map((s, i) => (
        <CodeSnippet key={i} {...s} />
      ))}

      {/* Background blobs — with parallax */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
          background: 'var(--color-surface)',
          zIndex: -1,
          opacity: 0.7,
          y: blob1Y,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '-8%',
          width: '30vw',
          height: '30vw',
          borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%',
          background: 'var(--color-surface-2)',
          zIndex: -1,
          opacity: 0.5,
          y: blob2Y,
        }}
      />
      {/* Third accent blob */}
      <motion.div
        style={{
          position: 'absolute',
          top: '40%',
          left: '30%',
          width: '18vw',
          height: '18vw',
          borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
          background: 'var(--color-accent-2)',
          zIndex: -1,
          opacity: 0.12,
          y: blob3Y,
        }}
      />

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
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.img
                src="/cute_chibi_cat_1.png"
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, y: 12, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                style={{
                  position: 'absolute',
                  top: '-42px',
                  left: '0px',
                  width: '58px',
                  height: '58px',
                  objectFit: 'contain',
                  zIndex: 0,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 2px 6px rgba(183,153,245,0.4))',
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                style={{
                  position: 'relative',
                  zIndex: 1,
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
            </div>

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
              Syariff <span style={{ color: 'var(--color-primary-dark)' }}>Kamil</span>
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
              className="hero-buttons"
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
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'var(--color-primary-dark)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '999px',
                  border: '1.5px solid var(--color-primary)',
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
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
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
          .hero-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
