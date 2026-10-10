import { Plant } from './types'

/**
 * Local Plant Bank catalogue.
 * Currently a single entry (Areca Lutescans Palm) per the Figma detail screen.
 * Swap `imageUrl` for a real plant photo when one is available.
 */
export const plants: Plant[] = [
  {
    id: 'areca-lutescans-palm',
    scientificName: 'ARECA LUTESCANS',
    subtitle: 'PALM',
    commonNames: 'ARECA PALM',
    imageUrl: '/images/plant_1.png',
    plantType: 'PALM',
    foliageColour: 'Green',
    climaticZone: 'Tropical',
    attributes: [
      { heading: 'FAMILY', lines: ['ARECA PALM'] },
      { heading: 'Plant Form', lines: ['Ornamental Foliage'] },
      { heading: 'Habitat', lines: ['Terrestrial'], more: true },
      { heading: 'Foliage', lines: ['Colour: Green', 'Type: Evergreen'] },
      { heading: 'Climate', lines: ['Zone: Areca Palm', 'Condition: Palm'], more: true },
      { heading: 'Flower', lines: ['Colour: Yellow', 'Season: August-December'], more: true },
      { heading: 'Leaf', lines: ['Colour: Green', 'Type: Evergreen'], more: true },
      { heading: 'Fruit', lines: ['Zone: Areca Palm', 'Condition: Palm'], more: true },
      { heading: 'Soil Type', lines: ['Red & Yellow Soils'], more: true },
      { heading: 'Growth Habit', lines: ['Upright or erect, clumping'] },
      { heading: 'Growth Height (m)', lines: ['6-12'] },
      { heading: 'Canopy Spread (m)', lines: ['6-12'] },
    ],
    iucnStatus: 'Least Concern (LC)',
    uses: 'Ornamental planting in gardens, courtyards and parks; potted foliage for interiors and patios; screening and border plantings in tropical landscapes.',
    keywords: ['areca', 'palm', 'arecaceae', 'ornamental', 'evergreen', 'foliage', 'tropical'],
  },
]
