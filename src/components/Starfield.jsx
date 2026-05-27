import { useEffect, useRef } from 'react'

export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const count = 80
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      if (Math.random() > 0.7) star.classList.add('bright')
      else if (Math.random() > 0.5) star.classList.add('small')
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.setProperty('--dur', `${2 + Math.random() * 4}s`)
      star.style.setProperty('--min-op', `${0.1 + Math.random() * 0.2}`)
      star.style.setProperty('--max-op', `${0.4 + Math.random() * 0.5}`)
      star.style.animationDelay = `${Math.random() * 4}s`
      el.appendChild(star)
    }
  }, [])

  return <div id="starfield" ref={ref} />
}
