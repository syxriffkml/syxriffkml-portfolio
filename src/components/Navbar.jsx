import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(NAV_LINKS.map(l => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(250,247,242,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(183,153,245,0.12)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.3rem',
            color: 'var(--color-primary-dark)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          syxriffkml ✦
        </button>

        {/* Desktop links */}
        <ul style={{ gap: '0.25rem', listStyle: 'none', alignItems: 'center' }} className="hidden md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id} style={{ position: 'relative' }}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: active === id ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '999px',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="navPill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--color-tag)',
                      borderRadius: '999px',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: 'var(--color-tag)',
            border: 'none',
            borderRadius: '999px',
            padding: '0.4rem 0.6rem',
            cursor: 'pointer',
            color: 'var(--color-primary-dark)',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              background: 'rgba(250,247,242,0.97)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--color-border)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: active === id ? 'var(--color-primary-dark)' : 'var(--color-text)',
                      background: active === id ? 'var(--color-tag)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.6rem 1rem',
                      borderRadius: '999px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
