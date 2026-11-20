import { useEffect, useRef, useState } from 'react'
import Envelope from './components/Envelope/Envelope.jsx'
import CountDown from './components/CountDown/CountDown.jsx'
import AddToCalendar from "./components/AddToCalendar/AddToCalendar";
import ScratchSection from './components/ScratchSection/ScratchSection.jsx'
import PhotoGallery from './components/PhotoGallery/PhotoGallery.jsx'
import Location from './components/Location/Location.jsx'
import WeddingSchedule from './components/WeddingSchedule/WeddingSchedule.jsx'
import DressCode from './components/DressCode/DressCode.jsx'
import Transportation from './components/Transportation/Transportation.jsx'
import WhereToStay from './components/WhereToStay/WhereToStay.jsx'
import WeddingGift from "./components/WeddingGift/WeddingGift";
import RSVPForm from "./components/RSVPForm/RSVPForm.jsx";
import ClosingSection from "./components/ClosingSection/ClosingSection.jsx";

import { invitationConfig } from './data/invitationConfig.js'
import './App.css'

function BotanicalSprig({ className = '' }) {
  return (
    <svg className={`botanical-sprig ${className}`} viewBox="0 0 240 300" fill="none" aria-hidden="true">
      <path d="M18 280C74 226 88 163 116 103C139 54 177 26 222 12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M73 221C34 217 19 193 20 166C49 166 73 184 73 221Z" fill="currentColor" fillOpacity=".10" stroke="currentColor" />
      <path d="M92 180C57 162 53 132 65 108C91 122 104 148 92 180Z" fill="currentColor" fillOpacity=".10" stroke="currentColor" />
      <path d="M117 126C91 97 99 68 119 50C139 74 140 103 117 126Z" fill="currentColor" fillOpacity=".10" stroke="currentColor" />
      <path d="M143 82C143 48 166 29 192 29C193 59 174 81 143 82Z" fill="currentColor" fillOpacity=".10" stroke="currentColor" />
      <path d="M50 247C48 218 65 199 91 194C97 222 80 244 50 247Z" fill="currentColor" fillOpacity=".10" stroke="currentColor" />
      <circle cx="116" cy="103" r="5" fill="currentColor" fillOpacity=".4" />
      <circle cx="174" cy="48" r="4" fill="currentColor" fillOpacity=".4" />
    </svg>
  )
}

