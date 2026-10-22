import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { animate, drag } from 'motion'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import siteConfig from './siteConfig'
import './App.css'

const originalSite = 'https://geointeriors-rose.vercel.app'
const siteAsset = (filename) => `${import.meta.env.BASE_URL}images/geo/${filename}`
const phone = siteConfig.contact.phone
const phoneDigits = phone.replace(/\D/g, '')
const phoneDisplay =
  phone.startsWith('+91') && phoneDigits.length === 12
    ? `+91 ${phoneDigits.slice(2, 7)} ${phoneDigits.slice(7)}`
    : phone
const formatMobileNumber = (value) => {
  const trimmedValue = value.trim()
  const digits = trimmedValue.replace(/\D/g, '')

  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  if (trimmedValue.startsWith('+91') && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }

  return trimmedValue
}
// const contactEmail = siteConfig.contact.email
const whatsAppNumber = phoneDigits
const whatsAppMessage = encodeURIComponent(siteConfig.contact.whatsappMessage)

const revealProps = (shouldReduceMotion, { delay = 0, image = false } = {}) => {
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

function TypingText({ text, direction = 'left', shouldReduceMotion }) {
  const words = text.split(' ')
  const characterVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : direction === 'right' ? 12 : -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <>
      <motion.span
        className="typing-text"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: {
            transition: shouldReduceMotion
              ? {
                  delayChildren: 0,
                  staggerChildren: 0.035,
                  staggerDirection: direction === 'right' ? -1 : 1,
                }
              : {
                  delayChildren: direction === 'right' ? 0.52 : 0.12,
                  staggerChildren: 0.04,
                  staggerDirection: direction === 'right' ? -1 : 1,
                },
          },
        }}
      >
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            {wordIndex > 0 && ' '}
            <span className="typing-word">
              {Array.from(word, (character, characterIndex) => (
                <motion.span
                  className="typing-character"
                  key={`${character}-${characterIndex}`}
                  variants={characterVariants}
                >
                  {character}
                </motion.span>
              ))}
            </span>
          </Fragment>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </>
  )
}

const homeScopes = [
  { value: '1bhk', label: '1 BHK' },
  { value: '2bhk', label: '2 BHK' },
  { value: '3bhk', label: '3 BHK / house' },
  { value: '4bhk', label: '4 BHK / villa' },
  { value: 'kitchen_only', label: 'Kitchen only' },
]

const materialTiers = [
  { value: 'budget', label: 'Budget · plywood / PVC' },
  { value: 'standard', label: 'Standard · BWP marine ply' },
  { value: 'premium', label: 'Premium · acrylic finish' },
]

const estimatePrices = {
  '1bhk': { budget: 150000, standard: 220000, premium: 320000 },
  '2bhk': { budget: 250000, standard: 360000, premium: 520000 },
  '3bhk': { budget: 380000, standard: 520000, premium: 750000 },
  '4bhk': { budget: 480000, standard: 650000, premium: 950000 },
  kitchen_only: { budget: 85000, standard: 135000, premium: 195000 },
}

const estimatePackages = {
  budget: {
    title: 'Budget-friendly package',
    description: 'A practical starting point for rented homes or budget-conscious projects.',
    includes: [
      'Modular kitchen in commercial plywood and suede laminate',
      'Two-door openable wardrobe with loft storage',
      'Standard TV wall console unit',
      'Standard stainless-steel handles and soft-close hinges',
    ],
  },
  standard: {
    title: 'Standard-quality package',
    description: 'BWP marine plywood and modern modular fittings.',
    includes: [
      'Modular kitchen with soft-close tandem baskets and granite top',
      'Full-height three-door sliding plywood wardrobes',
      'Living-room floating TV unit with cove light',
      'Wooden pooja mandir unit with CNC jaali work',
      'Gypsum false ceiling with LED cove lights for living room',
    ],
  },
  premium: {
    title: 'Premium-finish package',
    description: 'Acrylic finishes, hydraulic storage and full interior fittings.',
    includes: [
      'High-gloss acrylic or PU-shutter modular kitchen',
      'Full-bedroom sliding wardrobes with inner mirrors and lockers',
      'Master-bedroom hydraulic lift storage cot with cushioned headboard',
      'Full-wall wood-panelling TV console with glass shelves',
      'Custom pooja-room shrine with brass bells and LED backlight',
      'Complete-home gypsum false ceiling and spotlights',
    ],
  },
}

const enquiryServices = [
  'Full home interiors',
  'Modular kitchen',
  'Plywood works',
  'Wardrobes',
  'Pooja room or unit',
  'TV unit',
  'False ceiling',
  'Wooden cot or bed',
  'PVC cupboards',
  'uPVC windows',
  'Steel doors',
  'Aluminium partitions',
  'Bathroom doors',
  'Floor panelling',
  'Window screens',
  'Glass partitions',
  'SS railings or handrails',
  'Other / maintenance',
]

