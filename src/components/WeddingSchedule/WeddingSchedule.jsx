import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './WeddingSchedule.css'

const DEFAULT_EVENTS = [
  {
    time: '04:30',
    period: 'PM',
    title: 'Welcome',
    description: 'A warm welcome and refreshing drinks in the garden.',
  },
  {
    time: '05:00',
    period: 'PM',
    title: 'Wedding Ceremony',
    description: 'Join us as we begin our forever together.',
  },
  {
    time: '06:00',
    period: 'PM',
    title: 'Cocktail Hour',
    description: 'Good conversations and beautiful moments on the terrace.',
  },
  {
    time: '08:00',
    period: 'PM',
    title: 'Dinner',
    description: 'An evening of delicious food and celebration.',
  },
  {
    time: '10:30',
    period: 'PM',
    title: 'Dancing',
    description: 'Let the music play. Celebrate with us into the night.',
  },
]

function ScheduleOrnament() {
  return (
    <svg
      className="schedule-ornament"
      viewBox="0 0 120 42"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 21H40M80 21H116" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <path d="M60 5C49 12 49 28 60 37C71 28 71 12 60 5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 12C51 13 47 22 46 28C55 27 60 22 60 12Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" />
      <path d="M60 12C69 13 73 22 74 28C65 27 60 22 60 12Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" />
      <circle cx="60" cy="21" r="2" fill="currentColor" />
    </svg>
  )
}

function WeddingSchedule({
  events = DEFAULT_EVENTS,
  heading = 'A day to remember',
  subtitle = 'A little timeline of the moments we will share.',
}) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const itemsRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const header = headerRef.current
    const timeline = timelineRef.current
    const items = itemsRef.current?.querySelectorAll('[data-schedule-item]') ?? []
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      gsap.set([header, timeline, ...items], {
        autoAlpha: 1,
        clearProps: 'transform',
      })
      return undefined
    }

    const playEntrance = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      const context = gsap.context(() => {
        const animation = gsap.timeline()

        animation
          .fromTo(
            header,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: 'power2.out',
            },
          )
          .fromTo(
            timeline,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              duration: 1.1,
              ease: 'power2.inOut',
            },
            '-=0.28',
          )
          .fromTo(
            items,
            { autoAlpha: 0, y: 22, x: 10 },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              duration: 0.72,
              stagger: 0.16,
              ease: 'power2.out',
              clearProps: 'transform',
            },
            '-=0.5',
          )
      }, section)

      return context
    }

    // The invitation scrolls inside .invitation-page on desktop and mobile.
    // Use that element as the observer root so the animation triggers correctly.
    const scrollRoot = section.closest('.invitation-page')
    let animationContext

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
          animationContext = playEntrance()
          observer.disconnect()
        }
      },
      {
        root: scrollRoot || null,
        threshold: [0.22, 0.4],
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
      className="wedding-schedule"
      aria-labelledby="wedding-schedule-title"
    >
      <div className="wedding-schedule__inner">
        <header ref={headerRef} className="wedding-schedule__header">
          <span className="wedding-schedule__eyebrow">
            THE CELEBRATION
          </span>

          <h2
            id="wedding-schedule-title"
            className="wedding-schedule__title"
          >
            {heading}
          </h2>

          <p className="wedding-schedule__subtitle">{subtitle}</p>
          <ScheduleOrnament />
        </header>

        <div
          ref={itemsRef}
          className="wedding-schedule__list"
          aria-label="Wedding day itinerary"
        >
          <span
            ref={timelineRef}
            className="wedding-schedule__timeline"
            aria-hidden="true"
          />

          {events.map((event, index) => (
            <article
              className="wedding-event"
              data-schedule-item
              key={`${event.time}-${event.title}`}
            >
              <div className="wedding-event__time">
                <span>{event.time}</span>
                <small>{event.period}</small>
                <span className="wedding-event__node" aria-hidden="true" />
              </div>

              <div className="wedding-event__card">
                <span className="wedding-event__number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="wedding-event__copy">
                  <h3 className="wedding-event__title">{event.title}</h3>
                  <p className="wedding-event__description">
                    {event.description}
                  </p>
                </div>

                <span className="wedding-event__sparkle" aria-hidden="true">
                  ✦
                </span>
              </div>
            </article>
          ))}
        </div>

        <footer className="wedding-schedule__footer">
          <ScheduleOrnament />
          <p>WE CAN'T WAIT TO CELEBRATE WITH YOU</p>
        </footer>
      </div>
    </section>
  )
}

export default WeddingSchedule
