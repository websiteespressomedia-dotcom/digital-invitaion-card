import { useState } from 'react'
import {
  CornerFlorals,
  GinkgoSprig,
  FloralDivider,
} from '../Ornaments/Ornaments.jsx'
import './Location.css'

// Replace this with the Google Maps share link for the venue.
// You can also pass mapsUrl as a prop from App.jsx.
const DEFAULT_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Villa+Aurelia+Rome+Italy'

function VillaIllustration() {
  return (
    <svg
      className="location__villa-illustration"
      viewBox="0 0 360 230"
      role="img"
      aria-label="Illustration of an elegant villa surrounded by gardens"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="villaFacade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8f1e7" />
          <stop offset="1" stopColor="#dfd0bd" />
        </linearGradient>
        <linearGradient id="villaRoof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8b6a1" />
          <stop offset="1" stopColor="#a9957f" />
        </linearGradient>
      </defs>

      {/* Soft garden wash */}
      <ellipse cx="180" cy="204" rx="154" ry="15" fill="#a9b2a0" opacity=".2" />
      <path d="M24 194C70 180 104 190 146 187C205 182 269 185 337 194" fill="none" stroke="#a3ad98" strokeWidth="2" opacity=".6" />

      {/* Left garden trees */}
      <g fill="#aab59f" opacity=".48">
        <circle cx="42" cy="113" r="22" />
        <circle cx="56" cy="91" r="18" />
        <circle cx="34" cy="84" r="15" />
        <circle cx="66" cy="126" r="18" />
        <circle cx="314" cy="105" r="23" />
        <circle cx="300" cy="83" r="17" />
        <circle cx="326" cy="79" r="16" />
        <circle cx="292" cy="126" r="18" />
      </g>
      <g stroke="#87947f" strokeWidth="2" fill="none" opacity=".65">
        <path d="M47 123L45 187M314 115L316 187" />
        <path d="M45 145L30 132M47 151L63 136M315 144L299 130M315 151L333 135" />
      </g>

      {/* Villa roof and facade */}
      <path d="M82 75L180 39L278 75Z" fill="url(#villaRoof)" stroke="#a8947d" strokeWidth="1.4" />
      <path d="M91 74H269V183H91Z" fill="url(#villaFacade)" stroke="#b7a38c" strokeWidth="1.4" />
      <path d="M82 75H278V83H82Z" fill="#d9c9b6" stroke="#b7a38c" strokeWidth="1" />
      <path d="M87 87H273M87 132H273" stroke="#c4b09a" strokeWidth="1.2" />
      <path d="M91 183H269" stroke="#9f8b74" strokeWidth="2" />

      {/* Roof details */}
      <path d="M110 69V57H126V63M234 63V57H250V69" fill="none" stroke="#a18d77" strokeWidth="1.4" />
      <path d="M168 50V39H192V50" fill="none" stroke="#a18d77" strokeWidth="1.2" />
      <circle cx="180" cy="33" r="4" fill="#b69d7d" />

      {/* Windows: three floors */}
      <g fill="#c2c4bd" stroke="#ad9a83" strokeWidth="1.2">
        {[
          [108, 91], [145, 91], [182, 91], [219, 91], [256, 91],
          [108, 139], [145, 139], [182, 139], [219, 139], [256, 139],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="17" height="25" rx="1" />
        ))}
      </g>
      <g stroke="#f5eee4" strokeWidth="1">
        {[
          [108, 91], [145, 91], [182, 91], [219, 91], [256, 91],
          [108, 139], [145, 139], [182, 139], [219, 139], [256, 139],
        ].map(([x, y]) => (
          <path key={`${x}-${y}-cross`} d={`M${x + 8.5} ${y}V${y + 25}M${x} ${y + 12.5}H${x + 17}`} />
        ))}
      </g>

      {/* Main entrance and steps */}
      <path d="M160 183V148Q180 126 200 148V183Z" fill="#b59f85" stroke="#9d876f" strokeWidth="1.2" />
      <path d="M166 183V151Q180 137 194 151V183Z" fill="#d8c8b5" stroke="#a58f77" strokeWidth="1" />
      <path d="M153 184H207L214 191H146Z" fill="#d3c2ad" stroke="#aa977f" strokeWidth="1" />
      <path d="M142 192H218L226 199H134Z" fill="#e1d4c5" stroke="#b5a48e" strokeWidth="1" />
      <path d="M128 200H232" stroke="#a7a18e" strokeWidth="1.5" />

      {/* Garden hedges and flowers */}
      <g fill="#9eaa91" opacity=".68">
        <path d="M72 182Q86 161 105 182Z" />
        <path d="M255 182Q275 158 290 182Z" />
        <path d="M52 190Q68 174 83 190Z" />
        <path d="M277 190Q293 174 308 190Z" />
      </g>
      <g fill="#c6a6a0" opacity=".75">
        <circle cx="63" cy="177" r="2.5" />
        <circle cx="75" cy="173" r="2" />
        <circle cx="292" cy="175" r="2.5" />
        <circle cx="303" cy="180" r="2" />
      </g>
    </svg>
  )
}

function Location({
  venueName = 'Villa Aurelia',
  city = 'ROME, ITALY',
  description = "Set in one of Rome's most beautiful corners, Villa Aurelia will be the setting for our celebration, surrounded by historic gardens and overlooking the Eternal City.",
  arrivalNote = 'We recommend arriving a little early to settle in and enjoy the surroundings before the celebration begins.',
  venueImage = '',
  mapsUrl = DEFAULT_MAPS_URL,
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(venueImage) && !imageFailed

  return (
    <section className="card-page location-section" aria-label="Wedding location">
      <CornerFlorals />

      <div className="location-section__content">
        <div className="location-section__crest" aria-hidden="true">
          <GinkgoSprig />
        </div>

        <p className="location-section__eyebrow">THE PLACE</p>
        <h2 className="location-section__title">Location</h2>

        <p className="location-section__venue">{venueName}</p>
        <p className="location-section__city">{city}</p>

        <div className="location-section__copy">
          <p>{description}</p>
          <p>{arrivalNote}</p>
        </div>

        <div className="location-section__image-wrap">
          {showImage ? (
            <img
              className="location-section__venue-image"
              src={venueImage}
              alt={`${venueName} venue`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <VillaIllustration />
          )}
        </div>

        <a
          className="location-section__directions"
          href={mapsUrl || DEFAULT_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${venueName}`}
        >
          <span>GET DIRECTIONS</span>
          <span className="location-section__arrow" aria-hidden="true">↗</span>
        </a>

        <div className="location-section__divider" aria-hidden="true">
          <FloralDivider />
        </div>

        <p className="location-section__footer">
          WE LOOK FORWARD TO WELCOMING YOU
        </p>
      </div>
    </section>
  )
}

export default Location
