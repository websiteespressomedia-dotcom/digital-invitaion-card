/*
  DRESS CODE CONFIGURATION

  Add or remove functions by adding/removing objects.
  No changes to DressCode.jsx or DressCode.css are required.

  look: mehndi | haldi | wedding
  image: Optional custom PNG path.
*/

export const dressCodes = [
  {
    id: 'mehndi',
    label: 'Mehndi',
    look: 'mehndi',
    image: '',
    title: 'Green & Gold',
    note: 'Playful, earthy and full of colour.',

    palette: ['#7f9c6c', '#e0b13e', '#f4ecd9'],
    tint: 'rgba(127,156,108,0.32)',

    men: [
      ['Outfit', 'Cream kurta with a sage Nehru jacket'],
      ['Bottom', 'Cream churidar pyjama'],
      ['Footwear', 'Tan leather mojaris'],
      ['Extras', 'Mustard stole, wooden-bead mala'],
    ],

    women: [
      ['Outfit', 'Green lehenga, mustard blouse'],
      ['Dupatta', 'Light yellow organza'],
      ['Footwear', 'Gold juttis or kolhapuris'],
      ['Jewellery', 'Floral set, oxidised jhumkas'],
    ],
  },

  {
    id: 'haldi',
    label: 'Haldi',
    look: 'haldi',
    image: '',
    title: 'Sunshine Yellow',
    note: 'Wear yellow and white, and expect a little turmeric.',

    palette: ['#f4cf58', '#fffaf0', '#f29b2d'],
    tint: 'rgba(244,207,88,0.38)',

    men: [
      ['Outfit', 'Yellow cotton kurta'],
      ['Bottom', 'White pyjama'],
      ['Footwear', 'Cream kolhapuris or sneakers'],
      ['Extras', 'White stole, marigold garland'],
    ],

    women: [
      ['Outfit', 'Yellow lehenga, ivory blouse'],
      ['Dupatta', 'Sheer white with gota border'],
      ['Footwear', 'Flat sandals (it gets messy)'],
      ['Jewellery', 'Fresh marigold jewellery'],
    ],
  },

  {
    id: 'wedding',
    label: 'Wedding',
    look: 'wedding',
    image: '',
    title: 'Ivory, Gold & Blush',
    note: 'Formal and festive: dress for the main celebration.',

    palette: ['#f5ecda', '#c9a24f', '#cf9490'],
    tint: 'rgba(207,148,144,0.3)',

    men: [
      ['Outfit', 'Ivory sherwani with gold zari'],
      ['Bottom', 'Ivory churidar'],
      ['Footwear', 'Gold embroidered mojaris'],
      ['Extras', 'Safa turban, pearl mala'],
    ],

    women: [
      ['Outfit', 'Blush lehenga, gold blouse'],
      ['Dupatta', 'Ivory net with gold border'],
      ['Footwear', 'Embellished heels or juttis'],
      ['Jewellery', 'Kundan set, maang tikka'],
    ],
  },

  // FUTURE FUNCTION EXAMPLE:
  // Copy this object, edit its details and add it to the array.

  // {
  //   id: 'reception',
  //   label: 'Reception',
  //   look: 'wedding',
  //   image: '',
  //   title: 'Silver & Champagne',
  //   note: 'An elegant evening celebration.',
  //   palette: ['#d8dce2', '#c9a979', '#f5eee4'],
  //   tint: 'rgba(216,220,226,0.3)',
  //   men: [
  //     ['Outfit', 'Classic formal suit'],
  //     ['Bottom', 'Matching trousers'],
  //     ['Footwear', 'Formal shoes'],
  //   ],
  //   women: [
  //     ['Outfit', 'Elegant silver gown'],
  //     ['Dupatta', 'Optional'],
  //     ['Footwear', 'Silver heels'],
  //   ],
  // },
]
