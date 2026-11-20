import { stairY as Y, STAIR_W, STAIR_H } from './DressIllustrations.jsx'

/*
  One flight of a grand staircase: carpet runner, stringer, turned balusters,
  a thick banister and a newel post. Every other flight is mirrored, so stacking
  the scenes gives the zig-zag of the reference. Colours stay in the invitation's
  champagne / pearl palette; only the carpet follows each scene's tint.
*/
const CARPETS = ['#b3c7a1', '#e6c96e', '#b9c6cf']
const STRANDS = [
  ['#7fa36a', '#bcd6a4'], // leaves
  ['#f08f20', '#ffd370'], // marigold
  ['#fffdf6', '#f1e1b4'], // jasmine
]
const X0 = -60
const X1 = 450
const BALUSTERS = Array.from({ length: 26 }, (_, i) => -30 + i * 19)
const TICKS = Array.from({ length: 19 }, (_, i) => -50 + i * 28)

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))
function tone(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  return `#${[n >> 16, (n >> 8) & 255, n & 255].map((v) => clamp(v + (t - v) * p).toString(16).padStart(2, '0')).join('')}`
}

function Plate({ id, cx, cy, r }) {
  return (
    <g>
      <circle cx={cx + 1.5} cy={cy + 2.5} r={r} fill="rgba(70,50,30,0.16)" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-brass)`} />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke="rgba(120,90,45,0.45)" strokeWidth="0.9" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="rgba(120,90,45,0.4)" strokeWidth="0.8" strokeDasharray="1.5 2.4" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="rgba(130,98,48,0.55)" />
    </g>
  )
}

function Strand({ x, y, len, colors, delay = 0 }) {
  const [a, b] = colors
  return (
    <g className="dc-sway" style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }}>
      <path d={`M${x} ${y}V${y + len}`} stroke="rgba(120,95,60,0.4)" strokeWidth="0.8" />
      <path d={`M${x} ${y}V${y + len}`} stroke={a} strokeWidth="6.5" strokeLinecap="round" strokeDasharray="0.1 8.4" />
      <path d={`M${x} ${y}V${y + len}`} stroke={b} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 8.4" />
      <path d={`M${x} ${y + len}l-3.5 11M${x} ${y + len}v13M${x} ${y + len}l3.5 11`} stroke={a} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}

export function Staircase({ reverse = false, index = 0, className = '' }) {
  const id = `ds${index}`
  const carpet = CARPETS[index % CARPETS.length]
  const strand = STRANDS[index % STRANDS.length]

  return (
    <svg className={className} viewBox={`0 0 ${STAIR_W} ${STAIR_H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4d6c0" />
          <stop offset="1" stopColor="#b9a47f" />
        </linearGradient>
        <linearGradient id={`${id}-carpet`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone(carpet, 0.14)} />
          <stop offset="1" stopColor={tone(carpet, -0.14)} />
        </linearGradient>
        <linearGradient id={`${id}-rail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e7d0" />
          <stop offset="0.45" stopColor="#c3a77e" />
          <stop offset="1" stopColor="#8f7650" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a98f66" />
          <stop offset="0.45" stopColor="#f3e8d1" />
          <stop offset="1" stopColor="#a98f66" />
        </linearGradient>
        <radialGradient id={`${id}-brass`} cx="0.38" cy="0.34" r="0.8">
          <stop offset="0" stopColor="#f6e8bd" />
          <stop offset="0.6" stopColor="#d8bb78" />
          <stop offset="1" stopColor="#a58443" />
        </radialGradient>
        <path
          id={`${id}-bal`}
          fill={`url(#${id}-gold)`}
          stroke="rgba(120,95,60,0.35)"
          strokeWidth="0.5"
          d="M-4.6 0L4.6 0L3 -6C8.4 -12 8.4 -20 2.8 -26L2.8 -34C7.4 -42 7.4 -56 2.8 -64L2.8 -70C7.4 -78 7.4 -90 3.4 -96L4 -106L-4 -106L-3.4 -96C-7.4 -90 -7.4 -78 -2.8 -70L-2.8 -64C-7.4 -56 -7.4 -42 -2.8 -34L-2.8 -26C-8.4 -20 -8.4 -12 -3 -6Z"
        />
      </defs>

      <g transform={reverse ? `translate(${STAIR_W} 0) scale(-1 1)` : undefined}>
        {/* wall decoration, kept clear of the text */}
        <Plate id={id} cx={332} cy={96} r={25} />
        <Plate id={id} cx={296} cy={44} r={13} />
        <Plate id={id} cx={360} cy={168} r={13} />
        <Strand x={352} y={0} len={118} colors={strand} />
        <Strand x={376} y={0} len={76} colors={STRANDS[2]} delay={0.9} />

        {/* underside of the flight, carpet runner, step marks */}
        <path d={`M${X0} ${Y(X0) + 34}L${X1} ${Y(X1) + 34}L${X1} ${Y(X1) + 74}L${X0} ${Y(X0) + 74}Z`} fill={`url(#${id}-stone)`} />
        <path d={`M${X0} ${Y(X0)}L${X1} ${Y(X1)}L${X1} ${Y(X1) + 36}L${X0} ${Y(X0) + 36}Z`} fill={`url(#${id}-carpet)`} />
        <path d={`M${X0} ${Y(X0) + 4}L${X1} ${Y(X1) + 4}`} stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
        <path d={`M${X0} ${Y(X0) + 32}L${X1} ${Y(X1) + 32}`} stroke="rgba(235,215,160,0.9)" strokeWidth="2" />
        {TICKS.map((x) => <path key={x} d={`M${x} ${Y(x)}V${Y(x) + 34}`} stroke="rgba(60,44,28,0.16)" strokeWidth="1" />)}

        {/* turned balusters + thick banister */}
        {BALUSTERS.map((x) => <use key={x} href={`#${id}-bal`} transform={`translate(${x} ${Y(x) + 2})`} />)}
        <path d={`M${X0} ${Y(X0) - 112}L${X1} ${Y(X1) - 112}L${X1} ${Y(X1) - 90}L${X0} ${Y(X0) - 90}Z`} fill="rgba(60,44,28,0.16)" transform="translate(0 4)" />
        <path d={`M${X0} ${Y(X0) - 126}L${X1} ${Y(X1) - 126}L${X1} ${Y(X1) - 106}L${X0} ${Y(X0) - 106}Z`} fill={`url(#${id}-rail)`} />
        <path d={`M${X0} ${Y(X0) - 124}L${X1} ${Y(X1) - 124}`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" />

        {/* newel post at the low end */}
        <rect x="4" y={Y(18) - 150} width="15" height="178" rx="2.5" fill={`url(#${id}-gold)`} stroke="rgba(120,95,60,0.4)" strokeWidth="0.6" />
        <circle cx="11.5" cy={Y(18) - 158} r="10" fill={`url(#${id}-brass)`} />
      </g>
    </svg>
  )
}