const serviceGroups = [
  {
    title: 'Made by our in-house team',
    services: [
      {
        name: 'Plywood works',
        detail: 'BWP marine plywood cabinets, wardrobes and custom carpentry.',
        image: siteAsset('services_plywood_cover.jpeg'),
      },
      {
        name: 'Modular kitchens',
        detail: 'Indian kitchens with tandem baskets, granite counters and chimney.',
        image: siteAsset('service_modular_kitchen.jpeg'),
      },
      {
        name: 'TV units',
        detail: 'Floating TV panels with concealed wiring and warm LED lighting.',
        image: siteAsset('service_tvunit_cover.jpeg'),
      },
      {
        name: 'Pooja rooms & units',
        detail: 'Wooden mandirs with CNC jaali, brass accents and storage.',
        image: siteAsset('service_pooja.jpg'),
      },
      {
        name: 'Wardrobes',
        detail: 'Sliding or openable wardrobes with full-height loft storage.',
        image: siteAsset('service_wardrobe.jpg'),
      },
      {
        name: 'False ceilings',
        detail: 'Gypsum and POP ceilings with LED cove lighting.',
        image: siteAsset('service_ceiling.jpg'),
      },
      {
        name: 'Wooden cots & beds',
        detail: 'Sturdy bed frames with hydraulic or pull-out storage.',
        image: siteAsset('service_cots.jpg'),
      },
    ],
  },
  {
    title: 'Fittings, fabrication & finishing',
    services: [
      {
        name: 'PVC cupboards',
        detail: 'Waterproof PVC board cupboards for kitchens, lofts and utilities.',
        image: siteAsset('service_pvc_cupboards.jpeg'),
      },
      {
        name: 'uPVC windows',
        detail: 'Sliding and casement windows with glass and mosquito mesh.',
        image: siteAsset('service_pvc_windows.jpeg'),
      },
      {
        name: 'Steel doors',
        detail: 'Heavy-duty main entrance doors with multi-point locks.',
        image: siteAsset('service_steel_doors.jpeg'),
      },
      {
        name: 'Aluminium partitions',
        detail: 'Anodized aluminium dividers with glass or board panels.',
        image: siteAsset('service_aluminium.jpeg'),
      },
      {
        name: 'Bathroom doors',
        detail: 'Water-resistant PVC and WPC doors for wet areas.',
        image: siteAsset('service_bathroom.jpg'),
      },
      {
        name: 'Floor panelling',
        detail: 'Scratch-resistant wooden laminate and vinyl flooring.',
        image: siteAsset('service_floor.jpeg'),
      },
      {
        name: 'Window screens',
        detail: 'Custom mosquito mesh frames and pleated insect screens.',
        image: siteAsset('service_screens.jpeg'),
      },
      {
        name: 'Glass partitions',
        detail: 'Toughened glass dividers for bathrooms and modern rooms.',
        image: siteAsset('service_glass.jpeg'),
      },
      {
        name: 'SS railings',
        detail: 'Stainless steel 304 staircase balustrades and balcony rails.',
        image: siteAsset('service_ss.jpeg'),
      },
      {
        name: 'SS handrails',
        detail: 'Custom-bent wall-mounted and post-mounted safety handrails.',
        image: siteAsset('service_ss_1.jpeg'),
      },
    ],
  },
]

const tours = [
  {
    title: 'Master bedroom',
    href: `${originalSite}/service/bedroom`,
    number: '01',
    image: siteAsset('service_wardrobe.jpg'),
    panorama: siteAsset('panorama-bedroom.jpg'),
  },
  {
    title: 'Modular kitchen',
    href: `${originalSite}/service/kitchen`,
    number: '02',
    image: siteAsset('service_modular_kitchen.jpeg'),
    panorama: siteAsset('panorama-kitchen.jpg'),
  },
  {
    title: 'Living room',
    href: `${originalSite}/service/living`,
    number: '03',
    image: siteAsset('service_tvunit_cover.jpeg'),
    panorama: siteAsset('panorama-living.jpg'),
  },
]

const heroSlides = [
  {
    image: siteAsset('service_modular_kitchen.jpeg'),
    name: 'Modular kitchen',
    alt: 'Geo Interiors modular kitchen with dark wood cabinetry and a black countertop',
  },
  {
    image: siteAsset('service_wardrobe.jpg'),
    name: 'Master bedroom',
    alt: 'Warm master bedroom interior with a built-in wooden wardrobe',
  },
  {
    image: siteAsset('service_tvunit_cover.jpeg'),
    name: 'Living room',
    alt: 'Contemporary living room with a custom TV unit and wall panelling',
  },
  {
    image: siteAsset('service_cots.jpg'),
    name: 'Bedroom with a storage bed',
    alt: 'Warm bedroom with a wooden storage bed, bedside tables and soft lighting',
  },
  {
    image: siteAsset('service_pooja.jpg'),
    name: 'Custom pooja room',
    alt: 'Custom wooden pooja room with carved details and warm lighting',
  },
]

const process = [
  {
    title: 'Free site visit',
    detail:
      'A technician visits, takes accurate room measurements and understands your storage needs.',
  },
  {
    title: '3D plan & price',
    detail:
      'Review your room layout and a transparent, line-by-line price estimate.',
  },
  {
    title: 'Choose materials',
    detail:
      'Select laminate colours, handles and hardware, including Hettich, Ebco and Century Ply.',
  },
  {
    title: 'Team installation',
    detail:
      'Our carpenter and technician team assemble and fit your kitchen and wardrobes.',
  },
  {
    title: 'Quality check & handover',
    detail:
      'A 15-point quality check, a clean-up and a ready-to-use home handover.',
  },
]

