import { useState, useEffect } from 'react'

export function useScrollSpy(ids, offset = 80) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 1
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ids, offset])

  return active
}
