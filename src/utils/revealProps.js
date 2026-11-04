export function revealProps(shouldReduceMotion, { delay = 0, image = false } = {}) {
  const restingState = { opacity: 1, y: 0, scale: 1 }

  return {
    initial: shouldReduceMotion
      ? { opacity: 0, y: 0, scale: 1 }
      : { opacity: 0, y: image ? 26 : 30, scale: image ? 0.96 : 1 },
    whileInView: restingState,
    viewport: { once: true, amount: 0.18 },
    transition: {
      duration: shouldReduceMotion ? 0.2 : image ? 0.8 : 0.72,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.2, 0.7, 0.2, 1],
    },
  }
}
