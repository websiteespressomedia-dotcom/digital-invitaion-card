import './Ornaments.css'

/* Reusable line-art botanicals (ginkgo leaves + roses) drawn in currentColor,
   so every page can tint them through the CSS `color` property. */

function Leaf({ x, y, r = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C-9-6-17-20-14-33C-9-37-4-35 0-30C4-35 9-37 14-33C17-20 9-6 0 0Z" fill="currentColor" fillOpacity="0.13" />
      <path d="M0 0V-29M0 0L-7-25M0 0L7-25M0 0L-12-16M0 0L12-16" strokeWidth="0.55" />
    </g>
  )
}

function Rose({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="13" fill="currentColor" fillOpacity="0.1" />
      <path d="M-12-2C-10-12 10-12 12-2C13 8-2 14-9 6" />
      <path d="M-8 0C-6-8 7-8 8 0C8 6 0 9-5 4" />
      <path d="M-3 0C-2-4 3-4 4 0C4 3 0 4-2 2" />
      <path d="M-10-9C-15-17-6-21-2-14M10-9C15-17 6-21 2-14" />
    </g>
  )
}

/* One corner spray, drawn for the top-left corner. */
function Floral({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 170 170" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4C44 8 86 32 108 72C122 98 126 130 120 166" />
      <path d="M4 4C20 30 20 60 8 92" strokeWidth="0.7" />
      <path d="M4 4C34-2 70 8 96 26" strokeWidth="0.7" />
      <Leaf x={36} y={13} r={-28} s={0.9} />
      <Leaf x={58} y={23} r={32} s={1} />
      <Leaf x={52} y={25} r={158} s={0.85} />
      <Leaf x={84} y={42} r={58} s={1} />
      <Leaf x={80} y={48} r={170} s={0.9} />
      <Leaf x={104} y={68} r={78} s={1} />
      <Leaf x={100} y={72} r={205} s={0.85} />
      <Leaf x={119} y={112} r={100} s={0.9} />
      <Leaf x={121} y={124} r={258} s={0.9} />
      <Leaf x={121} y={142} r={108} s={0.8} />
      <Leaf x={119} y={152} r={252} s={0.75} />
      <Leaf x={13} y={44} r={96} s={0.8} />
      <Leaf x={14} y={64} r={-86} s={0.8} />
      <Leaf x={10} y={82} r={100} s={0.7} />
      <Rose x={112} y={86} s={1.1} />
      <circle cx="92" cy="16" r="2.2" fill="currentColor" />
      <circle cx="22" cy="70" r="2" fill="currentColor" />
    </svg>
  )
}

/* Four corner sprays. Place inside any `position: relative` page. */
export function CornerFlorals({ corners = ['tl', 'tr', 'bl', 'br'] }) {
  return (
    <>
      {corners.map((corner) => (
        <Floral key={corner} className={`card-corner card-corner--${corner}`} />
      ))}
    </>
  )
}

/* Small ginkgo fan, used as a crest at the top of each page. */
export function GinkgoSprig({ className = '' }) {
  return (
    <svg className={`orn-sprig ${className}`} viewBox="0 0 70 46" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
      <Leaf x={35} y={44} r={-38} s={0.8} />
      <Leaf x={35} y={44} r={0} s={1} />
      <Leaf x={35} y={44} r={38} s={0.8} />
      <circle cx="35" cy="44" r="2" fill="currentColor" />
    </svg>
  )
}

/* Thin gold rule with a pair of leaves in the middle. */
export function FloralDivider({ className = '' }) {
  return (
    <svg className={`orn-divider ${className}`} viewBox="0 0 180 22" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" aria-hidden="true">
      <path d="M0 12H72M108 12H180" />
      <Leaf x={90} y={14} r={-52} s={0.38} />
      <Leaf x={90} y={14} r={52} s={0.38} />
      <circle cx="90" cy="11" r="2" fill="currentColor" />
    </svg>
  )
}