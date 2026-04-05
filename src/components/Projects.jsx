import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { Github, ExternalLink, ImageIcon } from 'lucide-react'
import AnimatedTitle from './AnimatedTitle'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(183,153,245,0.18)' }}
      style={{
        background: '#fff',
        border: '2px solid var(--color-border)',
        borderRadius: '1.75rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.25s',
      }}
    >
      {/* Image area */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${project.accent}22, var(--color-surface-2))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: project.accent,
            opacity: 0.5,
          }}>
            <ImageIcon size={36} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}>image coming soon</span>
          </div>
        )}
        {/* Accent corner stripe */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '6px',
          height: '100%',
          background: project.accent,
          borderRadius: '0 0 0 4px',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.2rem',
          color: 'var(--color-text)',
          lineHeight: 1.2,
        }}>
          {project.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          flex: 1,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              background: 'var(--color-tag)',
              color: 'var(--color-primary-dark)',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              border: '2px solid var(--color-border)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            <Github size={14} /> Code
          </motion.a>
          <motion.a
            href={project.live}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#fff',
              textDecoration: 'none',
              background: 'var(--color-accent)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
            }}
          >
            <ExternalLink size={14} /> Live
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--color-surface)' }}>
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
              style={{
                position: 'absolute',
                top: '-50px',
                left: '10px',
                width: '58px',
                height: '58px',
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
            <span className="section-label pastel-rgb-label" style={{ position: 'relative', zIndex: 1 }}>Projects</span>
          </div>
          <AnimatedTitle className="section-title">Things I&apos;ve Built</AnimatedTitle>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
          className="projects-grid"
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
