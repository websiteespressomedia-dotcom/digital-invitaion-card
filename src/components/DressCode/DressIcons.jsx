/* Small gold line icons for the outfit details. */
const PATHS = {
  kurta: 'M8 3L4 6l2 3 2-1v13h8V8l2 1 2-3-4-3c-1 2-2 2.5-4 2.5S9 5 8 3Z',
  lehenga: 'M10 3h4l.5 5L21 21H3L9.5 8 10 3ZM9.5 8h5',
  trousers: 'M7 3h10l1 18h-4.5L12 10l-1.5 11H6L7 3Z',
  dupatta: 'M3 7c3-3 5 3 9 0s6 3 9 0M3 13c3-3 5 3 9 0s6 3 9 0M3 19c3-3 5 3 9 0s6 3 9 0',
  shoe: 'M3 14c4 0 6-2 7-5l4 2c1 2 3 3 7 3v4H3v-4Z',
  sparkle: 'M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z',
  gem: 'M6 4h12l3 5-9 11L3 9l3-5ZM3 9h18M9 4l-1 5 4 11 4-11-1-5',
}

const BY_LABEL = {
  Outfit: { him: 'kurta', her: 'lehenga' },
  Bottom: 'trousers',
  Dupatta: 'dupatta',
  Footwear: 'shoe',
  Extras: 'sparkle',
  Jewellery: 'gem',
}

export function RowIcon({ label, who }) {
  const entry = BY_LABEL[label] ?? 'sparkle'
  const key = typeof entry === 'string' ? entry : entry[who]
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[key]} />
    </svg>
  )
}