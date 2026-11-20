import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Transportation.css'

const DEFAULT_DETAILS = {
  venue: 'Villa Aurelia',
  city: 'Rajasthan, India',
  pickupPoint: 'Bhangarh Fort',
  departureTime: '12:00 AM',
  introduction:
    'We want getting to and from the celebration to be as easy as possible.',
  pickupDetails:
    'A private bus will depart from Bhangarh Fort, taking guests directly to Villa Aurelia with plenty of time to settle in before the ceremony.',
  returnDetails:
    'At the end of the evening, return transportation to central Rajasthan will also be provided.',
  mapsUrl:
    'https://www.google.com/maps?sca_esv=2c3394e759efece4&mstk=AUtExfBIA5UVSnUQ7QkJz3fMcoH9Sq6pg52s31TV3m7lbvUle_A9YcSetkSiTbkGcZtg7mRNFh4_QF2L1DgOJRD0WQv7zNEJRznXZIoJq0m0sk-bsDOrEIv-HXahVwkHimxTLHw&hl=en&pvq=CgovbS8wd2RycXl2gAEBkAEB&fvr=1&vet=10CAAQoqAOahcKEwjg8qjs3I6YAxUAAAAAHQAAAAAQBQ..i&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x396d8522c8a74f25:0x59400bd073d17528',
}

function TravelStamp() {
  return (
    <svg
      className="transportation__stamp"
      viewBox="0 0 340 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vintage wedding postage stamp and postmark illustration"
    >
      <defs>
        <linearGradient id="transport-stamp-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#eee8dc" />
        </linearGradient>
      </defs>

      <rect
        x="35"
        y="20"
        width="150"
        height="117"
        rx="2"
        fill="url(#transport-stamp-paper)"
        stroke="#71859a"
        strokeWidth="1.7"
        strokeDasharray="2 4"
      />
      <rect
        x="43"
        y="28"
        width="134"
        height="101"
        stroke="#91a0ad"
        strokeWidth=".8"
      />

      <text
        x="110"
        y="44"
        textAnchor="middle"
        fill="#657d94"
        fontSize="8"
        letterSpacing="2"
        fontFamily="Georgia, serif"
      >
        SAVE THE DATE
      </text>

      {/* Fine-line venue illustration */}
      <path
        d="M70 96L110 59L150 96V112H70V96Z"
        fill="#e8e0d2"
        stroke="#778a9c"
        strokeWidth="1.4"
      />
      <path
        d="M62 96L110 54L158 96M67 98H153M66 113H154"
        stroke="#73869a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M82 111V91Q82 82 91 82Q100 82 100 91V111
           M103 111V89Q103 80 112 80Q121 80 121 89V111
           M125 111V91Q125 82 134 82Q143 82 143 91V111"
        stroke="#8b9aaa"
        strokeWidth="1.3"
        fill="none"
      />
      <text
        x="110"
        y="123"
        textAnchor="middle"
        fill="#71859a"
        fontSize="6"
        letterSpacing="1.1"
      >
        OUR CELEBRATION
      </text>

      {/* Postmark */}
      <circle cx="244" cy="77" r="36" stroke="#8394a5" strokeWidth="1.2" />
      <circle cx="244" cy="77" r="28" stroke="#a1aeba" strokeWidth=".8" />
      <path
        d="M244 50L250 69L270 77L250 84L244 104L237 84L218 77L237 69Z"
        stroke="#71869a"
        strokeWidth="1.2"
      />
      <text
        x="244"
        y="118"
        textAnchor="middle"
        fill="#778a9b"
        fontSize="7"
        letterSpacing="1.4"
      >
        THE JOURNEY
      </text>

      {/* Postmark cancellation lines */}
      <path
        className="transportation__postmark-line"
        d="M192 139C225 126 253 153 287 137"
        stroke="#8495a6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        className="transportation__postmark-line"
        d="M192 148C225 135 253 162 287 146"
        stroke="#8495a6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Light dotted travel path */}
      <path
        className="transportation__route-path"
        d="M19 158C66 133 91 169 139 152C164 143 177 155 194 153"
        stroke="#b69a76"
        strokeWidth="1.4"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="158" r="3.5" fill="#b69a76" />
      <circle cx="194" cy="153" r="3.5" fill="#b69a76" />
    </svg>
  )
}

