import { useEffect, useRef, useState } from 'react'
import './RSVPForm.css'
import { calendarConfig } from '../../data/addToCalendarConfig'

const INITIAL_FORM = {
  guestName: '',
  email: '',
  attendance: 'yes',
  plusOne: 'no',
  childrenCount: '0',
  message: '',
}

function CherubPattern() {
  const positions = [
    'translate(12 72) rotate(-12)',
    'translate(290 190) rotate(14)',
    'translate(8 390) rotate(-8)',
    'translate(276 565) rotate(12)',
    'translate(125 735) rotate(-6)',
  ]

  return (
    <svg
      className="rsvp-section__artwork"
      viewBox="0 0 390 850"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {positions.map((position, index) => (
        <g
          key={position}
          transform={position}
          className="rsvp-section__cherub"
        >
          <g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
            {/* Wings */}
            <path d="M31 38C12 10 -6 8 2 32C8 48 19 49 31 43C14 42 10 32 9 24" />
            <path d="M39 36C55 6 77 8 68 33C62 48 50 48 39 42C56 40 61 29 61 22" />

            {/* Head and hair */}
            <circle cx="35" cy="25" r="8" />
            <path d="M27 24C28 13 42 12 44 24C40 19 33 19 27 24Z" />

            {/* Body, arm and legs */}
            <path d="M30 35C26 44 27 55 35 60C44 54 45 44 40 35Z" />
            <path d="M29 42L17 52M41 42L53 47" />
            <path d="M33 59L25 69M38 59L46 67" />
            <path d="M24 51Q14 55 11 49M51 46Q60 41 64 47" />
          </g>

          {/* Little floating envelope */}
          <g transform="translate(63 51)" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
            <rect x="0" y="0" width="29" height="20" rx="1" />
            <path d="M1 2L14.5 12L28 2M1 19L10 11M28 19L19 11" />
          </g>

          {index % 2 === 0 && (
            <path
              d="M93 31C111 20 125 25 140 16"
              stroke="currentColor"
              strokeWidth=".8"
              strokeDasharray="2 5"
              opacity=".7"
            />
          )}
        </g>
      ))}
      <g
        fill="currentColor"
        opacity=".5"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="12"
        letterSpacing="2"
      >
        <text x="270" y="115" transform="rotate(-17 270 115)">Digital</text>
        <text x="22" y="305" transform="rotate(-18 22 305)">Yes</text>
        <text x="274" y="460" transform="rotate(-18 274 460)">The</text>
        <text x="34" y="650" transform="rotate(-16 34 650)">Digital</text>
      </g>
    </svg>
  )
}

