import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './WhereToStay.css'

const DEFAULT_HOTELS = [
  {
    id: 'grand-hotel-del-gianicolo',
    name: 'Grand Hotel del Gianicolo',
    area: 'GIANICOLO, ROME',
    recommendedStay: '19 – 21 May 2027',
    guestRate: '',
    parking: 'Parking available on site',
    description:
      'Just moments from the venue, offering an elegant and convenient stay surrounded by the greenery of the Gianicolo.',
    bookingUrl: 'https://maps.app.goo.gl/5u8Sak9uSxT34Y1c8',
  },
  {
    id: 'donna-camilla-savelli',
    name: 'Donna Camilla Savelli',
    area: 'TRASTEVERE, ROME',
    recommendedStay: '19 – 21 May 2027',
    guestRate: '',
    parking: 'Parking available on site',
    description:
      'A charming historic hotel in Trastevere, combining Roman character with a peaceful and refined atmosphere.',
    bookingUrl: 'https://maps.app.goo.gl/5u8Sak9uSxT34Y1c8',
  },
]

function HotelOrnament({ number }) {
  return (
    <svg
      className="stay-panel__ornament"
      viewBox="0 0 320 86"
      fill="none"
      aria-hidden="true"
    >
      {/* Fine botanical curves and leaves */}
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 61C43 61 50 31 83 34C105 36 117 56 142 53" />
        <path d="M308 61C277 61 270 31 237 34C215 36 203 56 178 53" />
        <path d="M34 53C28 40 32 29 45 22C51 35 47 47 34 53Z" fill="currentColor" fillOpacity=".08" />
        <path d="M61 39C63 25 74 18 88 21C86 35 75 43 61 39Z" fill="currentColor" fillOpacity=".08" />
        <path d="M286 53C292 40 288 29 275 22C269 35 273 47 286 53Z" fill="currentColor" fillOpacity=".08" />
        <path d="M259 39C257 25 246 18 232 21C234 35 245 43 259 39Z" fill="currentColor" fillOpacity=".08" />
        <path d="M48 48L45 22M48 48L88 21M272 48L275 22M272 48L232 21" opacity=".75" />
        <path d="M142 53C150 48 154 44 160 36C166 44 170 48 178 53" />
        <path d="M151 50C153 39 158 32 160 27C162 32 167 39 169 50" />
      </g>

      <circle cx="160" cy="39" r="25" fill="#f7f0eb" stroke="#c5ad9b" strokeWidth="1" />
      <circle cx="160" cy="39" r="20" stroke="#d8c6b8" strokeWidth=".8" />
      <text
        x="160"
        y="44"
        textAnchor="middle"
        fill="#987d68"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontStyle="italic"
      >
        {number}
      </text>
      <path d="M145 71H175" stroke="#c7ad91" strokeWidth="1" />
      <path d="M155 71L160 66L165 71" stroke="#c7ad91" strokeWidth="1" />
    </svg>
  )
}

