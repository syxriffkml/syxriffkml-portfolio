import { motion } from 'motion/react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function AnimatedTitle({ children, style, className }) {
  const words = children.split(' ')

  return (
    <motion.h2
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0.3em', alignItems: 'baseline' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-150px' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.h2>
  )
}