function OrnateEnvelopeFlap() {
  return (
    <svg
      className="rsvp-envelope__lace"
      viewBox="0 0 320 150"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rsvp-lace-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffefa" />
          <stop offset=".52" stopColor="#f0e7d9" />
          <stop offset="1" stopColor="#fffdf7" />
        </linearGradient>
      </defs>

      <path
        d="M8 8H312V64
           C298 67 299 82 286 85
           C273 88 272 102 259 105
           C246 108 243 120 230 123
           C217 126 211 137 196 138
           C181 140 174 130 160 145
           C146 130 139 140 124 138
           C109 137 103 126 90 123
           C77 120 74 108 61 105
           C48 102 47 88 34 85
           C21 82 22 67 8 64Z"
        fill="url(#rsvp-lace-fill)"
        stroke="#d8c7b0"
        strokeWidth="1.4"
      />

      <path
        d="M18 13H302V62
           C288 69 288 80 276 82
           C264 85 261 98 249 100
           C237 103 233 115 220 117
           C207 120 198 131 185 131
           C174 131 168 123 160 133
           C152 123 146 131 135 131
           C122 131 113 120 100 117
           C87 115 83 103 71 100
           C59 98 56 85 44 82
           C32 80 32 69 18 62Z"
        fill="none"
        stroke="#c8b394"
        strokeWidth=".9"
        opacity=".9"
      />

      <g
        fill="none"
        stroke="#c4ac8c"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".95"
      >
        <path d="M32 19C41 31 40 43 31 52C22 43 23 31 32 19Z" />
        <path d="M32 19C25 30 25 42 31 52M32 19C39 30 39 42 31 52" />
        <path d="M58 18C70 25 75 37 67 48C54 43 51 29 58 18Z" />
        <path d="M58 18C60 31 63 40 67 48" />
        <path d="M288 19C279 31 280 43 289 52C298 43 297 31 288 19Z" />
        <path d="M288 19C295 30 295 42 289 52M288 19C281 30 281 42 289 52" />
        <path d="M262 18C250 25 245 37 253 48C266 43 269 29 262 18Z" />
        <path d="M262 18C260 31 257 40 253 48" />
        <path d="M115 17C125 28 132 31 144 30C139 18 128 13 115 17Z" />
        <path d="M205 17C195 28 188 31 176 30C181 18 192 13 205 17Z" />
        <path d="M145 22C150 11 155 8 160 8C165 8 170 11 175 22C168 20 164 24 160 29C156 24 152 20 145 22Z" />
        <path d="M160 29V48M151 34C154 29 157 27 160 27C163 27 166 29 169 34" />
        <path d="M89 25C94 17 102 16 108 23C103 31 96 33 89 25Z" />
        <path d="M231 25C226 17 218 16 212 23C217 31 224 33 231 25Z" />
      </g>

      <g fill="#d7c4a7" opacity=".9">
        <circle cx="32" cy="57" r="2" />
        <circle cx="67" cy="53" r="2" />
        <circle cx="108" cy="35" r="1.6" />
        <circle cx="160" cy="52" r="2" />
        <circle cx="212" cy="35" r="1.6" />
        <circle cx="253" cy="53" r="2" />
        <circle cx="288" cy="57" r="2" />
      </g>
    </svg>
  )
}


function IronGateLeaf({ side }) {
  return (
    <svg
      className={`rsvp-gate__leaf-art rsvp-gate__leaf-art--${side}`}
      viewBox="0 0 195 520"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#26384a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12H183V505H12Z" />
        <path d="M20 92H175M20 172H175M20 255H175M20 340H175M20 425H175" />
        <path d="M48 20V498M98 20V498M147 20V498" strokeWidth="3.2" />
        <path d="M20 45C55 3 83 35 55 59C35 76 31 50 48 43C61 38 66 54 55 59" strokeWidth="2.5" />
        <path d="M175 45C140 3 112 35 140 59C160 76 164 50 147 43C134 38 129 54 140 59" strokeWidth="2.5" />
        <path d="M48 120C18 91 31 70 52 85C68 96 60 116 48 120C36 123 31 108 41 102" strokeWidth="2.5" />
        <path d="M147 120C177 91 164 70 143 85C127 96 135 116 147 120C159 123 164 108 154 102" strokeWidth="2.5" />
        <path d="M48 205C18 176 31 155 52 170C68 181 60 201 48 205C36 208 31 193 41 187" strokeWidth="2.5" />
        <path d="M147 205C177 176 164 155 143 170C127 181 135 201 147 205C159 208 164 193 154 187" strokeWidth="2.5" />
        <path d="M48 290C18 261 31 240 52 255C68 266 60 286 48 290C36 293 31 278 41 272" strokeWidth="2.5" />
        <path d="M147 290C177 261 164 240 143 255C127 266 135 286 147 290C159 293 164 278 154 272" strokeWidth="2.5" />
        <path d="M48 375C18 346 31 325 52 340C68 351 60 371 48 375C36 378 31 363 41 357" strokeWidth="2.5" />
        <path d="M147 375C177 346 164 325 143 340C127 351 135 371 147 375C159 378 164 363 154 357" strokeWidth="2.5" />
        <path d="M20 465C47 437 70 440 98 466C126 440 149 437 175 465" strokeWidth="2.5" />
        <path d="M98 465C75 482 74 501 98 508C122 501 121 482 98 465Z" strokeWidth="2.5" />
      </g>
      <g fill="#26384a">
        <circle cx="48" cy="92" r="4" />
        <circle cx="98" cy="92" r="4" />
        <circle cx="147" cy="92" r="4" />
        <circle cx="48" cy="172" r="4" />
        <circle cx="98" cy="172" r="4" />
        <circle cx="147" cy="172" r="4" />
        <circle cx="48" cy="255" r="4" />
        <circle cx="98" cy="255" r="4" />
        <circle cx="147" cy="255" r="4" />
        <circle cx="48" cy="340" r="4" />
        <circle cx="98" cy="340" r="4" />
        <circle cx="147" cy="340" r="4" />
        <circle cx="48" cy="425" r="4" />
        <circle cx="98" cy="425" r="4" />
        <circle cx="147" cy="425" r="4" />
      </g>
    </svg>
  )
}

