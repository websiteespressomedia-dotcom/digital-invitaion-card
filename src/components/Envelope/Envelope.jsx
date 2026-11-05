import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Envelope.css'

// Text inside the wax seal (e.g. 'C&J'). Keep it short.
const SEAL_TEXT = '&'

// TEMPORARY – replace or delete this GIF section later (search for "letter__gif")
const TEMP_GIF_URL = 'https://media1.tenor.com/m/tbnePOd_Gf4AAAAd/control-control-uday.gif'


/*
  Scratch-to-reveal block (replaces the plain GIF).
  A foil layer is painted on a canvas above the GIF. Scratching erases it
  (destination-out). Once ~50% is cleared the rest fades away and the GIF
  restarts from its first frame.
*/
const SCRATCH_BRUSH = 30 // brush size in px
const SCRATCH_THRESHOLD = 0.5 // fraction cleared before auto-reveal

function paintFoil(ctx, w, h) {
  ctx.globalCompositeOperation = 'source-over'
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#cfae6e')
  g.addColorStop(0.35, '#f4e4b8')
  g.addColorStop(0.6, '#d9bd85')
  g.addColorStop(1, '#bf9a55')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // fine metallic grain
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(110,80,30,0.18)'
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5)
  }
  // soft diagonal sheen
  const s = ctx.createLinearGradient(0, h, w, 0)
  s.addColorStop(0.35, 'rgba(255,255,255,0)')
  s.addColorStop(0.5, 'rgba(255,255,255,0.38)')
  s.addColorStop(0.65, 'rgba(255,255,255,0)')
  ctx.fillStyle = s
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = 'rgba(120,88,40,0.35)'
  ctx.lineWidth = 1
  ctx.strokeRect(7.5, 7.5, w - 15, h - 15)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(95,68,30,0.85)'
  ctx.font = '22px Georgia, serif'
  ctx.fillText('✦', w / 2, h / 2 - 16)
  ctx.font = '600 9px Arial, sans-serif'
  ctx.fillText('S C R A T C H   H E R E', w / 2, h / 2 + 8)
  ctx.font = 'italic 11px Georgia, serif'
  ctx.fillText('a little surprise for you', w / 2, h / 2 + 26)
}

function ScratchReveal({ src }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const touchedRef = useRef(false)
  const drawingRef = useRef(false)
  const doneRef = useRef(false)
  const lastRef = useRef(null)
  const lastCheckRef = useRef(0)
  const [revealed, setRevealed] = useState(false)

  // (Re)paint the foil whenever the box size changes, until scratching starts.
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const init = () => {
      if (touchedRef.current || doneRef.current) return
      const w = wrap.offsetWidth
      const h = wrap.offsetHeight
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintFoil(ctx, w, h)
    }
    init()
    const ro = new ResizeObserver(init)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  const point = (e) => {
    const canvas = canvasRef.current
    const r = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - r.left) * (canvas.offsetWidth / r.width),
      y: (e.clientY - r.top) * (canvas.offsetHeight / r.height),
    }
  }

  const scratchLine = (from, to) => {
    const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true })
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = SCRATCH_BRUSH
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }

  const clearedRatio = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let total = 0
    let cleared = 0
    for (let i = 3; i < data.length; i += 4 * 12) { // sample every 12th pixel
      total++
      if (data[i] < 128) cleared++
    }
    return total ? cleared / total : 0
  }

  const reveal = () => {
    if (doneRef.current) return
    doneRef.current = true
    drawingRef.current = false
    setRevealed(true) // remounts the <img> so the GIF plays from its first frame
    gsap.to(canvasRef.current, {
      opacity: 0,
      duration: 1.6,
      ease: 'sine.inOut',
      onComplete: () => { if (canvasRef.current) canvasRef.current.style.display = 'none' },
    })
  }

  const onDown = (e) => {
    if (doneRef.current) return
    e.preventDefault()
    e.stopPropagation()
    touchedRef.current = true
    drawingRef.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const p = point(e)
    lastRef.current = p
    scratchLine(p, { x: p.x + 0.01, y: p.y })
  }

  const onMove = (e) => {
    if (!drawingRef.current || doneRef.current) return
    e.preventDefault()
    const p = point(e)
    scratchLine(lastRef.current, p)
    lastRef.current = p
    const now = performance.now()
    if (now - lastCheckRef.current > 140) {
      lastCheckRef.current = now
      if (clearedRatio() >= SCRATCH_THRESHOLD) reveal()
    }
  }

  const onUp = () => {
    if (!drawingRef.current) return
    drawingRef.current = false
    if (!doneRef.current && clearedRatio() >= SCRATCH_THRESHOLD) reveal()
  }

  return (
    <span ref={wrapRef} data-reveal className={`letter__gif ${revealed ? 'letter__gif--revealed' : ''}`}>
      <img
        key={revealed ? 'revealed' : 'hidden'}
        src={src}
        alt=""
        draggable="false"
        onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
      />
      <canvas
        ref={canvasRef}
        className="letter__scratch"
        aria-label="Scratch to reveal"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
    </span>
  )
}

