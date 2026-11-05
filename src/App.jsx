import Envelope from './components/Envelope/Envelope.jsx'
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
          <div className="invitation-page">
            <header className="page-heading">
              <span className="page-heading__eyebrow">A SPECIAL DELIVERY</span>
              <p className="page-heading__title">An invitation awaits</p>
            </header>

            <Envelope />

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
