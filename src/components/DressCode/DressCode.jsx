import { useEffect, useRef } from 'react'
import { CoupleOnStairs } from './DressIllustrations.jsx'
import { Staircase } from './DressStairs.jsx'
import { dressCodes as defaultCodes } from '../../data/dressCodeConfig.js'
import './DressCode.css'

function getOutfitSummary(items = []) {
  const outfit = items.find(
    ([label]) => label.toLowerCase() === 'outfit',
  )

  return outfit?.[1] || items[0]?.[1] || ''
}

function CoupleArtwork({ code, reverse }) {
  if (code.image) {
    return (
      <img
        className="dresscode__couple-img"
        src={code.image}
        alt={`${code.label} outfits for both guests`}
        draggable="false"
      />
    )
  }

  return (
    <CoupleOnStairs
      look={code.look}
      reverse={reverse}
      className="dresscode__couple-art"
    />
  )
}

function DressCode({ codes = defaultCodes }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const scenes = Array.from(
      section.querySelectorAll('.dresscode__scene'),
    )

    if (!('IntersectionObserver' in window)) {
      scenes.forEach((scene) => scene.classList.add('is-visible'))
      return undefined
    }

    const scrollRoot =
      section.closest('.invitation-page--opened') ||
      section.closest('.invitation-page') ||
      null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: scrollRoot,
        threshold: 0.12,
      },
    )

    scenes.forEach((scene) => observer.observe(scene))

    return () => observer.disconnect()
  }, [codes])

  if (!codes?.length) return null

  return (
    <section
      ref={sectionRef}
      className="card-page dresscode"
      aria-label="Wedding dress code"
    >
      <header className="dresscode__header">
        <span className="dresscode__eyebrow">
          A GUIDE FOR THE CELEBRATIONS
        </span>

        <h2 className="dresscode__main-title">
          The Dress Code
        </h2>

        <p className="dresscode__intro">
          A thoughtful look for every occasion
        </p>
      </header>

      <div className="dresscode__story">
        {codes.map((code, index) => {
          const isRight = index % 2 === 1
          const herOutfit = getOutfitSummary(code.women)
          const himOutfit = getOutfitSummary(code.men)

          return (
            <article
              key={code.id || `${code.label}-${index}`}
              className={`dresscode__scene ${
                isRight
                  ? 'dresscode__scene--right'
                  : 'dresscode__scene--left'
              }`}
              aria-label={`${code.label} dress code`}
            >
              <div className="dresscode__wall-arch" aria-hidden="true" />

              <div className="dresscode__copy">
                <span className="dresscode__event-index">
                  CELEBRATION
                  <i />
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="dresscode__event-title">
                  {code.label}
                </h3>

                {code.title && (
                  <p className="dresscode__event-subtitle">
                    {code.title}
                  </p>
                )}

                <div className="dresscode__outfit-summary">
                  {herOutfit && (
                    <p>
                      <strong>Her:</strong> {herOutfit}
                    </p>
                  )}

                  {himOutfit && (
                    <p>
                      <strong>Him:</strong> {himOutfit}
                    </p>
                  )}
                </div>
              </div>

              <div className="dresscode__people">
                <span className="dresscode__people-glow" />
                <CoupleArtwork code={code} reverse={isRight} />
              </div>

              {/* The staircase is deliberately behind the people. */}
              <Staircase reverse={isRight} index={index} className="dresscode__staircase" />

              <span className="dresscode__scene-caption">
                {String(index + 1).padStart(2, '0')}
                {' · '}
                {code.label.toUpperCase()}
              </span>
            </article>
          )
        })}
      </div>

      <footer className="dresscode__footer">
        <span>✦</span>
        DRESS UP · CELEBRATE · MAKE MEMORIES
        <span>✦</span>
      </footer>
    </section>
  )
}

export default DressCode