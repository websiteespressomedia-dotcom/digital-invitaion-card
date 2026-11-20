import { useId } from 'react'

/*
  Soft, storybook-style (Ghibli-inspired) couple illustrations drawn in SVG.
  Big warm eyes, painted gradients, flowing clothes. Each "look" re-colours the
  same couple for Mehndi, Haldi and Wedding.
  To use your own PNG instead, set `image` for that dress code in
  src/data/dressCodeConfig.js – the SVG is then skipped.
*/

const SKIN = '#f6d9bf'

const LOOKS = {
  mehndi: {
    man: { kurta: '#f6eedc', jacket: '#7fa06c', pants: '#f3ead6', stole: '#e2b341', shoe: '#b98a55', trim: '#c9a24f', hair: '#3b2a21' },
    woman: { blouse: '#e6bb4e', skirt: '#78a56c', dupatta: '#efe08a', shoe: '#c9a24f', trim: '#dcb65f', hair: '#2f2019', necklace: 'gold' },
    scene: { skyTop: '#dcebd0', skyBottom: '#f8f3df', hill1: '#bcd5a3', hill2: '#9dc088', petal: '#86ac66' },
  },
  haldi: {
    man: { kurta: '#f6cf5c', pants: '#fbf6ea', stole: '#fffaf0', shoe: '#efe0c4', trim: '#e0a42a', hair: '#3b2a21', garland: true },
    woman: { blouse: '#fff3dc', skirt: '#f6d560', dupatta: '#fffaf0', shoe: '#e9c25a', trim: '#e0a42a', hair: '#2f2019', flowers: 'marigold', necklace: 'garland' },
    scene: { skyTop: '#fde9ae', skyBottom: '#fff8e6', hill1: '#f7da8c', hill2: '#efc566', petal: '#f29b2d' },
  },
  wedding: {
    man: { kurta: '#f6ecda', pants: '#f3e9d5', shoe: '#c9a24f', trim: '#c9a24f', hair: '#3b2a21', long: true, turban: '#cfa955', pearls: true },
    woman: { blouse: '#dbb86f', skirt: '#cf9791', dupatta: '#f9f2e4', shoe: '#c9a24f', trim: '#d9b660', hair: '#2f2019', flowers: 'jasmine', necklace: 'pearls' },
    scene: { skyTop: '#f4dcdc', skyBottom: '#fcf5ec', hill1: '#ecd3d0', hill2: '#dbb5b1', petal: '#ffffff' },
  },
}

/* ---------- tiny colour helpers (lighten / darken a hex colour) ---------- */
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  return `#${[n >> 16, (n >> 8) & 255, n & 255].map((v) => clamp(v + (t - v) * p).toString(16).padStart(2, '0')).join('')}`
}

