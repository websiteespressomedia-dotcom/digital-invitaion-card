/*
  Embossed ginkgo-leaf relief for the outside of the envelope (inspired by the
  Mother of Pearl reference). The artwork is defined ONCE (EnvelopeArtDefs) and
  every envelope piece (back, flap, panels) just <use>s it, so the leaves line up
  perfectly across the flap and the pockets and stay cheap to render.
*/

const LEAF = 'M0 0C-10-14-44-48-62-82C-66-96-58-108-46-110C-38-118-26-122-16-116C-10-124-2-124 0-112C2-124 10-124 16-116C26-122 38-118 46-110C58-108 66-96 62-82C44-48 10-14 0 0Z'

// fine radial veins fanning out of the leaf base
const VEINS = Array.from({ length: 23 }, (_, i) => {
  const a = ((-58 + i * (116 / 22)) * Math.PI) / 180
  return [Math.sin(a) * 52, -Math.cos(a) * 112]
})

// [x, y, rotation, scale] in a 390 x 800 artboard, drawn back to front
const LEAVES = [
  [195, 330, 0, 2.3],
  [36, 340, -36, 1.7],
  [354, 340, 36, 1.7],
  [-8, 530, -72, 1.5],
  [398, 548, 72, 1.5],
  [110, 590, -42, 1.1],
  [286, 600, 44, 1.15],
  [62, 830, -20, 2.05],
  [336, 836, 22, 2.05],
  [195, 812, 0, 2.6],
]

export function EnvelopeArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ea-fill" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fffaf1" />
          <stop offset="0.55" stopColor="#f0e5d3" />
          <stop offset="1" stopColor="#d8c7ae" />
        </linearGradient>

        <g id="ea-leaf">
          {/* soft shadow under the leaf, then the leaf with a bright rim, then the veins */}
          <path d={LEAF} transform="translate(3 4)" fill="rgba(110,85,55,0.16)" />
          <path d={LEAF} fill="url(#ea-fill)" fillOpacity="0.92" stroke="rgba(255,255,255,0.85)" strokeWidth="0.9" />
          <g stroke="rgba(150,122,85,0.24)" strokeWidth="0.55" fill="none">
            {VEINS.map(([x, y], i) => (
              <path key={i} d={`M0-3L${x.toFixed(1)} ${y.toFixed(1)}`} />
            ))}
          </g>
        </g>

        <g id="ea-art">
          {LEAVES.map(([x, y, r, s], i) => (
            <use key={i} href="#ea-leaf" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
          ))}
        </g>
      </defs>
    </svg>
  )
}

export function EnvelopeArt() {
  return (
    <svg className="envelope__art" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <use href="#ea-art" />
    </svg>
  )
}