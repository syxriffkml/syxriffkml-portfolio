import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Home, User, Zap, FolderOpen, Briefcase, Mail, Download, Linkedin } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'

const commands = [
  { group: 'Navigate', label: 'Home', icon: Home, action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Navigate', label: 'About', icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Navigate', label: 'Skills', icon: Zap, action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Navigate', label: 'Projects', icon: FolderOpen, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Navigate', label: 'Experience', icon: Briefcase, action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Navigate', label: 'Contact', icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { group: 'Actions', label: 'Download CV', icon: Download, action: () => window.open('/resume.pdf', '_blank') },
  { group: 'Actions', label: 'Open GitHub', icon: SiGithub, action: () => window.open('https://github.com/syxriffkml', '_blank') },
  { group: 'Actions', label: 'Open LinkedIn', icon: Linkedin, action: () => window.open('https://www.linkedin.com/in/syxriffkml/', '_blank') },
  { group: 'Actions', label: 'Open Instagram', icon: SiInstagram, action: () => window.open('https://instagram.com/syxriffkml', '_blank') },
]

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const itemRefs = useRef([])

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault()
      if (e.key === 'ArrowDown') setSelected(s => {
        const next = Math.min(s + 1, filtered.length - 1)
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' })
        return next
      })
      if (e.key === 'ArrowUp') setSelected(s => {
        const next = Math.max(s - 1, 0)
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' })
        return next
      })
      if (e.key === 'Enter' && filtered[selected]) {
        filtered[selected].action()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, onClose])

  const groups = [...new Set(filtered.map(c => c.group))]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(45, 31, 78, 0.35)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
            }}
          />

          {/* Palette wrapper — cat sits on top */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Cat — absolutely positioned, overlapping top-left of palette */}
            <motion.img
              src="/cute_chibi_cat_1.png"
              alt="cute cat"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
              style={{
                position: 'absolute',
                top: '-131px',
                left: '60px',
                width: '180px',
                height: '180px',
                objectFit: 'contain',
                zIndex: 0,
                filter: 'drop-shadow(0 4px 12px rgba(183,153,245,0.3))',
              }}
            />

            {/* Palette box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{
                width: 'min(520px, 90vw)',
                background: '#fff',
                borderRadius: '1rem',
                border: '2px solid var(--color-border)',
                boxShadow: '0 24px 64px rgba(124,77,255,0.18)',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Search input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '2px solid var(--color-border)',
              }}>
                <span style={{ fontSize: '1.1rem' }}>🔍</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type a command..."
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={onClose}
                  style={{
                    background: 'var(--color-tag)',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.2rem 0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  ESC
                </button>
              </div>

              {/* Commands list */}
              <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '0.5rem' }}>
                {filtered.length === 0 && (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                  }}>
                    No commands found 🐱
                  </div>
                )}
                {groups.map(group => (
                  <div key={group}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      padding: '0.5rem 0.75rem 0.25rem',
                    }}>{group}</div>
                    {filtered.filter(c => c.group === group).map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd)
                      const Icon = cmd.icon
                      return (
                        <motion.button
                          key={cmd.label}
                          ref={el => { itemRefs.current[globalIndex] = el }}
                          onClick={() => { cmd.action(); onClose() }}
                          onMouseEnter={() => setSelected(globalIndex)}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.65rem 0.75rem',
                            borderRadius: '0.9rem',
                            border: 'none',
                            background: selected === globalIndex ? 'var(--color-tag)' : 'transparent',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background 0.15s',
                          }}
                        >
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '999px',
                            background: selected === globalIndex ? 'var(--color-primary)' : 'var(--color-surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'background 0.15s',
                          }}>
                            <Icon size={14} color={selected === globalIndex ? '#fff' : 'var(--color-primary-dark)'} />
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            color: 'var(--color-text)',
                          }}>{cmd.label}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div style={{
                borderTop: '2px solid var(--color-border)',
                padding: '0.6rem 1.25rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}>
                {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, label]) => (
                  <span key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                  }}>
                    <span style={{
                      background: 'var(--color-tag)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.3rem',
                      padding: '0.1rem 0.35rem',
                      fontWeight: 700,
                    }}>{key}</span>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
