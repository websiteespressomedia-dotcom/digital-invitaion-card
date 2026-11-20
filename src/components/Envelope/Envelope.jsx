import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CornerFlorals, GinkgoSprig, FloralDivider } from '../Ornaments/Ornaments.jsx'
import { EnvelopeArt, EnvelopeArtDefs } from './EnvelopeArt.jsx'
import './Envelope.css'

const SEAL_TEXT = '&'

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
function Envelope({
  onComplete,
  onOpen,
  groom = { first: 'Uday', last: 'Shetty' },
  bride = { first: 'Ananya', last: 'Rao' },
  weddingYear = '2026',
}) {
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
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen

  const handleOpen = () => {
    if (startedRef.current) return
    startedRef.current = true

    // Start global background music from the actual envelope tap.
    // Keep this call before the React state update so browsers recognise
    // it as part of the user's interaction.
    onOpenRef.current?.()

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
      gsap.set(insideShadeRef.current, { opacity: 0.18 })
      gsap.set(flapCastRef.current, { opacity: 0 })

      if (reduce) {
        gsap.set([...pieces, flapRef.current, hintRef.current], { autoAlpha: 0 })
        gsap.set(letterRef.current, { ...target })
        setIsFull(true)
        gsap.set(reveals, { autoAlpha: 1, y: 0 })
        onCompleteRef.current?.()
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
        .to(insideShadeRef.current, { opacity: 0.92, duration: 1.8, ease: 'sine.inOut' }, 'flap+=1')
        .to(flapCastRef.current, { opacity: 0.32, duration: 1.8, ease: 'sine.inOut' }, 'flap+=0.5')

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
      // 6. Reveal the invitation copy line by line.
      const revealStagger = 0.5
      const revealDuration = 1.3
      tl.addLabel('text', 'split+=3.4')

      reveals.forEach((el, index) => {
        tl.to(
          el,
          {
            autoAlpha: el.dataset.opacity ? Number(el.dataset.opacity) : 1,
            y: 0,
            duration: revealDuration,
            ease: 'sine.out',
          },
          `text+=${index * revealStagger}`,
        )
      })

      // Only unlock the following pages after the final letter detail is visible.
      const revealSequenceEnd =
        reveals.length > 0
          ? (reveals.length - 1) * revealStagger + revealDuration
          : 0

      tl.call(() => {
        setIsFull(true)
        onCompleteRef.current?.()
      }, null, `text+=${revealSequenceEnd}`)
    }, areaRef)

    return () => ctx.revert()
  }, [isOpened])

  return (
    <section
      ref={areaRef}
      className={`envelope-area ${isFull ? 'envelope-area--full' : ''}`}
      aria-label="Wedding invitation envelope"
    >
      <div className="envelope-intro">
      <EnvelopeArtDefs />
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
        <span data-piece className="envelope__back" aria-hidden="true"><EnvelopeArt /></span>
        <span data-piece ref={insideShadeRef} className="envelope__inside" aria-hidden="true" />

        <span ref={letterRef} className="envelope__letter">
          <span data-reveal className="letter__florals" aria-hidden="true"><CornerFlorals /></span>

          <span className="card-arch letter__arch">
            <span data-reveal className="letter__crest"><GinkgoSprig /></span>
            <span data-reveal className="letter__line letter__topline">TOGETHER WITH THEIR FAMILIES</span>
            <span data-reveal className="letter__line letter__small">REQUEST THE PLEASURE OF YOUR COMPANY</span>
            <span className="letter__couple">
              <span data-reveal className="letter__person">
                <span className="letter__first">{groom.first}</span>
                <span className="letter__last">{groom.last}</span>
              </span>
              <span data-reveal className="letter__weds" aria-label="weds">
                <i aria-hidden="true" />
                <b>weds</b>
                <i aria-hidden="true" />
              </span>
              <span data-reveal className="letter__person">
                <span className="letter__first">{bride.first}</span>
                <span className="letter__last">{bride.last}</span>
              </span>
            </span>
            <span data-reveal className="letter__rule"><FloralDivider /></span>
            <span data-reveal className="letter__line letter__event">AT THE CELEBRATION OF THEIR WEDDING</span>
            <span data-reveal className="letter__line letter__date">A BEAUTIFUL DAY · {weddingYear}</span>
          </span>
        </span>

        <span data-piece className="envelope__panel envelope__panel--bottom" aria-hidden="true"><EnvelopeArt /></span>
        <span data-piece className="envelope__panel envelope__panel--left" aria-hidden="true"><EnvelopeArt /></span>
        <span data-piece className="envelope__panel envelope__panel--right" aria-hidden="true"><EnvelopeArt /></span>
        <span data-piece className="envelope__frame" aria-hidden="true" />
        <svg data-piece className="envelope__trim" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="trim-light" d="M0 34L50 51L100 34M0 68L50 51L100 68" />
          <path className="trim-gold" d="M0 33L50 50L100 33M0 67L50 50L100 67" />
        </svg>
        <span data-piece className="envelope__florals" aria-hidden="true"><CornerFlorals corners={['bl', 'br']} /></span>
        <span data-piece className="envelope__address" aria-hidden="true">
          <GinkgoSprig />
          <span className="envelope__address-eyebrow">A WEDDING INVITATION</span>
          <span className="envelope__address-line">for our dear guest</span>
        </span>
        <span data-piece ref={flapCastRef} className="envelope__flap-cast" aria-hidden="true" />

        <span ref={flapRef} className="envelope__flap" aria-hidden="true">
          <span className="envelope__flap-front">
            <EnvelopeArt />
            <svg className="envelope__flap-trim" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="trim-light" d="M0 67.5L50 101.5L100 67.5" />
              <path className="trim-gold" d="M0 66L50 100L100 66" />
              <path className="trim-dash" d="M0 59L50 93L100 59" />
            </svg>
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
      </div>
    </section>
  )
}

export default Envelope