/*
  Flow (each step starts only when the previous one has finished, so nothing overlaps oddly):
  1. Envelope fills the whole phone. Tap anywhere (seal included).
  2. Seal is pressed, then the flap (seal stuck to it) opens to ~100°. It stays IN FRONT of
     the card the whole time – at under 180° a real flap is still in front of the letter.
  3. The card slides a little way up out of the envelope.
  4. The flap goes UP and out of the screen, the rest of the envelope goes DOWN and out.
     Only a soft shadow/vignette (stage) is left behind.
  5. The card grows to 100% of the phone, then the text appears.

  Geometry: flap, left, right and bottom panels tile the envelope and all meet
  at (50%, 50%), so their edges match exactly.
*/
function Envelope() {
  const [isOpened, setIsOpened] = useState(false)
  const [isFull, setIsFull] = useState(false)

  const areaRef = useRef(null)
  const envelopeRef = useRef(null)
  const sealRef = useRef(null)
  const flapRef = useRef(null)
  const flapShadeRef = useRef(null)
  const flapCastRef = useRef(null)
  const insideShadeRef = useRef(null)
  const letterRef = useRef(null)
  const hintRef = useRef(null)
  const startedRef = useRef(false)

  const handleOpen = () => {
    if (startedRef.current) return
    startedRef.current = true
    setIsOpened(true)
  }

  // Hide the letter text before first paint so nothing flashes.
  useLayoutEffect(() => {
    gsap.set(letterRef.current.querySelectorAll('[data-reveal]'), { autoAlpha: 0, y: 14 })
  }, [])

  useLayoutEffect(() => {
    if (!isOpened) return undefined

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(envelopeRef)
      const reveals = q('[data-reveal]')
      const pieces = q('[data-piece]')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Measure, then give the card explicit pixel geometry so it can grow
      // from "60% card inside the envelope" to "100% of the phone".
      const envR = envelopeRef.current.getBoundingClientRect()
      const areaR = areaRef.current.getBoundingClientRect()
      const letR = letterRef.current.getBoundingClientRect()
      const start = { left: letR.left - envR.left, top: letR.top - envR.top, width: letR.width, height: letR.height }
      const target = { left: areaR.left - envR.left, top: areaR.top - envR.top, width: areaR.width, height: areaR.height }
      const riseY = Math.min(envR.height * 0.06, start.top - 8) // card slides out a little
      const downY = areaR.bottom - envR.top + 80 // envelope body leaves downwards
      const upY = -(areaR.height * 0.6 + 120) // flap leaves upwards
      // Same two-layer shadow structure at start and end so GSAP can tween it smoothly.
      gsap.set(letterRef.current, {
        ...start,
        boxShadow: '0 2px 6px rgba(40,25,15,0.1), 0 1px 2px rgba(40,25,15,0.05)',
      })

      if (reduce) {
        gsap.set([...pieces, flapRef.current, hintRef.current], { autoAlpha: 0 })
        gsap.set(letterRef.current, { ...target })
        setIsFull(true)
        gsap.set(reveals, { autoAlpha: 1, y: 0 })
        return
      }

      const tl = gsap.timeline()

      // 1. Seal is gently pressed, then stays on the flap (it is a child of the flap)
      tl.to(hintRef.current, { autoAlpha: 0, y: 6, duration: 0.7, ease: 'sine.out' }, 0)
        .to(sealRef.current, { scale: 0.92, duration: 0.6, ease: 'sine.inOut' }, 0)
        .to(sealRef.current, { scale: 1, duration: 0.5, ease: 'sine.out' })

      // 2. Flap lifts a hair, then opens to ~100° carrying the seal.
      //    It is never sent behind the card: no z-index switching, so no pop.
      tl.addLabel('flap', '+=0.2')
        .to(flapRef.current, { rotateX: -9, duration: 0.5, ease: 'sine.inOut' }, 'flap')
        .to(flapRef.current, { rotateX: -100, duration: 2.2, ease: 'power2.inOut' }, 'flap+=0.5')
        .to(flapShadeRef.current, { opacity: 0.55, duration: 1.2, ease: 'sine.in' }, 'flap+=0.5')
        .to(insideShadeRef.current, { opacity: 1, duration: 1.8, ease: 'sine.inOut' }, 'flap+=1')
        .to(flapCastRef.current, { opacity: 0.45, duration: 1.8, ease: 'sine.inOut' }, 'flap+=0.5')

      // 3. With the flap open, the card slides a little way up out of the envelope
      tl.addLabel('rise', 'flap+=2.5')
        .to(letterRef.current, {
          y: -riseY,
          boxShadow: '0 14px 28px rgba(40,25,15,0.25), 0 4px 10px rgba(40,25,15,0.15)',
          duration: 1.3,
          ease: 'power2.inOut',
        }, 'rise')

      // 4. Flap goes up, rest of the envelope goes down – at the same time
      tl.addLabel('split', 'rise+=1.5')
        .to(flapRef.current, { y: upY, duration: 2.4, ease: 'power2.inOut' }, 'split')
        .to(pieces, { y: downY, duration: 2.4, ease: 'power2.inOut' }, 'split')
        .to(letterRef.current, {
          boxShadow: '0 28px 60px rgba(40,25,15,0.38), 0 8px 18px rgba(40,25,15,0.22)',
          duration: 1.2,
          ease: 'sine.out',
        }, 'split')
        // 5. Once the envelope has cleared the screen, the card grows to full phone size
        .to(letterRef.current, { ...target, y: 0, duration: 2.6, ease: 'power2.inOut' }, 'split+=1.3')
        .to(letterRef.current, {
          boxShadow: '0 0 0 rgba(40,25,15,0), 0 0 0 rgba(40,25,15,0)',
          duration: 1,
          ease: 'sine.in',
        }, 'split+=2.9')
        .call(() => setIsFull(true), null, 'split+=3.9')

      // 6. Text appears, line by line
      tl.addLabel('text', 'split+=3.4')
      reveals.forEach((el, i) => {
        tl.to(el, { autoAlpha: el.dataset.opacity ? Number(el.dataset.opacity) : 1, y: 0, duration: 1.3, ease: 'sine.out' }, `text+=${i * 0.5}`)
      })
    }, areaRef)

    return () => ctx.revert()
  }, [isOpened])

  return (
    <section ref={areaRef} className={`envelope-area ${isFull ? 'envelope-area--full' : ''}`} aria-label="Wedding invitation envelope">
      <button
        ref={envelopeRef}
        className={`envelope ${isOpened ? 'envelope--opened' : ''}`}
        type="button"
        onClick={handleOpen}
        tabIndex={isOpened ? -1 : 0}
        aria-disabled={isOpened}
        aria-label={isOpened ? 'Invitation opened' : 'Tap anywhere on the envelope to open the invitation'}
      >
        <span className="envelope__stage" aria-hidden="true" />
        <span data-piece className="envelope__ground" aria-hidden="true" />
        <span data-piece className="envelope__back" aria-hidden="true" />
        <span data-piece ref={insideShadeRef} className="envelope__inside" aria-hidden="true" />

        <span ref={letterRef} className="envelope__letter">
          <span data-reveal data-opacity="0.8" className="letter__ornament letter__ornament--top" aria-hidden="true">❧</span>
          <span data-reveal className="letter__line letter__topline">TOGETHER WITH THEIR FAMILIES</span>
          <span data-reveal className="letter__line letter__small">REQUEST THE PLEASURE OF YOUR COMPANY</span>
          <span data-reveal className="letter__line letter__names">Uday Shetty</span>

          {/* TEMPORARY GIF (scratch to reveal) – remove this block later */}
          {/* <ScratchReveal src={TEMP_GIF_URL} /> */}

          <span data-reveal className="letter__line letter__divider" aria-hidden="true">✦</span>
          <span data-reveal className="letter__line letter__event">AT THE CELEBRATION OF THEIR WEDDING</span>
          <span data-reveal className="letter__line letter__date">A BEAUTIFUL DAY · 2026</span>
          <span data-reveal data-opacity="0.8" className="letter__ornament letter__ornament--bottom" aria-hidden="true">❦</span>
        </span>

        <span data-piece className="envelope__panel envelope__panel--bottom" aria-hidden="true" />
        <span data-piece className="envelope__panel envelope__panel--left" aria-hidden="true" />
        <span data-piece className="envelope__panel envelope__panel--right" aria-hidden="true" />
        <span data-piece ref={flapCastRef} className="envelope__flap-cast" aria-hidden="true" />

        <span ref={flapRef} className="envelope__flap" aria-hidden="true">
          <span className="envelope__flap-front">
            <span ref={flapShadeRef} className="envelope__flap-shade" />
          </span>
          <span className="envelope__flap-back" />
          {/* Seal is stuck to the flap: front face when closed, wax underside once flipped */}
          <span ref={sealRef} className="wax-seal">
            <span className="wax-seal__face wax-seal__face--front">
              <span className="wax-seal__inner">{SEAL_TEXT}</span>
            </span>
            <span className="wax-seal__face wax-seal__face--back" />
          </span>
        </span>
      </button>

      <p ref={hintRef} className="envelope-hint">TAP ANYWHERE TO OPEN</p>
    </section>
  )
}

export default Envelope