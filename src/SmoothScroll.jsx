import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { cancelFrame, frame, useReducedMotion } from 'motion/react'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return undefined

    const update = ({ timestamp }) => {
      lenisRef.current?.lenis?.raf(timestamp)
    }

    frame.setup(update, true)
    return () => cancelFrame(update)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) return children

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, anchors: { offset: 16 } }}
    >
      {children}
    </ReactLenis>
  )
}
