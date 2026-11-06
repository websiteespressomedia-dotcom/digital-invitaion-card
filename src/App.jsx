import { useState } from 'react'
import Envelope from './components/Envelope/Envelope.jsx'
import CountDown from './components/CountDown/CountDown.jsx'
import ScratchSection from './components/ScratchSection/ScratchSection.jsx'
import Location from './components/Location/Location.jsx'
import WeddingSchedule from './components/WeddingSchedule/WeddingSchedule.jsx'
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
              groom={invitationConfig.groom}
              bride={invitationConfig.bride}
              weddingYear={invitationConfig.weddingYearLabel}
              onComplete={() => setInvitationOpened(true)}
            />

            {invitationOpened && (
              <>
                <CountDown targetDate={invitationConfig.weddingDate} />
                <ScratchSection
                  imageSrc={invitationConfig.scratchImageUrl}
                  imageAlt="A special wedding memory"
                />
                <Location
                  venueName="Villa Aurelia"
                  city="ROME, ITALY"
                  mapsUrl="https://www.google.com/maps/place/%E0%A4%85%E0%A4%AE%E0%A5%8D%E0%A4%AC%E0%A4%BE%E0%A4%A8%E0%A5%80+%E0%A4%B9%E0%A4%BE%E0%A4%89%E0%A4%B8,+Antilia,+ANTILIA+APARTMENT,+SK+Barodawala+Marg,+near+Ashish+Parmar,+Tardeo,+Mumbai,+Maharashtra+400026/@18.9680259,72.8069214,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7ce740c73d241:0x2f342887d5ce589f!8m2!3d18.9680208!4d72.8094963!16s%2Fg%2F1q69sdkfd?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D"
                />
                <WeddingSchedule />
              </>
            )}

            <footer className="page-footer">
              MADE WITH LOVE <span aria-hidden="true">✦</span>
            </footer>
          </div>

          <div className="phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </main>
  )
}

export default App