function WelcomeFlowers() {
  return (
    <svg
      className="rsvp-gate__flowers"
      viewBox="0 0 390 190"
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#6f876f" strokeWidth="2" strokeLinecap="round">
        <path d="M195 6C179 42 126 52 76 102M195 6C215 40 271 58 316 105M195 6C194 48 192 86 194 134" />
        <path d="M135 57C108 37 90 45 85 64C107 74 125 68 135 57Z" fill="#dce5d1" />
        <path d="M135 57C111 64 98 84 99 100C123 99 137 83 135 57Z" fill="#e6ead9" />
        <path d="M252 60C276 38 295 47 299 66C277 76 260 70 252 60Z" fill="#dce5d1" />
        <path d="M252 60C276 68 289 88 287 103C264 101 250 85 252 60Z" fill="#e6ead9" />
        <path d="M183 80C164 60 147 68 149 88C166 99 179 94 183 80Z" fill="#e1e8d7" />
        <path d="M208 81C227 59 244 68 242 88C225 99 212 94 208 81Z" fill="#e1e8d7" />
      </g>
      <g stroke="#b18b70" strokeWidth="1.5">
        <path d="M77 99C66 83 66 69 80 62C94 69 95 83 77 99Z" fill="#f6e8d8" />
        <path d="M80 63C97 50 110 59 106 75C96 87 85 83 80 63Z" fill="#fff4e8" />
        <path d="M79 63C61 50 49 59 53 75C63 87 74 83 79 63Z" fill="#f3e2d0" />
        <path d="M315 103C304 87 304 73 318 66C332 73 333 87 315 103Z" fill="#f6e8d8" />
        <path d="M318 67C335 54 348 63 344 79C334 91 323 87 318 67Z" fill="#fff4e8" />
        <path d="M317 67C299 54 287 63 291 79C301 91 312 87 317 67Z" fill="#f3e2d0" />
        <path d="M193 136C180 119 184 105 198 101C211 111 209 126 193 136Z" fill="#f6e8d8" />
        <path d="M197 103C213 90 226 99 221 114C211 126 200 122 197 103Z" fill="#fff4e8" />
        <path d="M195 103C179 90 166 99 171 114C181 126 192 122 195 103Z" fill="#f3e2d0" />
      </g>
      <g fill="#d4ad77">
        <circle cx="79" cy="76" r="4" />
        <circle cx="317" cy="80" r="4" />
        <circle cx="196" cy="116" r="4" />
      </g>
    </svg>
  )
}

