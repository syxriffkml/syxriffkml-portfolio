import { motion } from 'motion/react'
import { workExperience } from '../data/experience'
import { Briefcase } from 'lucide-react'
import AnimatedTitle from './AnimatedTitle'

export default function Experience() {
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
          <span className="section-label">Experience</span>
          <AnimatedTitle className="section-title">Where I&apos;ve Worked</AnimatedTitle>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* Vertical line — centered on the 14px dot (7px from left) */}
          <div style={{
            position: 'absolute',
            left: '7px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--color-border)',
            borderRadius: '999px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {workExperience.map((job, i) => (
              <div key={job.id} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.1rem',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: '3px solid #fff',
                    boxShadow: '0 0 0 2px var(--color-primary)',
                  }}
                />

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 + 0.05, ease: 'easeOut' }}
                  style={{
                    background: '#fff',
                    border: '2px solid var(--color-border)',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginBottom: '0.2rem',
                      }}>
                        <Briefcase size={15} color="var(--color-primary-dark)" />
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          color: 'var(--color-text)',
                        }}>{job.role}</span>
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--color-primary-dark)',
                      }}>{job.company}</div>
                    </div>
                    <span style={{
                      background: 'var(--color-tag)',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                    }}>{job.period}</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
                    {job.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'var(--color-surface-2)',
                        color: 'var(--color-primary-dark)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.6rem',
                        borderRadius: '999px',
                      }}>{tag}</span>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {job.bullets.map((b, bi) => (
                      <li key={bi} style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                      }}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
