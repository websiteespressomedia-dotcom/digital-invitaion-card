import { useEffect, useMemo, useState } from 'react'
import { CornerFlorals, GinkgoSprig, FloralDivider } from '../Ornaments/Ornaments.jsx'
import './CountDown.css'

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

function getTimeLeft(targetDate) {
  const target = new Date(targetDate).getTime()

  if (!Number.isFinite(target)) return null

  const difference = Math.max(0, target - Date.now())

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    complete: difference === 0,
  }
}

function CountDown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(targetDate))

    update()
    const timerId = window.setInterval(update, 1000)

    return () => window.clearInterval(timerId)
  }, [targetDate])

  const values = useMemo(() => {
    if (!timeLeft) {
      return { days: '--', hours: '--', minutes: '--', seconds: '--' }
    }

    return timeLeft
  }, [timeLeft])

  return (
    <section className="card-page countdown-section" aria-label="Wedding countdown">
      <CornerFlorals />

      <div className="card-arch countdown-section__arch">
        <GinkgoSprig />

        <div className="countdown-section__heading">
          <p className="countdown-section__eyebrow">THE DAY IS GETTING CLOSER</p>
          <h2 className="countdown-section__title">Countdown</h2>
          <p className="countdown-section__subtitle">Every moment brings us closer to forever.</p>
        </div>

        <div className="countdown-clock" aria-live="off">
          {UNITS.map(({ key, label }) => (
            <div className="countdown-clock__unit" key={key}>
              <span className="countdown-clock__number">{String(values[key]).padStart(2, '0')}</span>
              <span className="countdown-clock__label">{label}</span>
            </div>
          ))}
        </div>

        <FloralDivider />

        <p className="countdown-section__message">
          {timeLeft?.complete
            ? 'Today is the day we celebrate together.'
            : 'We cannot wait to celebrate with you.'}
        </p>
      </div>
    </section>
  )
}

export default CountDown