function Gradients({ uid, colors }) {
  return (
    <defs>
      {Object.entries(colors)
        .filter(([, v]) => typeof v === 'string' && v.startsWith('#'))
        .map(([key, hex]) => (
          <linearGradient key={key} id={`${uid}-${key}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor={shade(hex, 0.14)} />
            <stop offset="1" stopColor={shade(hex, -0.14)} />
          </linearGradient>
        ))}
      <radialGradient id={`${uid}-skin`} cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stopColor="#fbe6d2" />
        <stop offset="1" stopColor="#ecbf9f" />
      </radialGradient>
    </defs>
  )
}

/* Soft storybook portraits: warm skin, expressive eyes and gentle features. */
function Face({ f, feminine = false }) {
  return (
    <g>
      <ellipse cx="0" cy="30" rx="22" ry="25" fill={f('skin')} />

      {/* Soft cheek colour keeps the faces warm rather than flat. */}
      <ellipse cx="-13.5" cy="37" rx="4.2" ry="2.4" fill="#d98278" opacity="0.24" />
      <ellipse cx="13.5" cy="37" rx="4.2" ry="2.4" fill="#d98278" opacity="0.24" />

      {/* Brows and large, gentle storybook eyes. */}
      <path
        d="M-14 23Q-10 20-6 23M6 23Q10 20 14 23"
        fill="none"
        stroke="#49352d"
        strokeWidth={feminine ? "1.8" : "2"}
        strokeLinecap="round"
      />
      <ellipse cx="-10" cy="29" rx="3.1" ry="4.1" fill="#fffaf2" />
      <ellipse cx="10" cy="29" rx="3.1" ry="4.1" fill="#fffaf2" />
      <ellipse cx="-10" cy="29.5" rx="1.9" ry="3" fill="#49352d" />
      <ellipse cx="10" cy="29.5" rx="1.9" ry="3" fill="#49352d" />
      <circle cx="-9.2" cy="28.2" r="0.9" fill="#fff" />
      <circle cx="10.8" cy="28.2" r="0.9" fill="#fff" />

      {/* Tiny nose and a subtle, friendly smile. */}
      <path
        d="M0 31.5Q-1.7 35 0 35.5Q1.7 35 0 31.5"
        fill="none"
        stroke="#bd8268"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d={feminine ? "M-4 41Q0 44 4 41" : "M-3.5 41Q0 43.5 3.5 41"}
        fill="none"
        stroke="#a85f5a"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </g>
  )
}

function Man({ c, f }) {
  const hem = c.long ? 238 : 204
  const hw = c.long ? 43 : 38
  return (
    <g>
      {/* trousers + juttis */}
      <path d={`M-22 ${hem - 10}L-25 284L-6 284L-2 ${hem - 10}Z`} fill={f('pants')} />
      <path d={`M22 ${hem - 10}L25 284L6 284L2 ${hem - 10}Z`} fill={f('pants')} />
      <path d="M-25 268Q-15 273-6 268M25 268Q15 273 6 268" fill="none" stroke="rgba(90,65,40,0.28)" strokeWidth="0.9" />
      <path d="M-31 284C-31 277-5 277-4 285C-4 292-22 294-33 292C-37 290-34 285-31 284Z" fill={f('shoe')} />
      <path d="M31 284C31 277 5 277 4 285C4 292 22 294 33 292C37 290 34 285 31 284Z" fill={f('shoe')} />
      <path d="M-28 283Q-18 280-8 283M28 283Q18 280 8 283" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />

      {/* kurta / sherwani */}
      <path d={`M-35 72C-35 61-18 56 0 56C18 56 35 61 35 72L${hw} ${hem}C20 ${hem + 8}-20 ${hem + 8}-${hw} ${hem}Z`} fill={f('kurta')} />
      <path d={`M-20 92L-7 92L-9 ${hem + 4}L-24 ${hem + 1}Z`} fill="rgba(255,255,255,0.22)" />
      <path d={`M12 92L26 92L${hw - 2} ${hem}L10 ${hem + 6}Z`} fill="rgba(80,55,30,0.08)" />
      <path d="M-35 70C-45 90-49 125-51 160L-37 163C-36 130-31 100-26 76Z" fill={f('kurta')} />
      <path d="M35 70C45 90 49 125 51 160L37 163C36 130 31 100 26 76Z" fill={f('kurta')} />
      <path d="M-51 156L-37 159M51 156L37 159" stroke={c.trim} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="-44.5" cy="171" rx="7" ry="9" fill={f('skin')} />
      <ellipse cx="44.5" cy="171" rx="7" ry="9" fill={f('skin')} />

      {c.jacket ? (
        <g>
          <path d="M-32 64C-32 58-14 56-8 56L0 88L8 56C14 56 32 58 32 64L36 154C16 162-16 162-36 154Z" fill={f('jacket')} />
          <path d="M0 88V158" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
          {[100, 118, 136].map((y) => <circle key={y} cx="0" cy={y} r="1.8" fill="#f6e2a8" />)}
          <path d="M14 112h10" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
        </g>
      ) : (
        <g>
          <path d={`M0 66V${hem - 40}`} stroke={c.trim} strokeWidth="1.4" fill="none" />
          {[80, 98, 116].map((y) => <circle key={y} cx="0" cy={y} r="1.9" fill={c.trim} />)}
        </g>
      )}
      <path d={`M-${hw - 2} ${hem - 12}Q0 ${hem - 3} ${hw - 2} ${hem - 12}`} fill="none" stroke={c.trim} strokeWidth="4.5" strokeLinecap="round" />
      {c.long && (
        <g fill="none" stroke={c.trim} strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
          <path d="M-22 78Q0 96 22 78" />
          <path d="M-18 112Q0 128 18 112" />
          <path d="M-26 150Q0 170 26 150" />
          <path d="M-8 178L0 188L8 178" />
        </g>
      )}
      <path d="M-10 57Q0 69 10 57" fill="none" stroke={c.trim} strokeWidth="2.2" strokeLinecap="round" />

      {c.stole && (
        <g>
          <path d="M18 57L50 72L24 184L2 176Z" fill={f('stole')} fillOpacity="0.95" />
          <path d="M22 90L40 98M18 120L34 128" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="6" />
          <path d="M2 176L24 184M5 178L4 190M11 180L11 192M17 182L17 194M23 184L23 196" fill="none" stroke={shade(c.stole, -0.2)} strokeWidth="1" />
        </g>
      )}
      {c.garland && <path d="M-17 60C-10 100 10 100 17 60" fill="none" stroke="#f08f20" strokeWidth="8" strokeLinecap="round" strokeDasharray="0.1 7" />}
      {c.garland && <path d="M-17 60C-10 100 10 100 17 60" fill="none" stroke="#ffd370" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.1 7" />}
      {c.pearls && <path d="M-16 60C-9 92 9 92 16 60" fill="none" stroke="#fffaf0" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="0.1 5" />}

      {/* neck + head */}
      <rect x="-8" y="44" width="16" height="18" fill="#ebc3a3" />
      <ellipse cx="-22" cy="32" rx="3.6" ry="5.2" fill={f('skin')} />
      <ellipse cx="22" cy="32" rx="3.6" ry="5.2" fill={f('skin')} />
      <Face f={f} />
      {c.turban ? (
        <g>
          <path d="M-26 24C-30-6 30-6 26 24C17 12-17 12-26 24Z" fill={f('turban')} />
          <path d="M-22 12C-8 2 10 2 23 12M-24 18C-8 8 10 8 25 18" fill="none" stroke="rgba(0,0,0,0.16)" strokeWidth="1.2" />
          <path d="M-20 6C-6-4 10-4 21 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
          <circle cx="0" cy="4" r="3.6" fill="#fff6dc" />
          <path d="M0 0L1.4 3.8L5 4L1.8 5.4L0 9L-1.8 5.4L-5 4L-1.4 3.8Z" fill="#c9a24f" />
        </g>
      ) : (
        <g>
          {/* Neat side-parted gentleman's hair with a softly lifted front. */}
          <path d="M-25 30C-31 10-20-5-5-8C8-13 23-5 27 8C30 16 28 26 25 34C22 22 16 15 5 12C-3 16-12 19-21 25Z" fill={f('hair')} />
          <path d="M-20 8C-11-3 5-8 18 1C10-1 2 1-5 6C-10 10-16 12-22 13Z" fill={f('hair')} />
          <path d="M-13 5Q1-5 16 3" fill="none" stroke="rgba(255,255,255,0.23)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M-19 18Q-10 13-3 7" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      )}
      {/* Light, neatly shaped beard and moustache; mouth remains visible. */}
      <g fill={f('hair')}>
        <path d="M-17 38Q-16 48-8 51Q0 55 8 51Q16 48 17 38Q14 45 9 46Q0 49-9 46Q-14 44-17 38Z" opacity="0.94" />
        <path d="M-10 37Q-5 34 0 37Q5 34 10 37Q7 41 2 40Q0 39 0 38Q0 39-2 40Q-7 41-10 37Z" />
      </g>
      <path d="M-3 43Q0 44.5 3 43" fill="none" stroke="#a85f5a" strokeWidth="1" strokeLinecap="round" />
    </g>
  )
}

function Woman({ c, f }) {
  const folds = [-3, -2, -1, 0, 1, 2, 3]
  return (
    <g>
      {/* long hair behind */}
      <path d="M-27 30C-33-6 33-6 27 30C33 72 34 124 24 172C10 164-10 164-24 172C-34 124-33 72-27 30Z" fill={f('hair')} />
      <path d="M-18 60C-22 100-20 130-16 160" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

      {/* lehenga */}
      <path d="M-21 120L21 120C40 172 62 232 74 286C30 300-30 300-74 286C-62 232-40 172-21 120Z" fill={f('skirt')} />
      {folds.map((k) => (
        <path key={k} d={`M${k * 6 - 3} 122L${k * 6 + 3} 122L${k * 21 + 9} 292L${k * 21 - 9} 292Z`} fill={k % 2 ? 'rgba(255,255,255,0.12)' : 'rgba(60,40,25,0.08)'} />
      ))}
      <path d="M-66 262Q0 278 66 262" fill="none" stroke={c.trim} strokeWidth="1" strokeDasharray="3 3" />
      {[[-34, 232], [-12, 240], [14, 236], [36, 230], [-24, 205], [2, 202], [26, 200], [-10, 172], [10, 168], [0, 148]].map(([x, y], i) => (
        <g key={i} fill={c.trim} opacity="0.9">
          <circle cx={x} cy={y} r="2.3" />
          <circle cx={x} cy={y - 4.2} r="1.3" /><circle cx={x} cy={y + 4.2} r="1.3" />
          <circle cx={x - 4.2} cy={y} r="1.3" /><circle cx={x + 4.2} cy={y} r="1.3" />
        </g>
      ))}
      <path d="M-74 286Q0 302 74 286" fill="none" stroke={c.trim} strokeWidth="7" strokeLinecap="round" />
      <path d="M-70 280Q0 295 70 280" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <ellipse cx="-14" cy="296" rx="9" ry="3.4" fill={f('shoe')} />
      <ellipse cx="14" cy="296" rx="9" ry="3.4" fill={f('shoe')} />

      {/* blouse + arms */}
      <path d="M-26 72C-26 63-12 59 0 59C12 59 26 63 26 72L22 124L-22 124Z" fill={f('blouse')} />
      <path d="M-26 72C-34 96-38 132-40 166L-31 167C-29 138-24 106-19 82Z" fill={f('skin')} />
      <path d="M26 72C34 96 38 132 40 166L31 167C29 138 24 106 19 82Z" fill={f('skin')} />
      <path d="M-26 70L-35 98L-22 103L-18 76ZM26 70L35 98L22 103L18 76Z" fill={f('blouse')} />
      <ellipse cx="-35.5" cy="172" rx="5.6" ry="8" fill={f('skin')} />
      <ellipse cx="35.5" cy="172" rx="5.6" ry="8" fill={f('skin')} />
      <path d="M-40 158L-31 160M-40 163L-31 165M40 158L31 160M40 163L31 165" stroke={c.trim} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-22 118h44v8h-44z" fill={f('trim')} />
      <path d="M-10 59Q0 74 10 59" fill="none" stroke={c.trim} strokeWidth="1.8" strokeLinecap="round" />

      {/* dupatta */}
      <path d="M12 60C28 66 34 96 26 126L-28 154L-34 138L8 108C10 90 6 76 12 60Z" fill={f('dupatta')} fillOpacity="0.8" />
      <path d="M-30 142C-54 174-64 210-60 252C-48 244-40 222-26 190Z" fill={f('dupatta')} fillOpacity="0.8" />
      <path d="M-28 154L-34 138M-60 252L-26 190" fill="none" stroke={c.trim} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 70C24 86 24 108 20 120" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />

      {/* neck + head */}
      <rect x="-7" y="46" width="14" height="16" fill="#ebc3a3" />
      <Face f={f} feminine />
      <path d="M-25 29C-28 2-8-8 8-6C26-3 28 16 24 36C22 24 16 15 4 12C-4 20-14 22-24 28Z" fill={f('hair')} />
      <path d="M-22 34C-24 44-22 52-19 58M22 34C24 44 22 52 19 58" fill="none" stroke={c.hair} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M-12 4Q0-3 13 4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-19 15Q-10 7-1 7" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M0 5V14" stroke={c.trim} strokeWidth="1" />
      <circle cx="0" cy="17" r="2.3" fill={c.trim} />
      <circle cx="0" cy="21.5" r="1.5" fill="#cf4a47" />
      <circle cx="-21.5" cy="41" r="2.6" fill={c.trim} />
      <circle cx="21.5" cy="41" r="2.6" fill={c.trim} />
      <circle cx="-21.5" cy="46" r="1.6" fill={c.trim} />
      <circle cx="21.5" cy="46" r="1.6" fill={c.trim} />

      {c.necklace === 'gold' && <path d="M-10 60C-5 76 5 76 10 60" fill="none" stroke={c.trim} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.1 4.2" />}
      {c.necklace === 'pearls' && <path d="M-11 60C-6 80 6 80 11 60" fill="none" stroke="#fffaf0" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="0.1 5" />}
      {c.necklace === 'garland' && (
        <g fill="none" strokeLinecap="round">
          <path d="M-11 60C-5 86 5 86 11 60" stroke="#f08f20" strokeWidth="7" strokeDasharray="0.1 6.5" />
          <path d="M-11 60C-5 86 5 86 11 60" stroke="#ffd370" strokeWidth="3" strokeDasharray="0.1 6.5" />
        </g>
      )}
      {c.flowers && (
        <g>
          {[[-19, 6], [-13, 1], [-22, 14], [-10, 9]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4.6" fill={c.flowers === 'marigold' ? '#f08f20' : '#fffdf6'} stroke={c.flowers === 'jasmine' ? 'rgba(190,160,110,0.6)' : 'none'} strokeWidth="0.6" />
              <circle cx={x} cy={y} r="2" fill={c.flowers === 'marigold' ? '#ffd370' : '#f6e4b4'} />
            </g>
          ))}
          {c.flowers === 'marigold' && [-38, 38].map((x) => <circle key={x} cx={x} cy="161" r="3.2" fill="#f08f20" />)}
        </g>
      )}
    </g>
  )
}

/* The couple. `focus` ('him' | 'her') softly dims the other person. */
export function Couple({ look = 'wedding', focus = null, className = '' }) {
  const c = LOOKS[look] ?? LOOKS.wedding
  const uid = `c${useId().replace(/:/g, '')}`
  const man = (key) => `url(#${uid}m-${key})`
  const woman = (key) => `url(#${uid}w-${key})`
  const fm = (k) => (k === 'skin' ? `url(#${uid}m-skin)` : man(k))
  const fw = (k) => (k === 'skin' ? `url(#${uid}w-skin)` : woman(k))
  const dim = (who) => (focus && focus !== who ? 'is-dim' : focus === who ? 'is-focus' : '')

  return (
    <svg className={className} viewBox="0 0 290 322" role="img" aria-label={`Couple dressed for ${look}`}>
      <Gradients uid={`${uid}m`} colors={c.man} />
      <Gradients uid={`${uid}w`} colors={c.woman} />
      <ellipse cx="82" cy="314" rx="46" ry="5" fill="rgba(90,65,40,0.18)" />
      <ellipse cx="202" cy="314" rx="62" ry="5.5" fill="rgba(90,65,40,0.18)" />
      <g transform="translate(82 20)"><g className={`dc-person ${dim('him')}`}><Man c={c.man} f={fm} /></g></g>
      <g transform="translate(204 24) scale(0.96)"><g className={`dc-person ${dim('her')}`}><Woman c={c.woman} f={fw} /></g></g>
    </svg>
  )
}

/* Painted backdrop for the big stage: sky, clouds, soft hills, drifting petals. */
export function StageScene({ look = 'wedding', className = '' }) {
  const s = (LOOKS[look] ?? LOOKS.wedding).scene
  const uid = `s${useId().replace(/:/g, '')}`
  const petals = [[40, 70, 20], [92, 40, 60], [250, 58, -30], [300, 96, 40], [60, 140, -50], [318, 170, 10], [26, 210, 70], [280, 230, -20]]
  return (
    <svg className={className} viewBox="0 0 346 380" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.skyTop} />
          <stop offset="1" stopColor={s.skyBottom} />
        </linearGradient>
        <radialGradient id={`${uid}sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffbe8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fffbe8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="346" height="380" fill={`url(#${uid}sky)`} />
      <circle cx="270" cy="96" r="80" fill={`url(#${uid}sun)`} />
      <g fill="#fff" opacity="0.85">
        <ellipse cx="86" cy="118" rx="38" ry="11" /><ellipse cx="112" cy="108" rx="26" ry="12" /><ellipse cx="66" cy="110" rx="20" ry="9" />
        <ellipse cx="262" cy="176" rx="34" ry="9" /><ellipse cx="282" cy="168" rx="22" ry="10" />
      </g>
      <path d="M0 262C60 232 120 244 180 252C240 260 300 236 346 246V380H0Z" fill={s.hill1} />
      <path d="M0 300C70 274 140 292 210 288C268 284 316 276 346 286V380H0Z" fill={s.hill2} />
      {petals.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5.5" ry="2.6" fill={s.petal} opacity="0.7" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   Outfits hanging on hangers from a rail: used inside the wardrobe compartments.
   (No people: just the clothes, like a real wardrobe.)
--------------------------------------------------------------------------- */
function Hanger({ wood }) {
  return (
    <g>
      <path d="M0 11C0 3 8 3 8 9" fill="none" stroke="#9c7c48" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 11V17" stroke="#9c7c48" strokeWidth="1.5" />
      <path d="M0 17L-24 29Q-27 31-24 32.6L24 32.6Q27 31 24 29Z" fill={wood} stroke="rgba(90,60,30,0.55)" strokeWidth="0.6" strokeLinejoin="round" />
    </g>
  )
}

export function HangingOutfits({ look = 'wedding', className = '' }) {
  const c = LOOKS[look] ?? LOOKS.wedding
  const uid = `h${useId().replace(/:/g, '')}`
  const m = (k) => `url(#${uid}m-${k})`
  const w = (k) => `url(#${uid}w-${k})`
  const wood = `url(#${uid}wood)`
  const hem = c.man.long ? 108 : 96
  const hw = c.man.long ? 24 : 22
  const folds = [-2, -1, 0, 1, 2]

  return (
    <svg className={className} viewBox="0 0 130 148" role="img" aria-label={`Hanging outfits for ${look}`}>
      <Gradients uid={`${uid}m`} colors={c.man} />
      <Gradients uid={`${uid}w`} colors={c.woman} />
      <defs>
        <linearGradient id={`${uid}wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3c995" />
          <stop offset="1" stopColor="#a98650" />
        </linearGradient>
        <linearGradient id={`${uid}rod`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0dba4" />
          <stop offset="1" stopColor="#a98650" />
        </linearGradient>
      </defs>

      {/* the rail */}
      <rect x="2" y="6.5" width="126" height="4.6" rx="2.3" fill={`url(#${uid}rod)`} />
      <rect x="1" y="3.5" width="3.4" height="10" rx="1.2" fill="#9c7c48" />
      <rect x="125.6" y="3.5" width="3.4" height="10" rx="1.2" fill="#9c7c48" />

      {/* ---------- his outfit ---------- */}
      <g transform="translate(36 0)">
        <path d={`M-14 ${hem - 8}L-13 ${hem + 32}L-3 ${hem + 32}L-1 ${hem - 8}Z`} fill={m('pants')} />
        <path d={`M14 ${hem - 8}L13 ${hem + 32}L3 ${hem + 32}L1 ${hem - 8}Z`} fill={m('pants')} />
        <Hanger wood={wood} />
        {c.man.garland && (
          <g fill="none" strokeLinecap="round">
            <path d="M-15 33C-9 56 9 56 15 33" stroke="#f08f20" strokeWidth="5" strokeDasharray="0.1 5" />
            <path d="M-15 33C-9 56 9 56 15 33" stroke="#ffd370" strokeWidth="2.2" strokeDasharray="0.1 5" />
          </g>
        )}
        <path d="M-19 33L-31 80L-21 84L-12 42Z" fill={m('kurta')} />
        <path d="M19 33L31 80L21 84L12 42Z" fill={m('kurta')} />
        <path d={`M-19 33Q0 28 19 33L${hw} ${hem - 6}Q0 ${hem + 3} -${hw} ${hem - 6}Z`} fill={m('kurta')} />
        <path d={`M-11 42L-4 42L-6 ${hem - 2}L-13 ${hem - 4}Z`} fill="rgba(255,255,255,0.22)" />
        <path d="M-31 76L-21 80M31 76L21 80" stroke={c.man.trim} strokeWidth="2.2" strokeLinecap="round" />
        {c.man.jacket && (
          <g>
            <path d="M-17 33Q0 30 17 33L20 74Q0 80-20 74Z" fill={m('jacket')} />
            <path d="M0 44V77" stroke="rgba(0,0,0,0.2)" strokeWidth="0.9" />
            {[52, 62, 72].map((y) => <circle key={y} cx="0" cy={y} r="1.3" fill="#f6e2a8" />)}
          </g>
        )}
        {!c.man.jacket && (
          <g>
            <path d={`M0 38V${hem - 26}`} stroke={c.man.trim} strokeWidth="1.1" />
            {[48, 60, 72].map((y) => <circle key={y} cx="0" cy={y} r="1.4" fill={c.man.trim} />)}
          </g>
        )}
        <path d="M-6 31Q0 43 6 31" fill="none" stroke={c.man.trim} strokeWidth="1.7" strokeLinecap="round" />
        <path d={`M-${hw - 1} ${hem - 11}Q0 ${hem - 4} ${hw - 1} ${hem - 11}`} fill="none" stroke={c.man.trim} strokeWidth="3.4" strokeLinecap="round" />
        {c.man.long && (
          <g fill="none" stroke={c.man.trim} strokeWidth="0.9" strokeLinecap="round">
            <path d="M-14 46Q0 58 14 46" /><path d="M-13 70Q0 82 13 70" />
          </g>
        )}
        {c.man.stole && (
          <g>
            <path d="M7 31L24 38L9 88L-3 84Z" fill={m('stole')} fillOpacity="0.96" />
            <path d="M-3 84L9 88M0 86V95M4 87V96M8 88V97" fill="none" stroke={shade(c.man.stole, -0.22)} strokeWidth="0.9" />
          </g>
        )}
        {c.man.pearls && <path d="M-13 34C-8 52 8 52 13 34" fill="none" stroke="#fffaf0" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 4" />}
      </g>

      {/* ---------- her outfit ---------- */}
      <g transform="translate(95 0)">
        <path d="M-15 62L15 62C20 86 28 112 34 136C16 144-16 144-34 136C-28 112-20 86-15 62Z" fill={w('skirt')} />
        {folds.map((k) => (
          <path key={k} d={`M${k * 5 - 2.5} 63L${k * 5 + 2.5} 63L${k * 13 + 6} 140L${k * 13 - 6} 140Z`} fill={k % 2 ? 'rgba(255,255,255,0.13)' : 'rgba(60,40,25,0.08)'} />
        ))}
        {[[-14, 120], [0, 126], [14, 120], [-6, 100], [8, 98], [0, 82]].map(([x, y], i) => (
          <g key={i} fill={c.woman.trim} opacity="0.9"><circle cx={x} cy={y} r="1.7" /><circle cx={x} cy={y - 3.2} r="1" /><circle cx={x} cy={y + 3.2} r="1" /><circle cx={x - 3.2} cy={y} r="1" /><circle cx={x + 3.2} cy={y} r="1" /></g>
        ))}
        <path d="M-34 136Q0 146 34 136" fill="none" stroke={c.woman.trim} strokeWidth="4.6" strokeLinecap="round" />
        <path d="M-16 60h32v5h-32z" fill={w('trim')} />
        <Hanger wood={wood} />
        <path d="M-17 33L-25 49L-17 52L-12 38Z" fill={w('blouse')} />
        <path d="M17 33L25 49L17 52L12 38Z" fill={w('blouse')} />
        <path d="M-17 33Q0 29 17 33L19 40L14 62L-14 62L-19 40Z" fill={w('blouse')} />
        <path d="M-7 32Q0 45 7 32" fill="none" stroke={c.woman.trim} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M-25 46L-17 49M25 46L17 49" stroke={c.woman.trim} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M-19 33C-28 54-30 90-26 120L-17 118C-20 88-16 58-7 38Z" fill={w('dupatta')} fillOpacity="0.82" />
        <path d="M19 33C28 56 30 92 26 124L17 120C20 92 17 60 8 38Z" fill={w('dupatta')} fillOpacity="0.82" />
        <path d="M-26 120L-17 118M26 124L17 120" fill="none" stroke={c.woman.trim} strokeWidth="2.2" strokeLinecap="round" />
        {c.woman.necklace === 'garland' && (
          <g fill="none" strokeLinecap="round">
            <path d="M-12 33C-6 52 6 52 12 33" stroke="#f08f20" strokeWidth="4.6" strokeDasharray="0.1 4.8" />
            <path d="M-12 33C-6 52 6 52 12 33" stroke="#ffd370" strokeWidth="2" strokeDasharray="0.1 4.8" />
          </g>
        )}
      </g>
    </svg>
  )
}
/* ---------------------------------------------------------------------------
   The couple standing ON the staircase (feet on the step line, he one step lower).
   Uses the same 390 x 760 artboard as the staircase so everything lines up.
--------------------------------------------------------------------------- */
export const STAIR_W = 390
export const STAIR_H = 760
export const stairY = (x) => 500 + 0.82 * (300 - x) // the step line: higher on the right, lower on the left

export function CoupleOnStairs({ look = 'wedding', reverse = false, className = '' }) {
  const c = LOOKS[look] ?? LOOKS.wedding
  const uid = `c${useId().replace(/:/g, '')}`
  const fm = (k) => `url(#${uid}m-${k})`
  const fw = (k) => `url(#${uid}w-${k})`
  const himX = 232
  const herX = 312
  const SHIM = 0.9
  const SHER = 0.86

  return (
    <svg className={className} viewBox={`0 0 ${STAIR_W} ${STAIR_H}`} preserveAspectRatio="xMidYMax slice" role="img" aria-label={`Couple dressed for ${look}`}>
      <Gradients uid={`${uid}m`} colors={c.man} />
      <Gradients uid={`${uid}w`} colors={c.woman} />
      <g transform={reverse ? `translate(${STAIR_W} 0) scale(-1 1)` : undefined}>
        <ellipse cx={himX} cy={stairY(himX) + 3} rx="42" ry="6" fill="rgba(70,52,34,0.24)" />
        <ellipse cx={herX} cy={stairY(herX) + 3} rx="54" ry="6" fill="rgba(70,52,34,0.24)" />
        <g transform={`translate(${himX} ${stairY(himX) - 294 * SHIM}) scale(${SHIM})`}><Man c={c.man} f={fm} /></g>
        <g transform={`translate(${herX} ${stairY(herX) - 302 * SHER}) scale(${SHER})`}><Woman c={c.woman} f={fw} /></g>
      </g>
    </svg>
  )
}