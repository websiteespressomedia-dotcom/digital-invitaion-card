import { useEffect, useRef, useState } from 'react'
import './ClosingSection.css'

function WaxSealBadge({ monogram = 'B & G' }) {
  return (
    <div className="closing-seal" role="img" aria-label={`Wedding wax seal ${monogram}`}>
      <svg
        className="closing-seal__art"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="closing-wax-fill" cx="34%" cy="25%" r="78%">
            <stop offset="0%" stopColor="#fffdf5" />
            <stop offset="34%" stopColor="#f0e5d2" />
            <stop offset="72%" stopColor="#d4bea0" />
            <stop offset="100%" stopColor="#f7eedf" />
          </radialGradient>
          <linearGradient id="closing-wax-edge" x1="18" y1="15" x2="103" y2="110">
            <stop stopColor="#fffdf7" />
            <stop offset=".48" stopColor="#c7ad89" />
            <stop offset="1" stopColor="#fff8eb" />
          </linearGradient>
          <filter id="closing-wax-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.1" />
            <feOffset dy="2" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M60 5
             C66 8 70 5 75 9
             C80 13 85 12 88 18
             C94 21 96 26 96 32
             C102 37 102 43 100 49
             C105 55 104 62 100 67
             C103 74 100 80 94 84
             C94 91 88 96 82 97
             C78 104 72 105 66 103
             C60 109 53 108 48 103
             C41 106 35 103 32 97
             C25 96 21 91 21 84
             C14 80 13 73 17 67
             C12 61 14 54 19 49
             C16 42 19 36 25 32
             C25 25 30 20 37 19
             C40 12 46 10 52 12
             C55 7 58 6 60 5Z"
          fill="url(#closing-wax-fill)"
          stroke="url(#closing-wax-edge)"
          strokeWidth="2.2"
          filter="url(#closing-wax-shadow)"
        />

        <path
          d="M31 39C37 24 48 18 61 19C76 20 87 32 89 46"
          stroke="#fffaf0"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity=".9"
        />
        <path
          d="M35 78C43 88 54 92 66 89"
          stroke="#b69a75"
          strokeWidth=".9"
          strokeLinecap="round"
          opacity=".48"
        />
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fill="#a58a68"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={monogram.length > 5 ? '15' : '20'}
          letterSpacing=".35"
        >
          {monogram}
        </text>
        <path d="M28 37C32 29 39 23 47 21M92 77C87 86 80 91 71 93" stroke="#fffdf6" strokeWidth="1.5" strokeLinecap="round" opacity=".72" />
      </svg>
    </div>
  )
}

function TopFloralOrnament() {
  return (
    <svg
      className="closing-section__floral"
      viewBox="0 0 390 116"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 95C44 89 57 52 93 45C120 40 140 62 166 61C181 60 188 47 195 31C202 47 209 60 224 61C250 62 270 40 297 45C333 52 346 89 390 95" />
        <path d="M195 31C184 21 184 11 195 5C206 11 206 21 195 31Z" />
        <path d="M195 31C178 26 168 31 164 45C178 49 190 42 195 31Z" />
        <path d="M195 31C212 26 222 31 226 45C212 49 200 42 195 31Z" />
        <path d="M195 31V76" />
        <path d="M92 45C78 28 65 31 61 45C74 54 86 53 92 45Z" />
        <path d="M95 46C107 23 123 25 128 39C117 53 103 55 95 46Z" />
        <path d="M298 45C312 28 325 31 329 45C316 54 304 53 298 45Z" />
        <path d="M295 46C283 23 267 25 262 39C273 53 287 55 295 46Z" />
        <path d="M145 57C135 42 124 43 120 55C130 64 140 64 145 57Z" />
        <path d="M245 57C255 42 266 43 270 55C260 64 250 64 245 57Z" />
        <path d="M35 82C41 68 53 65 62 74C55 87 44 90 35 82Z" />
        <path d="M355 82C349 68 337 65 328 74C335 87 346 90 355 82Z" />
      </g>
      <g fill="currentColor" opacity=".65">
        <circle cx="91" cy="45" r="2" />
        <circle cx="299" cy="45" r="2" />
        <circle cx="145" cy="57" r="1.7" />
        <circle cx="245" cy="57" r="1.7" />
      </g>
    </svg>
  )
}

function ClosingSection({
  brideName = 'Bride Name',
  groomName = 'Groom Name',
  weddingDate = 'Wedding Date',
  monogram,
  credit = 'The Digital Yes',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const initials =
    monogram ||
    `${brideName?.trim()?.charAt(0) || 'B'} & ${groomName?.trim()?.charAt(0) || 'G'}`

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`card-page closing-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Wedding closing message"
    >
      <div className="closing-section__top">
        <TopFloralOrnament />
      </div>

      <div className="closing-section__watermarks" aria-hidden="true">
        <span className="watermark watermark--one">The</span>
        <span className="watermark watermark--two">Digital</span>
        <span className="watermark watermark--three">Yes</span>
      </div>

      <div className="closing-section__content">
        <div className="closing-section__badge-wrap">
          <WaxSealBadge monogram={initials} />
        </div>

        <p className="closing-section__message">
          We can't wait to celebrate with you.
        </p>

        <div className="closing-section__signature">
          <span className="closing-section__with-love">With love,</span>

          <h2 className="closing-section__names">
            <span>{brideName}</span>
            <span className="closing-section__ampersand">&</span>
            <span>{groomName}</span>
          </h2>
        </div>

        <p className="closing-section__date">
          {weddingDate}
        </p>
      </div>

      <footer className="closing-section__footer">
        <span>Designed & Developed by </span>
        <strong><a href="https://espressomedia.in/" target="_blank" rel="noopener noreferrer">The Espresso Media</a></strong>
      </footer>
    </section>
  )
}

export default ClosingSection