function HotelPanel({ hotel, index, panelRef }) {
  const hasBookingLink = Boolean(hotel.bookingUrl)

  return (
    <article
      ref={panelRef}
      className="stay-panel"
      aria-label={`${hotel.name} accommodation`}
    >
      <div className="stay-panel__frame" aria-hidden="true" />

      {/* <div className="stay-panel__topline">
        <span>PLACES TO STAY</span>
        <span className="stay-panel__index">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div> */}

      <HotelOrnament number={String(index + 1).padStart(2, '0')} />

      <p className="stay-panel__area">{hotel.area}</p>
      <h3 className="stay-panel__name">{hotel.name}</h3>

      <div className="stay-panel__details">
        {hotel.recommendedStay && (
          <div className="stay-panel__detail">
            <span>RECOMMENDED STAY</span>
            <strong>{hotel.recommendedStay}</strong>
          </div>
        )}

        {hotel.guestRate && (
          <div className="stay-panel__detail">
            <span>WEDDING GUEST RATE</span>
            <strong>{hotel.guestRate}</strong>
          </div>
        )}

        {hotel.parking && (
          <div className="stay-panel__detail">
            <span>PARKING</span>
            <strong>{hotel.parking}</strong>
          </div>
        )}
      </div>

      {hotel.description && (
        <p className="stay-panel__description">{hotel.description}</p>
      )}

      <button
        type="button"
        className={`stay-panel__booking${hasBookingLink ? '' : ' stay-panel__booking--pending'}`}
        disabled={!hasBookingLink}
        onClick={() => {
          if (hotel.bookingUrl) {
            window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer')
          }
        }}
        aria-label={
          hasBookingLink
            ? `Book your stay at ${hotel.name}`
            : `Booking link for ${hotel.name} has not been added yet`
        }
        title={
          hasBookingLink
            ? `Book your stay at ${hotel.name}`
            : 'Add this hotel’s bookingUrl to enable booking'
        }
      >
        <span>BOOK YOUR STAY</span>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 15L15 5M6 5H15V14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  )
}

function findScrollRoot(element) {
  let parent = element?.parentElement

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

function WhereToStay({ hotels = DEFAULT_HOTELS }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const panelRefs = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion || !('IntersectionObserver' in window)) return undefined

    const root = findScrollRoot(section)
    const observers = []
    const contexts = []

    const reveal = (element, animation) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return

          const context = gsap.context(() => animation(), element)
          contexts.push(context)
          observer.disconnect()
        },
        { root, threshold: 0.12 },
      )

      observer.observe(element)
      observers.push(observer)
    }

    reveal(headerRef.current, () => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 15 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          ease: 'power2.out',
        },
      )
    })

    panelRefs.current.forEach((panel) => {
      reveal(panel, () => {
        const ornament = panel.querySelector('.stay-panel__ornament')
        const elements = panel.querySelectorAll(
          '.stay-panel__topline, .stay-panel__area, .stay-panel__name, .stay-panel__details, .stay-panel__description, .stay-panel__booking',
        )

        gsap.timeline()
          .fromTo(
            panel,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: 'power2.out',
            },
          )
          .fromTo(
            ornament,
            { autoAlpha: 0, y: 8, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.62,
              ease: 'power2.out',
            },
            '-=0.3',
          )
          .fromTo(
            elements,
            { autoAlpha: 0, y: 7 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.46,
              stagger: 0.065,
              ease: 'power2.out',
            },
            '-=0.25',
          )
      })
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      contexts.forEach((context) => context.revert())
    }
  }, [hotels])

  if (!hotels?.length) return null

  return (
    <section
      ref={sectionRef}
      className="card-page where-to-stay"
      aria-label="Where to stay"
    >
      <div className="where-to-stay__paper-glow" aria-hidden="true" />

      <div className="where-to-stay__sheet">
        <header ref={headerRef} className="where-to-stay__header">
          <span className="where-to-stay__eyebrow">
            A THOUGHTFUL GUIDE
          </span>

          <h2 className="where-to-stay__title">
            Where to Stay
          </h2>

          <p className="where-to-stay__intro">
            For those joining us from out of town, we've selected
            beautiful places to stay close to the celebration.
          </p>

          <div className="where-to-stay__divider" aria-hidden="true">
            <span />
            <i>✦</i>
            <span />
          </div>
        </header>

        <div className="where-to-stay__hotels">
          {hotels.map((hotel, index) => (
            <HotelPanel
              key={hotel.id || `${hotel.name}-${index}`}
              hotel={hotel}
              index={index}
              panelRef={(element) => {
                panelRefs.current[index] = element
              }}
            />
          ))}
        </div>

        <footer className="where-to-stay__footer">
          <span>WE LOOK FORWARD TO WELCOMING YOU</span>
          <i>✦</i>
        </footer>
      </div>
    </section>
  )
}

export default WhereToStay
