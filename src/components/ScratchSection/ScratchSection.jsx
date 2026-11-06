
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  CornerFlorals,
  GinkgoSprig,
  FloralDivider,
} from '../Ornaments/Ornaments.jsx'
import './ScratchSection.css'

const BRUSH_SIZE = 32
const REVEAL_THRESHOLD = 0.48

// Soft sage-grey scratch cover
function paintScratchCover(context, width, height) {
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = '#c5cec4'
  context.fillRect(0, 0, width, height)

  // Subtle paper texture
  for (let index = 0; index < 150; index += 1) {
    context.fillStyle =
      index % 2 === 0
        ? 'rgba(255,255,255,0.18)'
        : 'rgba(83,101,87,0.07)'

    context.fillRect(
      Math.random() * width,
      Math.random() * height,
      1,
      1,
    )
  }

  // Cover text
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#58675b'
  context.font = '600 9px Arial, sans-serif'
  context.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 7)

  context.fillStyle = 'rgba(78, 94, 82, 0.86)'
  context.font = 'italic 11px Georgia, serif'
  context.fillText(
    'a little surprise for you',
    width / 2,
    height / 2 + 13,
  )
}

function ScratchReveal({ src, alt = 'A wedding surprise' }) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const drawingRef = useRef(false)
  const finishedRef = useRef(false)
  const lastPointRef = useRef(null)
  const lastCheckRef = useRef(0)

  const [isRevealed, setIsRevealed] = useState(false)

  // Draw the scratch cover
  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current

    if (!wrapper || !canvas) return undefined

    const drawCover = () => {
      if (finishedRef.current) return

      const width = wrapper.clientWidth
      const height = wrapper.clientHeight

      if (!width || !height) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      const context = canvas.getContext('2d', {
        willReadFrequently: true,
      })

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      paintScratchCover(context, width, height)
    }

    drawCover()

    const observer = new ResizeObserver(drawCover)
    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [])

  // Get pointer position
  const getPoint = (event) => {
    const canvas = canvasRef.current
    const bounds = canvas.getBoundingClientRect()

    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }
  }

  // Erase the cover while scratching
  const eraseLine = (from, to) => {
    const context = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    })

    context.globalCompositeOperation = 'destination-out'
    context.lineWidth = BRUSH_SIZE
    context.lineCap = 'round'
    context.lineJoin = 'round'

    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()
  }

  // Calculate how much of the cover has been scratched
  const getClearedRatio = () => {
    const canvas = canvasRef.current

    const context = canvas.getContext('2d', {
      willReadFrequently: true,
    })

    const { data } = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    )

    let samples = 0
    let transparent = 0

    for (let index = 3; index < data.length; index += 4 * 16) {
      samples += 1

      if (data[index] < 128) {
        transparent += 1
      }
    }

    return samples ? transparent / samples : 0
  }

  // Reveal the hidden image
  const revealImage = () => {
    if (finishedRef.current) return

    finishedRef.current = true
    drawingRef.current = false

    setIsRevealed(true)

    gsap.to(canvasRef.current, {
      autoAlpha: 0,
      duration: 1.25,
      ease: 'sine.inOut',
      onComplete: () => {
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none'
        }
      },
    })
  }

  // Touch or mouse starts scratching
  const handlePointerDown = (event) => {
    if (finishedRef.current) return

    event.preventDefault()

    drawingRef.current = true

    event.currentTarget.setPointerCapture?.(event.pointerId)

    const point = getPoint(event)

    lastPointRef.current = point

    eraseLine(point, {
      x: point.x + 0.01,
      y: point.y,
    })
  }

  // Continue scratching
  const handlePointerMove = (event) => {
    if (!drawingRef.current || finishedRef.current) return

    event.preventDefault()

    const point = getPoint(event)

    eraseLine(lastPointRef.current, point)

    lastPointRef.current = point

    const now = performance.now()

    if (now - lastCheckRef.current > 160) {
      lastCheckRef.current = now

      if (getClearedRatio() >= REVEAL_THRESHOLD) {
        revealImage()
      }
    }
  }

  // Stop scratching
  const handlePointerUp = () => {
    if (!drawingRef.current) return

    drawingRef.current = false

    if (
      !finishedRef.current &&
      getClearedRatio() >= REVEAL_THRESHOLD
    ) {
      revealImage()
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`scratch-reveal ${
        isRevealed ? 'scratch-reveal--revealed' : ''
      }`}
    >
      <img
        key={isRevealed ? 'revealed' : 'covered'}
        className="scratch-reveal__image"
        src={src}
        alt={alt}
        draggable="false"
        onError={(event) => {
          event.currentTarget.dataset.failed = 'true'
        }}
      />

      <canvas
        ref={canvasRef}
        className="scratch-reveal__foil"
        aria-label="Scratch the sage cover to reveal the image"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  )
}

function ScratchSection({ imageSrc, imageAlt }) {
  return (
    <section
      className="card-page scratch-section"
      aria-label="Scratch to reveal"
    >
      <CornerFlorals />

      <div className="scratch-section__frame">
        <GinkgoSprig />

        <div className="scratch-section__heading">
          <p className="scratch-section__eyebrow">
            A LITTLE SURPRISE
          </p>

          <h2 className="scratch-section__title">
            A moment to treasure
          </h2>

          <p className="scratch-section__description">
            Gently scratch the soft sage surface and reveal a special memory.
          </p>
        </div>

        <ScratchReveal
          src={imageSrc}
          alt={imageAlt}
        />

        <FloralDivider />

        <p className="scratch-section__footer">
          MADE WITH LOVE <span aria-hidden="true">✦</span>
        </p>
      </div>
    </section>
  )
}

export default ScratchSection