const testimonials = [
  {
    quote:
      'Add an approved client quote about the planning process and finished details.',
    name: 'Client name',
    location: 'Project location',
  },
  {
    quote:
      'Add an approved client quote about the design, material choices and finished space.',
    name: 'Client name',
    location: 'Project location',
  },
  {
    quote:
      'Add an approved client quote about communication, timing or installation.',
    name: 'Client name',
    location: 'Project location',
  },
]

function ArrowIcon({ diagonal = false }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function HeroImageCarousel({ slides, shouldReduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((index) => (index + 1) % slides.length)
      }
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (index === activeIndex) return
      const image = new Image()
      image.src = slide.image
    })
  }, [activeIndex, slides])

  return (
    <div
      aria-label="Geo Interiors room photography"
      aria-roledescription="carousel"
      className="hero-image-carousel"
      role="group"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          alt={activeSlide.alt}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-image-slide"
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
          fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
          key={activeSlide.image}
          src={activeSlide.image}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.65, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerId = useId()
  const questionId = useId()
  const shouldReduceMotion = useReducedMotion()
  const transition = {
    duration: shouldReduceMotion ? 0.01 : 0.32,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <div className="faq-item">
      <button
        aria-controls={answerId}
        aria-expanded={isOpen}
        className="faq-question"
        id={questionId}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {question}
      </button>
      <motion.div
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        aria-hidden={!isOpen}
        aria-labelledby={questionId}
        className="faq-answer"
        id={answerId}
        inert={!isOpen}
        initial={false}
        role="region"
        transition={transition}
      >
        <p>{answer}</p>
      </motion.div>
    </div>
  )
}