function GateTransition({ isGateOpen }) {
  return (
    <div className={`rsvp-gate-scene ${isGateOpen ? 'gate-is-open' : ''}`}>
      <div className="rsvp-gate-scene__stone-wall" />
      <div className="rsvp-gate-scene__arch-outer">
        <div className="rsvp-gate-scene__arch-inner">
          <div className="rsvp-gate-scene__garden">
            <div className="rsvp-gate-scene__garden-light" />
            <div className="rsvp-gate-scene__garden-tree rsvp-gate-scene__garden-tree--left" />
            <div className="rsvp-gate-scene__garden-tree rsvp-gate-scene__garden-tree--right" />
            <div className="rsvp-gate-scene__garden-path" />
          </div>

          <div className="rsvp-gate__gate">
            <div className="rsvp-gate__leaf rsvp-gate__leaf--left">
              <IronGateLeaf side="left" />
            </div>
            <div className="rsvp-gate__leaf rsvp-gate__leaf--right">
              <IronGateLeaf side="right" />
            </div>
          </div>
        </div>
      </div>

      <div className="rsvp-gate-scene__cobblestone" />
      <div className="rsvp-gate-scene__stone-caption">
        <span>THE CELEBRATION AWAITS</span>
        <i>✦</i>
      </div>

      <div className="rsvp-gate-scene__flower-stage">
        <WelcomeFlowers />
      </div>
    </div>
  )
}

function ThankYouPage({
  attendance,
  coupleNames,
  eventDate,
  onAddToCalendar,
  onViewOnMap,
}) {
  return (
    <div className="rsvp-welcome-page" role="status">
      <div className="rsvp-welcome-page__pattern" aria-hidden="true" />
      <div className="rsvp-welcome-page__content">
        <span className="rsvp-welcome-page__ornament">✧</span>

        <p className="rsvp-welcome-page__eyebrow">
          WITH HEARTFELT THANKS
        </p>

        <h2>
          Thank you for your
          <span>gracious response.</span>
        </h2>

        <p className="rsvp-welcome-page__message">
          {attendance === 'yes'
            ? 'We are delighted that you will be celebrating with us.'
            : 'Thank you for letting us know. You will be missed on our special day.'}
        </p>

        <p className="rsvp-welcome-page__story">
          Thank you for being part of our story.
          <span>We look forward to welcoming you on:</span>
        </p>

        <p className="rsvp-welcome-page__date">{eventDate}</p>

        <h3 className="rsvp-welcome-page__names">{coupleNames}</h3>

        <div className="rsvp-welcome-page__actions">
          <button
            type="button"
            className="rsvp-welcome-page__button"
            onClick={onAddToCalendar}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3" y="4.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6.5 2.5V6M13.5 2.5V6M3 8H17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M10 10.5V15M7.5 13H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span>Add to Calendar</span>
          </button>

          <button
            type="button"
            className="rsvp-welcome-page__button"
            onClick={onViewOnMap}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16 8.2C16 12.7 10 18 10 18S4 12.7 4 8.2a6 6 0 1 1 12 0Z" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span>View on Map</span>
          </button>
        </div>

        <p className="rsvp-welcome-page__closing">
          Should your circumstances change, we would be most grateful
          if you could notify us at your earliest convenience.
        </p>
      </div>
    </div>
  )
}

