import { useState } from 'react'
import { motion } from 'motion/react'
import { Send, Mail, Linkedin } from 'lucide-react'
import { SiGithub, SiInstagram, SiX } from 'react-icons/si'
import AnimatedTitle from './AnimatedTitle'

const socials = [
  {
    label: 'GitHub',
    Icon: SiGithub,
    href: 'https://github.com/syxriffkml',
    color: '#2D1F4E',
  },
  {
    label: 'LinkedIn',
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/syxriffkml/',
    color: '#0A66C2',
  },
  {
    label: 'Instagram',
    Icon: SiInstagram,
    href: 'https://instagram.com/syxriffkml',
    color: '#E1306C',
  },
  {
    label: 'Twitter / X',
    Icon: SiX,
    href: 'https://twitter.com/syxriffkml',
    color: '#2D1F4E',
  },
]

const inputStyle = {
  width: '100%',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  background: '#fff',
  border: '2px solid var(--color-border)',
  borderRadius: '1rem',
  padding: '0.75rem 1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: Replace YOUR_FORM_ID with your Formspree form ID
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{ marginBottom: '2.5rem' }}
        >
          <span className="section-label">Contact</span>
          <AnimatedTitle className="section-title">Let's Work Together ✨</AnimatedTitle>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            maxWidth: '480px',
          }}>
            Got a project in mind? I&apos;d love to hear about it. Drop me a message or find me on socials!
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* Left: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              background: '#fff',
              border: '2px solid var(--color-border)',
              borderRadius: '1.75rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.4rem',
              }}>Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Hiroshi Tanaka"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.4rem',
              }}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.4rem',
              }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              whileHover={{ scale: status === 'idle' ? 1.04 : 1, y: status === 'idle' ? -2 : 0 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: status === 'sent' ? 'var(--color-primary)' : 'var(--color-accent)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.85rem',
                borderRadius: '999px',
                border: 'none',
                cursor: status === 'idle' ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 20px rgba(255,127,110,0.3)',
                transition: 'background 0.3s',
              }}
            >
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && '✓ Message Sent!'}
              {status === 'error' && 'Try Again ↩'}
              {status === 'idle' && (<><Send size={16} /> Send Message</>)}
            </motion.button>
          </motion.form>

          {/* Right: Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{
              background: '#fff',
              border: '2px solid var(--color-border)',
              borderRadius: '1.75rem',
              padding: '1.5rem',
              marginBottom: '0.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-text)',
                marginBottom: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <Mail size={16} color="var(--color-accent)" /> Email me directly
              </div>
              <a
                href="mailto:syxriffkml@gmail.com"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: 'var(--color-primary-dark)',
                  textDecoration: 'none',
                }}
              >
                syxriffkml@gmail.com
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map(({ label, Icon, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: '#fff',
                    border: '2px solid var(--color-border)',
                    borderRadius: '1.25rem',
                    padding: '0.9rem 1.25rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '999px',
                    background: 'var(--color-tag)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--color-text)',
                  }}>{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
