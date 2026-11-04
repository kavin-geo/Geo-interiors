import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

function ServiceCategoryCard({ category, onCycleComplete, shouldReduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const cardRef = useRef(null)
  const swipeStartX = useRef(null)
  const activeImage = category.images[activeIndex]
  const hasMultipleImages = category.images.length > 1

  useEffect(() => {
    if (!cardRef.current) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.2 })
    observer.observe(cardRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasMultipleImages || !isInView || isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        if (activeIndex === category.images.length - 1) {
          onCycleComplete?.()
          setActiveIndex(0)
        } else {
          setActiveIndex(activeIndex + 1)
        }
      }
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, category.images.length, hasMultipleImages, isInView, isPaused, onCycleComplete])

  const selectImage = (direction) => {
    setActiveIndex((index) => (
      (index + direction + category.images.length) % category.images.length
    ))
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse') return
    swipeStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event) => {
    if (swipeStartX.current === null) return

    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(distance) > 40) {
      selectImage(distance < 0 ? 1 : -1)
    }
  }

  return (
    <article
      aria-label={category.name}
      className="service-card service-category-card"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={cardRef}
      role="group"
    >
      <div
        className="service-photo-wrap service-category-photo-wrap"
        onPointerCancel={() => { swipeStartX.current = null }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            alt={activeImage.alt}
            animate={{ opacity: 1 }}
            className="service-photo"
            draggable={false}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={activeImage.src}
            loading="lazy"
            src={activeImage.src}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          />
        </AnimatePresence>
        {hasMultipleImages && (
          <div className="service-image-controls" aria-label={`${category.name} images`}>
            <button
              aria-label={`Previous ${category.name} image`}
              className="service-image-arrow"
              onClick={() => selectImage(-1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <span className="service-image-count" aria-live="off">
              {String(activeIndex + 1).padStart(2, '0')} / {String(category.images.length).padStart(2, '0')}
            </span>
            <button
              aria-label={`Next ${category.name} image`}
              className="service-image-arrow"
              onClick={() => selectImage(1)}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
      <div className="service-category-copy">
        <h4>{category.name}</h4>
      </div>
    </article>
  )
}

export default function ServiceCategoryGallery({ categories, shouldReduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(() => {
    const kitchenIndex = categories.findIndex(({ name }) => name === 'Modular kitchens')
    return kitchenIndex < 0 ? 0 : kitchenIndex
  })
  const id = useId()
  const activeCategory = categories[activeIndex]

  useEffect(() => {
    const activeTab = document.getElementById(`${id}-tab-${activeIndex}`)
    const tabList = activeTab?.parentElement
    if (!activeTab || !tabList) return

    const tabRect = activeTab.getBoundingClientRect()
    const listRect = tabList.getBoundingClientRect()
    const tabLeft = tabRect.left - listRect.left + tabList.scrollLeft
    const targetLeft = tabLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2
    const maxScrollLeft = tabList.scrollWidth - tabList.clientWidth

    tabList.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScrollLeft)),
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }, [activeIndex, id, shouldReduceMotion])

  const handleTabKeyDown = (event, index) => {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1
    else return

    event.preventDefault()
    setActiveIndex(nextIndex)
    event.currentTarget.parentElement.children[nextIndex].focus()
  }

  return (
    <div className="service-category-gallery">
      <div className="service-category-grid" aria-label="Interior categories">
        {categories.map((category) => (
          <ServiceCategoryCard
            category={category}
            key={category.name}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
      <div className="service-category-mobile">
        <div
          aria-label="Choose an interior category"
          className="service-category-tabs"
          role="tablist"
        >
          {categories.map((category, index) => (
            <button
              aria-controls={`${id}-panel`}
              aria-selected={index === activeIndex}
              className="service-category-tab"
              id={`${id}-tab-${index}`}
              key={category.name}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
        <div
          aria-labelledby={`${id}-tab-${activeIndex}`}
          className="service-category-panel"
          id={`${id}-panel`}
          role="tabpanel"
          tabIndex={0}
        >
          <ServiceCategoryCard
            category={activeCategory}
            key={activeCategory.name}
            onCycleComplete={() => {
              setActiveIndex((index) => (index + 1) % categories.length)
            }}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
        <p className="service-category-swipe-hint">
          Swipe the image or use the arrows to browse
        </p>
      </div>
    </div>
  )
}