function RSVPForm({
  onSubmit,
  replyBy = 'May 1, 2027',
  coupleNames,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [screen, setScreen] = useState('form')
  const [isGateOpen, setIsGateOpen] = useState(false)
  const transitionTimers = useRef([])

  const displayNames =
    coupleNames ||
    calendarConfig.coupleNames ||
    calendarConfig.title?.replace(/['’]s Wedding.*$/i, '') ||
    'The Happy Couple'

  const eventDateLabel = calendarConfig.dateLabel || 'Your wedding day'
  const venueAddress =
    calendarConfig.venueAddress ||
    calendarConfig.venueName ||
    'Wedding venue'

  const formatCalendarDate = (value) => {
    if (!value) return ''
    // Google Calendar local date-time format, paired with the configured timezone.
    return value.replace(/[-:]/g, '').replace(/\.\d{1,3}$/, '')
  }

  const handleAddToCalendar = () => {
    const startDate = formatCalendarDate(calendarConfig.startDateTime)
    const endDate = formatCalendarDate(calendarConfig.endDateTime)

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: calendarConfig.title || `${displayNames} Wedding`,
      details:
        calendarConfig.description ||
        `We look forward to celebrating with you at ${venueAddress}.`,
      location: venueAddress,
    })

    if (startDate && endDate) {
      params.set('dates', `${startDate}/${endDate}`)
    }
    if (calendarConfig.timeZone) {
      params.set('ctz', calendarConfig.timeZone)
    }

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const handleViewOnMap = () => {
    const mapQuery = encodeURIComponent(venueAddress)
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isSubmitting) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isSubmitting])

  useEffect(() => {
    return () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const plusOneCount =
      formData.attendance === 'yes' && formData.plusOne === 'yes' ? 1 : 0
    const childrenCount =
      formData.attendance === 'yes' ? Number(formData.childrenCount) : 0

    const response = {
      ...formData,
      plusOne: formData.attendance === 'yes' && formData.plusOne === 'yes',
      childrenCount,
      guestCount:
        formData.attendance === 'yes'
          ? 1 + plusOneCount + childrenCount
          : 0,
    }

    try {
      setIsSubmitting(true)

      // Connect this callback to Google Sheets, email, or your backend later.
      if (typeof onSubmit === 'function') {
        await onSubmit(response)
      }

      // Replace the form with a closed gate, then open it before revealing the welcome page.
      setScreen('gate')
      setIsGateOpen(false)

      transitionTimers.current.push(
        window.setTimeout(() => {
          setIsGateOpen(true)
        }, 420),
      )

      transitionTimers.current.push(
        window.setTimeout(() => {
          setScreen('welcome')
        }, 3300),
      )
    } catch (error) {
      console.error('RSVP submission failed:', error)
      setSubmitError(
        'We could not submit your response. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) setIsOpen(false)
  }

  return (
    <section
      className={`rsvp-section ${isOpen ? 'is-open' : ''} rsvp-section--${screen}`}
      aria-label="Wedding RSVP"
    >
      {screen === 'gate' ? (
        <GateTransition isGateOpen={isGateOpen} />
      ) : screen === 'welcome' ? (
        <ThankYouPage
          attendance={formData.attendance}
          coupleNames={displayNames}
          eventDate={eventDateLabel}
          onAddToCalendar={handleAddToCalendar}
          onViewOnMap={handleViewOnMap}
        />
      ) : (
        <>
          <div className="rsvp-section__pearl-edge" aria-hidden="true" />
          <CherubPattern />

          <header className="rsvp-section__header">
            <h2 className="rsvp-section__title">RSVP</h2>

            <p className="rsvp-section__intro">
              Nothing would make us happier than celebrating this day
              surrounded by our favourite people. Please let us know
              whether you'll be able to join us by <br />
              <strong> {replyBy}.</strong>
            </p>
          </header>

          <div className="rsvp-stage">
        <div
          className={`rsvp-envelope ${isOpen ? 'is-open' : ''}`}
          aria-hidden="true"
        >
          <div className="rsvp-envelope__back">
            <div className="rsvp-envelope__back-inner" />
          </div>

          <div className="rsvp-envelope__letter-peek" />
          <div className="rsvp-envelope__left-fold" />
          <div className="rsvp-envelope__right-fold" />
          <div className="rsvp-envelope__bottom-fold" />

          <div className="rsvp-envelope__flap">
            <div className="rsvp-envelope__flap-back" />
            <OrnateEnvelopeFlap />
          </div>
        </div>

        {!isOpen && (
          <button
            type="button"
            className="rsvp-envelope-trigger"
            onClick={() => setIsOpen(true)}
            aria-label="Open the RSVP envelope"
          >
            <span className="rsvp-envelope-trigger__sr">
              Open RSVP envelope
            </span>
          </button>
        )}

        {!isOpen && (
          <p className="rsvp-envelope-hint">
            TAP TO OPEN
          </p>
        )}
      </div>

      <div
        className={`rsvp-form-reveal ${isOpen ? 'is-visible' : ''}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {isOpen && (
          <button
            type="button"
            className="rsvp-form-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close RSVP form"
          >
            CLOSE <span>×</span>
          </button>
        )}

        <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="rsvp-form__heading rsvp-reveal-item">
              <span className="rsvp-form__eyebrow">KINDLY REPLY</span>
              <p className="rsvp-form__welcome">
                We look forward to celebrating with you.
              </p>
            </div>

            <label className="rsvp-field rsvp-reveal-item">
              <span>YOUR NAME</span>
              <input
                type="text"
                name="guestName"
                autoComplete="name"
                placeholder="Your full name"
                value={formData.guestName}
                onChange={(event) =>
                  updateField('guestName', event.target.value)
                }
                required
              />
            </label>

            <fieldset className="rsvp-choice-group rsvp-reveal-item">
              <legend>WILL YOU BE ATTENDING?</legend>

              <label className="rsvp-choice">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={() => updateField('attendance', 'yes')}
                />
                <span className="rsvp-choice__dot" />
                <span>Joyfully accepts</span>
              </label>

              <label className="rsvp-choice">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={() => updateField('attendance', 'no')}
                />
                <span className="rsvp-choice__dot" />
                <span>Regretfully declines</span>
              </label>
            </fieldset>

            {formData.attendance === 'yes' && (
              <>
                <fieldset className="rsvp-choice-group rsvp-reveal-item">
                  <legend>WILL YOU BE BRINGING A +1?</legend>

                  <label className="rsvp-choice">
                    <input
                      type="radio"
                      name="plusOne"
                      value="yes"
                      checked={formData.plusOne === 'yes'}
                      onChange={() => updateField('plusOne', 'yes')}
                    />
                    <span className="rsvp-choice__dot" />
                    <span>Yes, with pleasure</span>
                  </label>

                  <label className="rsvp-choice">
                    <input
                      type="radio"
                      name="plusOne"
                      value="no"
                      checked={formData.plusOne === 'no'}
                      onChange={() => updateField('plusOne', 'no')}
                    />
                    <span className="rsvp-choice__dot" />
                    <span>Just me</span>
                  </label>
                </fieldset>

                <label className="rsvp-field rsvp-reveal-item">
                  <span>CHILDREN</span>
                  <select
                    name="childrenCount"
                    value={formData.childrenCount}
                    onChange={(event) =>
                      updateField('childrenCount', event.target.value)
                    }
                  >
                    <option value="0">No children</option>
                    <option value="1">1 child</option>
                    <option value="2">2 children</option>
                    <option value="3">3 children</option>
                    <option value="4">4 children</option>
                  </select>
                </label>
              </>
            )}

            <label className="rsvp-field rsvp-reveal-item">
              <span>A NOTE FOR US <i>(OPTIONAL)</i></span>
              <textarea
                name="message"
                rows="2"
                placeholder="Dietary needs or a little message..."
                value={formData.message}
                onChange={(event) =>
                  updateField('message', event.target.value)
                }
              />
            </label>

            {submitError && (
              <p className="rsvp-form__error" role="alert">
                {submitError}
              </p>
            )}

            <button
              className="rsvp-submit rsvp-reveal-item"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING YOUR REPLY…' : 'SEND YOUR RSVP'}
              <span aria-hidden="true">✦</span>
            </button>

            <p className="rsvp-form__footer rsvp-reveal-item">
              WITH LOVE & WARMEST WISHES
            </p>
          </form>
        </div>
        </>
      )}
    </section>
  )
}

export default RSVPForm
