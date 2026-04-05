import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.75, x: 12 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } },
  exit: { opacity: 0, scale: 0.75, x: 12, transition: { duration: 0.15 } },
  hover: { opacity: 1, scale: 1.06, x: -4, transition: { type: 'spring', stiffness: 300, damping: 15 } },
}


export default function CatPaletteButton({ onClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bubbleStyle = {
    position: 'relative',
    background: 'var(--color-card)',
    border: '2px solid var(--color-border)',
    borderRadius: '1.25rem',
    padding: '0.45rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    boxShadow: '0 4px 16px rgba(183,153,245,0.22)',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  }

  const labelStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.82rem',
    color: 'var(--color-primary-dark)',
    letterSpacing: '0.03em',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover="hover"
      className="cat-palette-btn"
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {/* Ctrl K bubble */}
      <motion.div
        variants={{ hover: { scale: 1.06, y: -4 } }}
        onClick={onClick}
        style={{ ...bubbleStyle, marginBottom: '10px' }}
      >
        <span style={labelStyle}>⌨️ Ctrl + K</span>
        {/* tail — centered bottom, pointing down */}
        <span style={{
          position: 'absolute', bottom: '-9px', left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
          borderTop: '9px solid var(--color-border)',
        }} />
        <span style={{
          position: 'absolute', bottom: '-7px', left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
          borderTop: '8px solid #fff',
        }} />
      </motion.div>

      {/* Cat + Go Up bubble row */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>

        {/* Go Up bubble — slides in from right when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="go-up"
              variants={bubbleVariants}
              initial="hidden"
              animate={hovered ? 'hover' : 'visible'}
              exit="exit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                ...bubbleStyle,
                position: 'absolute',
                right: 'calc(100% + 3px)',
                bottom: '12px',
              }}
            >
              <ArrowUp size={14} color="var(--color-primary-dark)" strokeWidth={2.5} />
              <span style={labelStyle}>Go up!</span>
              {/* tail — right side, pointing toward cat */}
              <span style={{
                position: 'absolute', right: '-8px', top: '50%', marginTop: '-7px',
                width: 0, height: 0,
                borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
                borderLeft: '8px solid var(--color-border)',
              }} />
              <span style={{
                position: 'absolute', right: '-5px', top: '50%', marginTop: '-6px',
                width: 0, height: 0,
                borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
                borderLeft: '6px solid #fff',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cat */}
        <motion.img
          src="/cute_chibi_cat_3.png"
          alt="Command palette"
          className="pastel-rgb-cat"
          variants={{ hover: { y: -5, rotate: 6 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          onClick={onClick}
          style={{
            width: '72px',
            height: '72px',
            objectFit: 'contain',
            userSelect: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </motion.div>
  )
}