function Transportation({
  venue = DEFAULT_DETAILS.venue,
  city = DEFAULT_DETAILS.city,
  pickupPoint = DEFAULT_DETAILS.pickupPoint,
  departureTime = DEFAULT_DETAILS.departureTime,
  introduction = DEFAULT_DETAILS.introduction,
  pickupDetails = DEFAULT_DETAILS.pickupDetails,
  returnDetails = DEFAULT_DETAILS.returnDetails,
  mapsUrl = DEFAULT_DETAILS.mapsUrl,
}) {
  const sectionRef = useRef(null)
  const paperRef = useRef(null)
  const stampRef = useRef(null)
  const titleRef = useRef(null)
  const venueRef = useRef(null)
  const introRef = useRef(null)
  const pickupRef = useRef(null)
  const returnRef = useRef(null)
  const buttonRef = useRef(null)
  const playedRef = useRef(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) return undefined

    const findScrollRoot = () => {
      let parent = section.parentElement

      while (parent && parent !== document.body) {
        const style = window.getComputedStyle(parent)
        if (
          /(auto|scroll|overlay)/.test(style.overflowY) &&
          parent.scrollHeight > parent.clientHeight + 1
        ) {
          return parent
        }
        parent = parent.parentElement
      }

      return null
    }

    let animationContext

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || playedRef.current) return
        playedRef.current = true

        animationContext = gsap.context(() => {
          const timeline = gsap.timeline()

          timeline
            .fromTo(
              paperRef.current,
              { autoAlpha: 0, y: 24, scale: 0.985 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                ease: 'power2.out',
              },
            )
            .fromTo(
              stampRef.current,
              { autoAlpha: 0, y: 19, rotation: -1.5, scale: 0.95 },
              {
                autoAlpha: 1,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 0.95,
                ease: 'power2.out',
              },
              '-=0.35',
            )
            .fromTo(
              [titleRef.current, venueRef.current],
              { autoAlpha: 0, y: 13 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: 'power2.out',
              },
              '-=0.36',
            )
            .fromTo(
              [introRef.current, pickupRef.current, returnRef.current],
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.18,
                ease: 'power2.out',
              },
              '-=0.22',
            )
            .fromTo(
              buttonRef.current,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out',
              },
              '-=0.15',
            )

          const route = section.querySelector('.transportation__route-path')
          if (route) {
            const length = route.getTotalLength()
            gsap.set(route, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })

            timeline.to(
              route,
              {
                strokeDashoffset: 0,
                duration: 1.05,
                ease: 'power1.inOut',
              },
              0.7,
            )
          }
        }, section)

        observer.disconnect()
      },
      {
        root: findScrollRoot(),
        threshold: 0.16,
      },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      animationContext?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="card-page transportation"
      aria-label="Wedding transportation"
    >
      <div className="transportation__pearl-glow" aria-hidden="true" />

      <main
        ref={paperRef}
        className="transportation__paper"
      >
        <div className="transportation__paper-border" aria-hidden="true" />

        <div
          ref={stampRef}
          className="transportation__artwork"
        >
          <TravelStamp />
        </div>

        <header className="transportation__header">
          <span className="transportation__eyebrow">
            A SPECIAL JOURNEY
          </span>

          <h2
            ref={titleRef}
            className="transportation__title"
          >
            Transportation
          </h2>

          <span
            ref={venueRef}
            className="transportation__venue"
          >
            {venue} · {city}
          </span>
        </header>

        <div
          ref={introRef}
          className="transportation__copy transportation__copy--intro"
        >
          <p>{introduction}</p>
        </div>

        <div
          ref={pickupRef}
          className="transportation__copy transportation__copy--pickup"
        >
          <p>
            <span className="transportation__copy-label">
              PICK-UP POINT
            </span>
            <strong>{pickupPoint}</strong>
            <span className="transportation__departure">
              Departure at {departureTime}
            </span>
          </p>

          <p>{pickupDetails}</p>
        </div>

        <div
          ref={returnRef}
          className="transportation__copy transportation__copy--return"
        >
          <p>{returnDetails}</p>
        </div>

        <a
          ref={buttonRef}
          className="transportation__button"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View map for the pick-up point at ${pickupPoint}`}
        >
          <span>VIEW PICK-UP POINT</span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 15L15 5M6 5H15V14"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </main>
    </section>
  )
}

export default Transportation