function PanoramaViewer({ tour, activeIndex, onSelect }) {
  const viewerRef = useRef(null)
  const canvasRef = useRef(null)
  const viewRef = useRef({ longitude: 0, latitude: 0 })
  const autoRotateRef = useRef(true)
  const [viewerError, setViewerError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isPanoramaLoaded, setIsPanoramaLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' },
    )
    observer.observe(viewerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = canvasRef.current

    if (!container || !isVisible) return undefined

    setIsPanoramaLoaded(false)
    autoRotateRef.current = true
    let renderer
    let camera
    let scene
    const view = viewRef.current
    let sphere
    let animationFrame
    let disposed = false
    let resizeObserver
    let texture
    let dragging = false
    const activePointers = new Map()
    let pointerStartX = 0
    let pointerStartY = 0
    let startLongitude = 0
    let startLatitude = 0
    let pinchStartDistance = 0
    let pinchStartFov = 75

    const startViewer = async () => {
      let THREE
      try {
        THREE = await import('three')
      } catch {
        if (!disposed) {
          setViewerError('The 360° viewer could not be loaded. Please refresh the page and try again.')
        }
        return
      }

      if (disposed) return

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          powerPreference: 'high-performance',
        })
      } catch {
        const error = document.createElement('p')
        error.className = 'panorama-error'
        error.setAttribute('role', 'alert')
        error.textContent = 'This browser could not start the 360° viewer. Try a browser with WebGL enabled.'
        container.appendChild(error)
        return
      }

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1100)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.className = 'panorama-canvas'
      renderer.domElement.setAttribute(
        'aria-label',
        `${tour.title} interactive 360 degree panorama`,
      )
      container.appendChild(renderer.domElement)

      const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      resize()

      texture = new THREE.TextureLoader().load(
        tour.panorama,
        (loadedTexture) => {
          if (disposed) {
            loadedTexture.dispose()
            return
          }
          loadedTexture.colorSpace = THREE.SRGBColorSpace
          loadedTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter
          loadedTexture.magFilter = THREE.LinearFilter
          loadedTexture.needsUpdate = true
          const geometry = new THREE.SphereGeometry(500, 96, 64)
          geometry.scale(-1, 1, 1)
          const material = new THREE.MeshBasicMaterial({ map: loadedTexture })
          sphere = new THREE.Mesh(geometry, material)
          scene.add(sphere)
          setViewerError('')
          setIsPanoramaLoaded(true)
        },
        undefined,
        () => {
          if (!disposed) {
            setViewerError('The room panorama could not be loaded. Please try selecting the room again.')
          }
        },
      )

      const onPointerDown = (event) => {
        activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
        if (activePointers.size === 2) {
          const [first, second] = [...activePointers.values()]
          pinchStartDistance = Math.hypot(first.x - second.x, first.y - second.y)
          pinchStartFov = camera.fov
          dragging = false
        } else {
          dragging = true
          pointerStartX = event.clientX
          pointerStartY = event.clientY
          startLongitude = view.longitude
          startLatitude = view.latitude
        }
        renderer.domElement.setPointerCapture(event.pointerId)
        autoRotateRef.current = false
      }

      const onPointerMove = (event) => {
        if (activePointers.has(event.pointerId)) {
          activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
        }
        if (activePointers.size === 2) {
          const [first, second] = [...activePointers.values()]
          const distance = Math.hypot(first.x - second.x, first.y - second.y)
          camera.fov = Math.min(90, Math.max(40, pinchStartFov + (pinchStartDistance - distance) * 0.08))
          camera.updateProjectionMatrix()
          return
        }
        if (!dragging) return
        view.longitude = startLongitude + (pointerStartX - event.clientX) * 0.12
        view.latitude = Math.min(
          80,
          Math.max(-80, startLatitude + (event.clientY - pointerStartY) * 0.12),
        )
      }

      const onPointerUp = (event) => {
        activePointers.delete(event.pointerId)
        dragging = activePointers.size === 1
        if (dragging) {
          const [[, pointer]] = activePointers
          pointerStartX = pointer.x
          pointerStartY = pointer.y
          startLongitude = view.longitude
          startLatitude = view.latitude
        }
      }

      const onWheel = (event) => {
        event.preventDefault()
        camera.fov = Math.min(90, Math.max(40, camera.fov + Math.sign(event.deltaY) * 3))
        camera.updateProjectionMatrix()
      }

      renderer.domElement.addEventListener('pointerdown', onPointerDown)
      renderer.domElement.addEventListener('pointermove', onPointerMove)
      renderer.domElement.addEventListener('pointerup', onPointerUp)
      renderer.domElement.addEventListener('pointercancel', onPointerUp)
      renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate)
        if (autoRotateRef.current && !dragging) view.longitude += 0.025
        camera.rotation.order = 'YXZ'
        camera.rotation.y = view.longitude * Math.PI / 180
        camera.rotation.x = view.latitude * Math.PI / 180
        renderer.render(scene, camera)
      }

      animate()
    }

    void startViewer()

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      resizeObserver?.disconnect()
      if (sphere) {
        sphere.geometry.dispose()
        sphere.material.map?.dispose()
        sphere.material.dispose()
      } else if (texture) {
        texture.dispose()
      }
      if (renderer) {
        renderer.dispose()
        renderer.domElement.remove()
      }
    }
  }, [isVisible, tour.panorama, tour.title])

  return (
    <div className="panorama-viewer" ref={viewerRef}>
      <div className="panorama-viewer-heading">
        <div>
          <h3>{tour.title}</h3>
          <p>{tour.detail}</p>
        </div>
        <p>Drag to explore · Scroll or pinch to zoom</p>
      </div>
      <div className={`panorama-stage${isPanoramaLoaded ? ' is-loaded' : ''}`}>
        <img className="panorama-loading-image" src={tour.image} alt="" />
        {!isPanoramaLoaded && !viewerError && (
          <span className="panorama-loading-label" role="status">Loading room panorama…</span>
        )}
        <div className="panorama-canvas-mount" ref={canvasRef} />
        {viewerError && <p className="panorama-error" role="alert">{viewerError}</p>}
      </div>
      <div className="panorama-room-picker" role="group" aria-label="Choose a room for the 360° tour">
        {tours.map((room, index) => (
          <button
            aria-pressed={index === activeIndex}
            className={`panorama-room-option${index === activeIndex ? ' is-selected' : ''}`}
            key={room.title}
            onClick={() => onSelect(index)}
            type="button"
          >
            <img alt="" loading="lazy" src={room.image} />
            <span>{room.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ServiceCardStack({ group }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const cardRef = useRef(null)
  const service = group.services[activeIndex]

  useEffect(() => {
    const isMobileCarousel = window.matchMedia('(max-width: 680px)').matches
    if (isTransitioning || !isMobileCarousel) return undefined

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((index) => (index + 1) % group.services.length)
      }
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [group.services.length, isTransitioning])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    let disposed = false
    const stopDrag = drag(card, {
      axis: 'x',
      momentum: false,
      onStart: () => setIsDragging(true),
      onEnd: (_, info) => {
        setIsDragging(false)
        const shouldChangeService = Math.abs(info.offset.x) > 65 || Math.abs(info.velocity.x) > 500
        if (!shouldChangeService) {
          animate(card, { x: 0, rotate: 0 }, { type: 'spring', stiffness: 420, damping: 30 })
          return
        }

        const direction = info.offset.x < 0 ? 1 : -1
        const nextIndex = (activeIndex + direction + group.services.length) % group.services.length
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          animate(card, { x: 0, rotate: 0 }, { duration: 0 })
          setActiveIndex(nextIndex)
          return
        }

        const exitMotion = animate(
          card,
          { x: direction > 0 ? -360 : 360, rotate: direction > 0 ? -7 : 7, opacity: 0 },
          { type: 'spring', stiffness: 300, damping: 28 },
        )
        setIsTransitioning(true)
        void exitMotion.finished.then(() => {
          if (disposed) return
          animate(card, { x: 0, rotate: 0, opacity: 1 }, { duration: 0 })
          setActiveIndex(nextIndex)
          setIsTransitioning(false)
        })
      },
    })

    return () => {
      disposed = true
      stopDrag()
    }
  }, [activeIndex, group.services])

  const selectService = (index) => {
    setActiveIndex((index + group.services.length) % group.services.length)
  }

  const selectRelativeService = (offset) => {
    selectService(activeIndex + offset)
  }

  return (
    <div className={`service-stack-selector${isTransitioning ? ' is-transitioning' : ''}`}>
      <div className="service-stack max-[681px]:grid" aria-label={`Swipe to browse ${group.title} services`}>
        {Array.from({ length: Math.min(3, group.services.length) }, (_, depth) => {
          const itemIndex = (activeIndex + depth) % group.services.length
          const item = group.services[itemIndex]

          return (
            <div
              className={`service-stack-position service-stack-position-${depth}`}
              key={item.name}
              aria-hidden={depth > 0}
            >
              <article
                className={`service-card${depth === 0 && isDragging ? ' is-dragging' : ''}`}
                ref={depth === 0 ? cardRef : null}
                role="group"
                tabIndex={depth === 0 ? 0 : undefined}
                aria-label={`${item.name}: ${item.detail}`}
              >
                <div className="service-photo-wrap">
                  <img className="service-photo" src={item.image} alt="" loading="lazy" draggable={false} />
                  <div className="service-photo-overlay">
                    <h4>{item.name}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
      <div className="service-card-grid max-[681px]:hidden">
        {group.services.map((item) => (
          <article
            className="service-card"
            key={item.name}
            tabIndex={0}
            role="group"
            aria-label={`${item.name}: ${item.detail}`}
          >
            <div className="service-photo-wrap">
              <img className="service-photo" src={item.image} alt="" loading="lazy" />
              <div className="service-photo-overlay">
                <h4>{item.name}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="service-stack-hint max-[681px]:flex">
        <span aria-hidden="true">←</span>
        Drag or swipe the card to explore
        <span aria-hidden="true">→</span>
      </p>
      <div className={`service-stack-controls max-[681px]:flex${isTransitioning ? ' is-transitioning' : ''}`}>
        <button
          className="service-stack-arrow"
          onClick={() => selectRelativeService(-1)}
          type="button"
          disabled={isTransitioning}
          aria-label={`Previous ${group.title} service`}
        >←</button>
        <div className="service-stack-pagination" aria-label={`Choose a ${group.title} service`}>
          {group.services.map((item, index) => (
            <button
              className={index === activeIndex ? 'is-selected' : ''}
              key={item.name}
              onClick={() => selectService(index)}
              type="button"
              disabled={isTransitioning}
              aria-label={`Show ${item.name}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
        <span className="service-stack-count" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, '0')} / {String(group.services.length).padStart(2, '0')}
        </span>
        <button
          className="service-stack-arrow"
          onClick={() => selectRelativeService(1)}
          type="button"
          disabled={isTransitioning}
          aria-label={`Next ${group.title} service`}
        >→</button>
      </div>
      <p className="sr-only" aria-live="polite">
        {service.name}, service {activeIndex + 1} of {group.services.length}.
      </p>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTourIndex, setActiveTourIndex] = useState(0)
  const [homeScope, setHomeScope] = useState('2bhk')
  const [materialTier, setMaterialTier] = useState('standard')
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const activeTour = tours[activeTourIndex]
  const selectedScope = homeScopes.find((scope) => scope.value === homeScope)
  const selectedTier = materialTiers.find((tier) => tier.value === materialTier)
  const selectedPackage = estimatePackages[materialTier]
  const estimatePrice = estimatePrices[homeScope][materialTier]
  const formattedEstimateAmount = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(estimatePrice)
  const formattedEstimate = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(estimatePrice)

  useEffect(() => {
    const contactSection = document.querySelector('.contact-section')
    if (!contactSection || !('IntersectionObserver' in window)) return undefined

    const contactObserver = new IntersectionObserver(([entry]) => {
      document.documentElement.classList.toggle('contact-in-view', entry.isIntersecting)
    })
    contactObserver.observe(contactSection)

    return () => {
      contactObserver.disconnect()
      document.documentElement.classList.remove('contact-in-view')
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name').toString().trim()
    const mobile = formData.get('mobile').toString().trim()
    const email = formData.get('email').toString().trim()
    const service = formData.get('service').toString()
    const location = formData.get('location').toString().trim()
    const project = formData.get('project').toString().trim()
    const message = [
      'Hello Geo Interiors! I would like to request a free consultation.',
      `Name: ${name}`,
      `Mobile: ${formatMobileNumber(mobile)}`,
      email ? `Email: ${email}` : '',
      `Service: ${service}`,
      location ? `Project location: ${location}` : '',
      `Project details: ${project}`,
    ].filter(Boolean).join('\n')
    const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <motion.div
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      />
      <header className="site-header max-[901px]:relative max-[901px]:z-[5] max-[901px]:h-[76px] max-[901px]:px-[5%] max-[681px]:h-[70px] max-[681px]:px-[22px]">
        <a className="wordmark" href="#home" aria-label="Geo Interiors home">
          <span className="wordmark-symbol" aria-hidden="true">
            g<span>.</span>
          </span>
          <span className="wordmark-name">
            GEO
            <small>INTERIORS</small>
          </span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle max-[901px]:ml-auto max-[901px]:mr-3 max-[901px]:block"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav
          className={`main-nav max-[901px]:absolute max-[901px]:left-0 max-[901px]:right-0 max-[901px]:top-full max-[901px]:z-10 max-[901px]:m-0 max-[901px]:flex-col max-[901px]:gap-0 max-[901px]:border-t max-[901px]:border-[var(--line)] max-[901px]:bg-[var(--paper)] max-[901px]:px-[22px] max-[901px]:pt-2 max-[901px]:pb-[15px] max-[901px]:shadow-[0_12px_20px_rgb(39_44_37_/_8%)] ${menuOpen ? 'max-[901px]:!flex' : 'max-[901px]:hidden'}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#tours" onClick={closeMenu}>360° tours</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#estimate" onClick={closeMenu}>Estimate</a>
          <a href="#process" onClick={closeMenu}>Our process</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href={`tel:${phone}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.25 1.02l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </a>
      </header>

      <section className="hero-section max-[901px]:grid-cols-[minmax(0,0.87fr)_minmax(0,1.13fr)] max-[681px]:flex max-[681px]:flex-col" id="home">
        <motion.div className="hero-copy" {...revealProps(shouldReduceMotion)}>
          <p className="eyebrow"><span /> DIRECT FACTORY · SKILLED CARPENTRY</p>
          <h1 aria-label="Home interiors, built by hand.">
            <TypingText text="Home interiors," direction="left" shouldReduceMotion={shouldReduceMotion} />
            <br />
            <span>
              <TypingText text="built by hand." direction="right" shouldReduceMotion={shouldReduceMotion} />
            </span>
          </h1>
          <div className="hero-actions">
            <a href="#services" className="button button-dark">
              our services <ArrowIcon />
            </a>
            <a href={`https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`} className="text-link">
              free estimate <ArrowIcon diagonal />
            </a>
          </div>
          <div className="hero-trust">
            <span>Free site measurement</span>
            <span>Itemized estimates</span>
            <span>In-house carpenters</span>
          </div>
        </motion.div>
        <motion.div className="hero-visual" {...revealProps(shouldReduceMotion, { image: true })}>
          <HeroImageCarousel slides={heroSlides} shouldReduceMotion={shouldReduceMotion} />
          <a className="hero-tour-link" href="#tours">
            <span className="tour-play" aria-hidden="true">↗</span>
            <span><strong>Step inside your future home</strong><small>Explore our interactive 360° tours</small></span>
          </a>
        </motion.div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to learn about Geo Interiors">
          <span>BUILT BY OUR TEAM, FROM THE FIRST MEASURE</span>
          <span className="scroll-line" />
        </a>
      </section>

      <section className="intro-strip max-[901px]:px-[5%] max-[681px]:flex-col max-[681px]:items-start max-[681px]:gap-2 max-[681px]:p-[22px]" id="about">
        <motion.p {...revealProps(shouldReduceMotion, { delay: 0.05 })}>GEO INTERIORS</motion.p>
        <motion.p className="intro-emphasis" {...revealProps(shouldReduceMotion, { delay: 0.12 })}>Made for real homes. Made by our own hands.</motion.p>
        <motion.p {...revealProps(shouldReduceMotion, { delay: 0.19 })}>DHARAPURAM · TAMIL NADU</motion.p>
      </section>

      <section className="about-section section-wrap max-[901px]:gap-[6%] max-[681px]:grid-cols-1">
        <motion.div className="about-heading" {...revealProps(shouldReduceMotion)}>
          <p className="eyebrow"><span /> WHO WE ARE</p>
          <h2 aria-label="Good work starts with the right hands.">
            <TypingText text="Good work starts" direction="left" shouldReduceMotion={shouldReduceMotion} />
            <br />
            <TypingText text="with the right hands." direction="right" shouldReduceMotion={shouldReduceMotion} />
          </h2>
          <motion.img
            className="team-photo"
            src={siteAsset('about_team_work.jpg')}
            alt="Geo Interiors carpentry and fitting team at work"
            loading="lazy"
            {...revealProps(shouldReduceMotion, { image: true })}
          />
        </motion.div>
        <motion.div className="about-copy" {...revealProps(shouldReduceMotion, { delay: 0.12 })}>
          <p>
            At Geo Interiors, we believe every family deserves a solid,
            functional and beautiful home interior—without inflated designer
            commissions.
          </p>
          <div className="values-grid">
            <motion.article {...revealProps(shouldReduceMotion, { delay: 0.05 })}><strong>01</strong><h3>Our own team</h3><p>No subcontracting. Skilled in-house carpenters handle the work.</p></motion.article>
            <motion.article {...revealProps(shouldReduceMotion, { delay: 0.1 })}><strong>02</strong><h3>Genuine materials</h3><p>BWP marine ply, Century or Greenply and Hettich hardware.</p></motion.article>
            <motion.article {...revealProps(shouldReduceMotion, { delay: 0.15 })}><strong>03</strong><h3>Clear estimates</h3><p>Itemized costs shared before work begins.</p></motion.article>
            <motion.article {...revealProps(shouldReduceMotion, { delay: 0.2 })}><strong>04</strong><h3>Timely handover</h3><p>A committed 30–45 day completion timeline.</p></motion.article>
          </div>
        </motion.div>
      </section>

      <section className="tour-section" id="tours">
        <div className="section-wrap">
          <motion.div className="section-heading" {...revealProps(shouldReduceMotion)}>
            <div>
              <p className="eyebrow"><span /> TAKE A CLOSER LOOK</p>
              <h2><TypingText text="Experience the rooms in 360°." direction="left" shouldReduceMotion={shouldReduceMotion} /></h2>
            </div>
          </motion.div>
          <motion.div
            className="tour-experience"
            {...revealProps(shouldReduceMotion, { image: true })}
          >
            <PanoramaViewer
              activeIndex={activeTourIndex}
              onSelect={setActiveTourIndex}
              tour={activeTour}
            />
          </motion.div>
        </div>
      </section>

      <section className="work-section section-wrap" id="services">
        <motion.div className="section-heading max-[681px]:flex-col max-[681px]:items-start" {...revealProps(shouldReduceMotion)}>
          <div>
            <p className="eyebrow"><span /> WHAT WE DO</p>
            <h2><TypingText text="From first cut to final fitting." direction="right" shouldReduceMotion={shouldReduceMotion} /></h2>
          </div>
        </motion.div>
        <div className="service-groups">
          {serviceGroups.map((group, groupIndex) => (
            <motion.section
              className="service-group"
              key={group.title}
              {...revealProps(shouldReduceMotion, { delay: groupIndex * 0.08 })}
            >
              <motion.div className="service-group-heading" {...revealProps(shouldReduceMotion, { delay: groupIndex * 0.08 })}>
                <span>0{groupIndex + 1}</span>
                <div>
                  <h3><TypingText text={group.title} direction={groupIndex % 2 ? 'right' : 'left'} shouldReduceMotion={shouldReduceMotion} /></h3>
                  <p>{group.description}</p>
                </div>
              </motion.div>
              <ServiceCardStack group={group} />
            </motion.section>
          ))}
        </div>
      </section>

      <section className="estimate-section" id="estimate">
        <div className="estimate-inner section-wrap max-[901px]:grid-cols-1">
          <motion.div {...revealProps(shouldReduceMotion)}>
            <p className="eyebrow"><span /> A CLEAR PLACE TO START</p>
            <h2><TypingText text="Explore an indicative budget." direction="left" shouldReduceMotion={shouldReduceMotion} /></h2>
          </motion.div>
          <motion.div
            className="estimate-card"
            {...revealProps(shouldReduceMotion, { delay: 0.1 })}
            aria-live="polite"
          >
            <div className="estimate-selectors max-[1201px]:grid-cols-1">
              <label className="estimate-field">
                <span>Home size or scope</span>
                <select value={homeScope} onChange={(event) => setHomeScope(event.target.value)}>
                  {homeScopes.map((scope) => (
                    <option key={scope.value} value={scope.value}>{scope.label}</option>
                  ))}
                </select>
              </label>
              <label className="estimate-field">
                <span>Material and finish</span>
                <select value={materialTier} onChange={(event) => setMaterialTier(event.target.value)}>
                  {materialTiers.map((tier) => (
                    <option key={tier.value} value={tier.value}>{tier.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <span className="estimate-card-kicker">{selectedTier.label} · {selectedScope.label}</span>
            <motion.strong
              className="estimate-amount"
              key={`${homeScope}-${materialTier}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: 'easeOut' }}
              aria-label={`${formattedEstimate} indicative starting estimate`}
            >
              <span className="estimate-currency" aria-hidden="true">₹</span>
              <span className="estimate-amount" aria-hidden="true">{formattedEstimateAmount}</span>
              <sup aria-hidden="true">*</sup>
            </motion.strong>
            <p>{selectedPackage.description}</p>
            <div className="estimate-includes">
              <span>PACKAGE INCLUDES</span>
              <ul>
                {selectedPackage.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <small>
              *Indicative starting estimate only; actual pricing depends on
              measurements, selected materials and agreed scope.
            </small>
            <a
              className="button button-dark estimate-cta"
              href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`Hello Geo Interiors! Please share an itemized estimate for ${selectedScope.label} at the ${selectedTier.label} level. The website shows ${formattedEstimate} as an indicative starting figure.`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Ask about this estimate <ArrowIcon diagonal />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="process-section section-wrap" id="process">
        <motion.div className="section-heading max-[681px]:flex-col max-[681px]:items-start" {...revealProps(shouldReduceMotion)}>
          <div>
            <p className="eyebrow"><span /> FROM VISIT TO HANDOVER</p>
            <h2><TypingText text="Five steps. No surprises." direction="right" shouldReduceMotion={shouldReduceMotion} /></h2>
          </div>
        </motion.div>
        <div className="process-grid max-[901px]:grid-cols-3 max-[681px]:grid-cols-2">
          {process.map((step, index) => (
            <motion.article
              className="process-card"
              key={step.title}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              {...revealProps(shouldReduceMotion, { delay: index * 0.075 })}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="testimonial-section" aria-label="Sample testimonials">
        <motion.div
          className="testimonial-marquee"
          {...revealProps(shouldReduceMotion)}
        >
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              const isDuplicate = index >= testimonials.length

              return (
                <article
                  className="testimonial-card"
                  key={`${testimonial.name}-${testimonial.location}-${index}`}
                  aria-hidden={isDuplicate}
                >
                  <img
                    className="testimonial-avatar"
                    src={siteAsset('testimonial-avatar-placeholder.svg')}
                    alt=""
                  />
                  <div className="testimonial-content">
                    <blockquote className="testimonial-quote">“{testimonial.quote}”</blockquote>
                    <p className="testimonial-attribution">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </motion.div>
      </section>

      <section className="faq-section section-wrap" id="faqs">
        <motion.div className="section-heading max-[681px]:flex-col max-[681px]:items-start" {...revealProps(shouldReduceMotion)}>
          <div>
            <p className="eyebrow"><span /> BEFORE YOU GET STARTED</p>
            <h2><TypingText text="A few useful details." direction="left" shouldReduceMotion={shouldReduceMotion} /></h2>
          </div>
        </motion.div>
        <motion.div className="faq-list" {...revealProps(shouldReduceMotion)}>
          <FaqItem
            question="How should I use the online budget estimate?"
            answer="Estimated starting price includes materials, labor, and transport based on size and finish, but requires a final written, itemized quote after physical measurement."
          />
          <FaqItem
            question="Is the site visit and measurement free?"
            answer="Geo advertises a free site visit and measurement. Share your project location when you enquire so the team can confirm availability for your area and arrange a suitable time."
          />
          <FaqItem
            question="How long does a project take?"
            answer="The existing Geo site lists a 30–45 day completion timeline. Confirm the start date, scope, dependencies and handover schedule in writing for your particular project."
          />
          <FaqItem
            question="What does the advertised 10-year warranty cover?"
            answer="Ask Geo for the written warranty terms before booking, including which products and workmanship are covered, exclusions and how to request service. Coverage may depend on the selected materials and scope."
          />
          <FaqItem
            question="Does Geo take projects outside Dharapuram?"
            answer="The listed office is in Dharapuram, Tiruppur District, Tamil Nadu. Share your project town or PIN code in the enquiry form so the team can confirm service availability."
          />
        </motion.div>
      </section>

      <footer className="contact-section" id="contact">
        <motion.p className="eyebrow" {...revealProps(shouldReduceMotion)}><span /> LET&apos;S TALK ABOUT YOUR HOME</motion.p>
        <motion.h2 aria-label="Ready to make your space work better?" {...revealProps(shouldReduceMotion, { delay: 0.08 })}>
          <TypingText text="Ready to make" direction="left" shouldReduceMotion={shouldReduceMotion} />
          <br />
          <TypingText text="your space" direction="right" shouldReduceMotion={shouldReduceMotion} />
          {' '}<em><TypingText text="work better?" direction="left" shouldReduceMotion={shouldReduceMotion} /></em>
        </motion.h2>
        <motion.form
          className="contact-form grid gap-4 sm:grid-cols-2"
          onSubmit={handleContactSubmit}
          {...revealProps(shouldReduceMotion, { delay: 0.12 })}
        >
          <label className="contact-field">
            <span>Your name</span>
            <input
              autoComplete="name"
              maxLength="100"
              name="name"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="contact-field">
            <span>Mobile number</span>
            <input
              autoComplete="tel"
              className="contact-mobile-input"
              inputMode="tel"
              maxLength="20"
              name="mobile"
              pattern="[0-9+ \-]{7,20}"
              placeholder={phoneDisplay}
              required
              title="Enter a valid phone number using digits, spaces, + or hyphens."
              type="tel"
            />
          </label>
          <label className="contact-field">
            <span>Email address <small>(optional)</small></span>
            <input
              autoComplete="email"
              maxLength="254"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </label>
          <label className="contact-field">
            <span>Service you need</span>
            <select name="service" required defaultValue="">
              <option value="" disabled>Select a service</option>
              {enquiryServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </label>
          <label className="contact-field sm:col-span-2">
            <span>Project town or PIN code <small>(optional)</small></span>
            <input
              autoComplete="postal-code"
              maxLength="100"
              name="location"
              placeholder="e.g. Dharapuram"
            />
          </label>
          <label className="contact-field sm:col-span-2">
            <span>Tell us about your project</span>
            <textarea
              maxLength="500"
              name="project"
              placeholder="Which rooms or services are you interested in?"
              required
              rows="3"
            />
          </label>
          <button className="button button-dark contact-submit sm:col-span-2" type="submit">
            Send enquiry via WhatsApp <ArrowIcon diagonal />
          </button>
        </motion.form>
        <motion.div className="contact-actions" {...revealProps(shouldReduceMotion)}>
          <a className="button button-dark" href={`tel:${phone}`}>
            Call <span className="contact-phone-number"></span><ArrowIcon />
          </a>
          <a
            className="button button-outline"
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp <ArrowIcon diagonal />
          </a>
        </motion.div>
        <motion.div className="footer-bottom" {...revealProps(shouldReduceMotion, { delay: 0.14 })}>
          <a className="wordmark footer-wordmark" href="#home" aria-label="Geo Interiors home">
            <span className="wordmark-symbol" aria-hidden="true">g<span>.</span></span>
            <span className="wordmark-name">GEO<small>INTERIORS</small></span>
          </a>
          <span>Direct factory. Skilled hands. Homes made to work.</span>
          <div className="footer-socials" aria-label="Social media">
            {siteConfig.social.instagramUrl ? (
              <a
                aria-label="Geo Interiors on Instagram"
                href={siteConfig.social.instagramUrl}
                rel="noreferrer"
                target="_blank"
                title="Instagram"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
            ) : (
              <span
                aria-label="Instagram profile URL not configured"
                className="is-unconfigured"
                role="img"
                title="Add the Instagram URL in src/siteConfig.js"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </span>
            )}
          </div>
          <a href="#home">Back to top ↑</a>
          <span>© {new Date().getFullYear()} Geo Interiors</span>
        </motion.div>
      </footer>
      <div className="social-floaters" aria-label="Contact and social media">
        <a
          className="instagram-float"
          href={siteConfig.social.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Geo Interiors on Instagram"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
          </svg>
        </a>
        <a
          className="whatsapp-float"
          href={`https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Geo Interiors on WhatsApp"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M8.3 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.6.5-1.1-.1-2.5-.8-3.8-2-1.1-1-2-2.4-2.2-3.4-.2-.8.1-1.6.5-2.1Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </main>
  )
}

export default App
