import { motion } from 'motion/react'
import { education } from '../data/experience'
import { GraduationCap } from 'lucide-react'

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="section-label">About Me</span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'start',
            marginTop: '1.5rem',
          }}
            className="about-grid"
          >
            {/* Left: Pull quote */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}>
                "I build things that feel good to use."
              </h2>

              {/* Decorative line */}
              <div style={{
                width: '3rem',
                height: '4px',
                borderRadius: '999px',
                background: 'var(--color-accent)',
                marginBottom: '1.5rem',
              }} />

              {/* Fun stats row */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { num: '4+', label: 'internships' },
                  { num: '4', label: 'projects' },
                  { num: '13+', label: 'tech skills' },
                ].map(({ num, label }) => (
                  <div key={label} style={{
                    background: '#fff',
                    border: '2px solid var(--color-border)',
                    borderRadius: '1.25rem',
                    padding: '0.75rem 1.25rem',
                    textAlign: 'center',
                    minWidth: '80px',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.6rem',
                      color: 'var(--color-primary-dark)',
                      lineHeight: 1,
                    }}>{num}</div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 600,
                      marginTop: '0.2rem',
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bio + Education */}
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                color: 'var(--color-text)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                Hi! I&apos;m Syariff Kamil, a front-end developer from Malaysia with a passion for crafting
                interfaces that are both beautiful and intuitive. I care deeply about the details —
                the micro-animations, the thoughtful spacing, the way a button feels when you click it.
                I&apos;m selective about the work I take on, choosing projects that genuinely excite me
                and push my skills forward.
              </p>

              {/* Education */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <GraduationCap size={18} color="var(--color-primary-dark)" /> Education
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {education.map((edu, i) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      style={{
                        background: '#fff',
                        border: '2px solid var(--color-border)',
                        borderRadius: '1.25rem',
                        padding: '0.9rem 1.1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem',
                      }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--color-text)',
                      }}>{edu.degree}</div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600,
                      }}>{edu.institution} · {edu.period}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