function App() {
  const [invitationOpened, setInvitationOpened] = useState(false)
  const [musicControlVisible, setMusicControlVisible] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [isMusicMuted, setIsMusicMuted] = useState(false)
  const [musicError, setMusicError] = useState(false)

  const musicRef = useRef(null)
  const fadeFrameRef = useRef(null)
  const musicStartAttemptedRef = useRef(false)

  // The audio element stays mounted for the whole invitation, so scrolling
  // between sections never restarts the soundtrack.
  const startBackgroundMusic = () => {
    const audio = musicRef.current
    setMusicControlVisible(true)

    if (!audio || musicStartAttemptedRef.current) return

    musicStartAttemptedRef.current = true
    audio.muted = false
    audio.volume = 0

    // This is called directly from the envelope tap, preserving the browser's
    // user-gesture permission for audio playback.
    const playRequest = audio.play()

    if (playRequest && typeof playRequest.then === 'function') {
      playRequest
        .then(() => {
          setMusicStarted(true)
          setIsMusicMuted(false)
          setMusicError(false)

          // Gentle 1.6-second fade-in; playback then loops continuously.
          const fadeStartedAt = performance.now()
          const targetVolume = 0.28

          const fadeIn = (now) => {
            if (!musicRef.current || musicRef.current.paused) return

            const progress = Math.min((now - fadeStartedAt) / 1600, 1)
            musicRef.current.volume = targetVolume * progress

            if (progress < 1) {
              fadeFrameRef.current = window.requestAnimationFrame(fadeIn)
            } else {
              fadeFrameRef.current = null
            }
          }

          fadeFrameRef.current = window.requestAnimationFrame(fadeIn)
        })
        .catch((error) => {
          console.warn('Background music could not start:', error)
          musicStartAttemptedRef.current = false
          setMusicStarted(false)
          setMusicError(true)
        })
    } else {
      setMusicStarted(true)
      setMusicError(false)
    }
  }

  const toggleBackgroundMusic = () => {
    const audio = musicRef.current
    if (!audio) return

    setMusicControlVisible(true)

    // If the first attempt was blocked or the file was still loading,
    // the visible control gives the guest another direct play gesture.
    if (audio.paused) {
      audio.muted = false
      audio.volume = 0.28

      audio.play()
        .then(() => {
          setMusicStarted(true)
          setIsMusicMuted(false)
          setMusicError(false)
          musicStartAttemptedRef.current = true
        })
        .catch((error) => {
          console.warn('Background music could not start:', error)
          setMusicError(true)
        })

      return
    }

    audio.muted = !audio.muted
    setIsMusicMuted(audio.muted)
  }

  useEffect(() => {
    return () => {
      if (fadeFrameRef.current !== null) {
        window.cancelAnimationFrame(fadeFrameRef.current)
      }
      if (musicRef.current) {
        musicRef.current.pause()
      }
    }
  }, [])

  return (
    <main className="experience-stage">
      <div className="ambient-glow" aria-hidden="true" />
      <BotanicalSprig className="botanical-sprig--left" />
      <BotanicalSprig className="botanical-sprig--right" />

      <div className="desktop-caption" aria-hidden="true">
        <span>AN INVITATION TO CELEBRATE</span>
        <span className="desktop-caption__ornament">✦</span>
        <span>MADE WITH LOVE</span>
      </div>

      <div className="phone-shell" aria-label="Mobile invitation preview">
        <div className="phone-screen">
          <audio
            ref={musicRef}
            src="/music/background-music1.mp3"
            loop
            preload="auto"
            onError={() => setMusicError(true)}
            aria-hidden="true"
          />

          <div className="phone-status" aria-hidden="true">
            <span>9:41</span>
            <span className="phone-status__symbols">● ▰ ▴</span>
          </div>

          <div className={`invitation-page ${invitationOpened ? 'invitation-page--opened' : ''}`}>
            <header className="page-heading">
              <span className="page-heading__eyebrow">A SPECIAL DELIVERY</span>
              <p className="page-heading__title">An invitation awaits</p>
            </header>

            {/* Change section order here whenever you want to rearrange the invitation. */}
            <Envelope
              onOpen={startBackgroundMusic}
              groom={invitationConfig.groom}
              bride={invitationConfig.bride}
              weddingYear={invitationConfig.weddingYearLabel}
              onComplete={() => setInvitationOpened(true)}
            />

            {invitationOpened && (
              <>
                <CountDown targetDate={invitationConfig.weddingDate} />
                {/* <AddToCalendar />   */}
                <ScratchSection
                  imageSrc={invitationConfig.scratchImageUrl}
                  imageAlt="A special wedding memory"
                />
                <PhotoGallery />
                <Location
                  venueName="Villa Aurelia"
                  city="ROME, ITALY"
                />
                <WeddingSchedule />
                <DressCode />
                <Transportation />
                <WhereToStay />
                {/* <WeddingGift /> */}
                <RSVPForm />
                <ClosingSection
                  brideName="Salman Khan"
                  groomName="Aishwariya Rai"
                  weddingDate="20 May 2027"
                />
              </>
            )}

            <footer className="page-footer">
              MADE WITH LOVE <span aria-hidden="true">✦</span>
            </footer>
          </div>

          {musicControlVisible && (
            <button
              type="button"
              className={`music-toggle ${isMusicMuted || !musicStarted ? 'is-muted' : 'is-playing'}`}
              onClick={toggleBackgroundMusic}
              aria-label={
                isMusicMuted || !musicStarted
                  ? 'Play or unmute background music'
                  : 'Mute background music'
              }
              aria-pressed={musicStarted && !isMusicMuted}
              title={
                musicError
                  ? 'Music could not load. Check public/music/background-music1.mp3.'
                  : isMusicMuted
                    ? 'Unmute background music'
                    : 'Mute background music'
              }
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 9.5V14.5H8L13 18V6L8 9.5H4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {isMusicMuted || !musicStarted ? (
                  <path
                    d="M17 9L21 15M21 9L17 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      d="M16 9C17.7 10.7 17.7 13.3 16 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.5 6.5C21.8 9.8 21.8 14.2 18.5 17.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          )}

          <div className="phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </main>
  )
}

export default App