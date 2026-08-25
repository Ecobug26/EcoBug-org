import { Strategy } from './types'

const svgIllustrations = {
  packaging: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e2ebd2"/><path d="M30 40L50 28L70 40L50 52L30 40Z" stroke="%232d4428" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 40V65L50 77V52" stroke="%232d4428" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M70 40V65L50 77" stroke="%232d4428" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 35C45 30 40 32 40 35C40 40 50 45 50 45C50 45 60 40 60 35C60 32 55 30 50 35Z" fill="%233b703e"/></svg>`,
  marketing: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23d8e3c4"/><path d="M25 45H40L65 25V75L40 55H25V45Z" fill="%233b703e" stroke="%232d4428" stroke-width="4" stroke-linejoin="round"/><path d="M73 40C77 45 77 55 73 60" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M81 33C88 43 88 57 81 67" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/></svg>`,
  audit: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e6eee0"/><path d="M25 75V35H40V75H25Z" fill="%23bdc5a7" stroke="%232d4428" stroke-width="4"/><path d="M45 75V25H60V75H45Z" fill="%233b703e" stroke="%232d4428" stroke-width="4"/><path d="M65 75V45H80V75H65Z" fill="%232d4428" stroke="%232d4428" stroke-width="4"/><path d="M20 75H85" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/></svg>`,
  renewable: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23d0dfbe"/><circle cx="50" cy="50" r="16" fill="%23f4b41a" stroke="%232d4428" stroke-width="4"/><path d="M50 20V10M50 80V90M20 50H10M80 50H90M29 29L22 22M71 71L78 78M71 29L78 22M29 71L22 78" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M50 50L68 35C72 32 78 40 70 45Z" fill="%233b703e" stroke="%232d4428" stroke-width="2"/></svg>`,
  circular: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e2ebd2"/><path d="M50 25C65 25 75 35 75 50C75 60 70 68 62 72" stroke="%233b703e" stroke-width="6" stroke-linecap="round"/><path d="M50 75C35 75 25 65 25 50C25 40 30 32 38 28" stroke="%232d4428" stroke-width="6" stroke-linecap="round"/><path d="M65 77L60 67L73 66L65 77Z" fill="%233b703e"/><path d="M35 23L40 33L27 34L35 23Z" fill="%232d4428"/></svg>`,
  waste: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23d8e3c4"/><path d="M30 35H70V75C70 78 67 80 64 80H36C33 80 30 78 30 75V35Z" fill="%23f6f6f6" stroke="%232d4428" stroke-width="4"/><path d="M25 35H75" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M42 25H58" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M42 45V68M50 45V68M58 45V68" stroke="%233b703e" stroke-width="3" stroke-linecap="round"/></svg>`,
  cloud: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e6eee0"/><path d="M32 65C25 65 20 60 20 53C20 47 24 42 30 41C32 33 40 28 48 28C57 28 64 34 66 42C72 42 78 47 78 54C78 60 73 65 66 65H32Z" fill="%23bdc5a7" stroke="%232d4428" stroke-width="4"/><path d="M50 65V48M50 48L42 56M50 48L58 56" stroke="%233b703e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  serialBlooming: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e2ebd2"/><circle cx="30" cy="50" r="8" fill="%23f4b41a" stroke="%232d4428" stroke-width="2"/><circle cx="50" cy="35" r="10" fill="%23e86f8c" stroke="%232d4428" stroke-width="2"/><circle cx="70" cy="50" r="8" fill="%239b59b6" stroke="%232d4428" stroke-width="2"/><circle cx="50" cy="65" r="7" fill="%23f39c12" stroke="%232d4428" stroke-width="2"/><path d="M50 80V20" stroke="%233b703e" stroke-width="3"/><path d="M20 50H80" stroke="%233b703e" stroke-width="2" stroke-dasharray="4 4"/></svg>`,
  windFiltering: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23d8e3c4"/><path d="M20 50C35 35 50 35 65 50" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M25 40C40 25 55 25 70 40" stroke="%232d4428" stroke-width="3" stroke-linecap="round"/><path d="M30 60C45 45 60 45 75 60" stroke="%232d4428" stroke-width="3" stroke-linecap="round"/><path d="M35 70C45 60 55 60 65 70" stroke="%232d4428" stroke-width="2" stroke-linecap="round"/></svg>`,
  xeriscaping: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e6eee0"/><path d="M30 70C35 55 45 50 55 55C65 60 70 75 65 85" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><circle cx="35" cy="60" r="6" fill="%23e86f8c" stroke="%232d4428" stroke-width="2"/><circle cx="55" cy="65" r="4" fill="%23f4b41a" stroke="%232d4428" stroke-width="2"/><circle cx="45" cy="80" r="5" fill="%239b59b6" stroke="%232d4428" stroke-width="2"/><path d="M25 85H75" stroke="%232d4428" stroke-width="3"/><path d="M30 90H70" stroke="%232d4428" stroke-width="2"/></svg>`,
  dripIrrigation: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23e2ebd2"/><path d="M30 40L70 40" stroke="%232d4428" stroke-width="4" stroke-linecap="round"/><path d="M30 40V75" stroke="%232d4428" stroke-width="3"/><path d="M70 40V75" stroke="%232d4428" stroke-width="3"/><circle cx="35" cy="65" r="3" fill="%234a90e2"/><circle cx="45" cy="65" r="3" fill="%234a90e2"/><circle cx="55" cy="65" r="3" fill="%234a90e2"/><circle cx="65" cy="65" r="3" fill="%234a90e2"/><path d="M40 30C45 25 50 25 55 30" stroke="%233b703e" stroke-width="3" stroke-linecap="round"/></svg>`,
  hydrozoning: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="12" fill="%23d8e3c4"/><circle cx="35" cy="45" r="15" fill="%233b703e" opacity="0.3" stroke="%232d4428" stroke-width="2"/><circle cx="60" cy="45" r="12" fill="%23e86f8c" opacity="0.3" stroke="%232d4428" stroke-width="2"/><circle cx="48" cy="70" r="10" fill="%23f4b41a" opacity="0.3" stroke="%232d4428" stroke-width="2"/><circle cx="35" cy="45" r="4" fill="%232d4428"/><circle cx="60" cy="45" r="3" fill="%232d4428"/><circle cx="48" cy="70" r="3" fill="%232d4428"/></svg>`
}

export const CATEGORIES = [
  'All',
  'Climate Based',
  'Sustainability',
  'Technology',
  'Operations',
  'Marketing',
  'Finance'
] as const

export const dummyStrategies: Strategy[] = [
  {
    id: 'strat-1',
    title: 'Serial Blooming',
    category: 'Climate Based',
    summary: 'Flowering species planted along pathways bloom in different seasons, keeping streets vibrant year-round.',
    imageUrl: svgIllustrations.serialBlooming,
    keywords: ['blooming', 'seasonal', 'flowers', 'krumbiegel', 'bangalore', 'garden city'],
    fullDescription: 'Serial Blooming or Serial Planting is a system of planting trees and plants along a pathway, roadway or avenue in which flowering species suitable to the location\'s climate are installed in such a way that they blossom in different seasons, ensuring the streets are in bloom with different flowers year-round. Ideally, native or naturalised species compatible with each other and the climatic context are interspersed in rows rather than being planted monotypically across different areas of an urban space. This concept was initially developed by Gustav Hermann Krumbiegel, a renowned horticulturist of German origin, who implemented it in the city of Bengaluru, India, which came to be heralded as \'Garden City.\''
  },
  {
    id: 'strat-2',
    title: 'Wind Filtering of Plants and Windbreakers',
    category: 'Climate Based',
    summary: 'Tall canopy trees act as windbreakers, reducing wind speed and preventing soil erosion.',
    imageUrl: svgIllustrations.windFiltering,
    keywords: ['wind', 'windbreaker', 'microclimate', 'soil erosion', 'shade', 'temperature'],
    fullDescription: 'Trees in a space create a microclimate where wind is channelled based on planting patterns. Tall, canopying trees present themselves as effective windbreakers to arrest high-speed winds from entering or disrupting an area such as an agricultural field, garden or a protected residence. They can change the direction of winds, and their firm anchorage to the ground prevents soil erosion and loss of topsoil nutrients due to the action of wind. The filtering of wind by trees brings about a cooler, temperate climate in the region. On the other hand, medium-sized trees provide adequate shade for pedestrian paths and screen colder winds to gain heat during colder seasons.'
  },
  {
    id: 'strat-3',
    title: 'Xeriscaping',
    category: 'Climate Based',
    summary: 'Drought-tolerant plants reduce irrigation needs and preserve water without fertilisers or pesticides.',
    imageUrl: svgIllustrations.xeriscaping,
    keywords: ['xeriscaping', 'water conservation', 'drought-tolerant', 'succulents', 'arid climate', 'sustainable'],
    fullDescription: 'Xeriscaping is a practice of planting in landscapes to conserve water, reduce or eliminate irrigation through the use of plant species that are adapted to and can survive in scarce water conditions. By and large, drought-tolerant species are utilised to preserve water and reduce reliance on fertilisers, pesticides and the need for constant maintenance. This is a popular system adopted in dry, hot and arid climates to ensure certain native plants, succulents and regional, ornamental varieties can thrive. Turfs and lawns with grass beds are avoided as they consume higher amounts of water. Xeriscaping ensures that the landscapes designed do not appear dry and flat, rather lush and healthy.'
  },
  {
    id: 'strat-4',
    title: 'Drip Irrigation',
    category: 'Climate Based',
    summary: 'Water drips directly to roots through narrow pipes, minimizing evaporation and wastage.',
    imageUrl: svgIllustrations.dripIrrigation,
    keywords: ['drip irrigation', 'trickle irrigation', 'water efficiency', 'agriculture', 'gardening', 'conservation'],
    fullDescription: 'A method of irrigation which conveys water directly to plant roots, minimising water wastage, moisture loss through evaporation and runoff. Water from closely placed, narrow pipes drips and feeds the plant roots through an extensive network of water pipes, valves and tubes from tanks or borewells. It is one of the most efficient modes of irrigation in dry, arid and harsh environments where evaporation and loss of moisture are a leading cause of water wastage. This is predominantly used in agricultural fields, vegetable gardens and sometimes container plants. This method is proven to be cost efficient in the longer run.'
  },
  {
    id: 'strat-5',
    title: 'Hydrozoning',
    category: 'Climate Based',
    summary: 'Plants with similar water needs are grouped into zones, enabling efficient irrigation.',
    imageUrl: svgIllustrations.hydrozoning,
    keywords: ['hydrozoning', 'irrigation', 'water conservation', 'plant grouping', 'gardening', 'efficiency'],
    fullDescription: 'Hydrozoning is the practice of grouping or clustering plants with similar water needs together in zones called \'Hydrozones.\' This method proves instrumental in conserving water, managing efficient irrigation and ensuring plants receive optimum amounts of water and nutrients. This practice is popularly followed in residential gardens, urban parks, plazas and landscape beds. This creates a coherent method to prevent overwatering and underwatering of plants when grown on a mixed basis. This concept can be extended to the placement of these hydrozones; for instance, western exposures to sun builds-up more heat, requiring more water for plants; therefore, plants requiring lesser irrigation adapted to drier environments can be zoned towards western areas.'
  },
  {
    id: 'strat-6',
    title: 'Eco-Packaging Transition',
    category: 'Sustainability',
    summary: 'Replace plastics with biodegradable sugarcane pulp and recycled paperboard packaging.',
    imageUrl: svgIllustrations.packaging,
    keywords: ['packaging', 'plastic', 'compostable', 'waste', 'supply chain', 'recycling'],
    fullDescription: 'Transitioning to sustainable packaging drastically minimizes supply chain waste and reduces plastic emissions across product fulfillment cycles.'
  },
  {
    id: 'strat-7',
    title: 'Green Brand Positioning',
    category: 'Marketing',
    summary: 'Craft transparent sustainability narratives highlighting carbon offsets and ethical sourcing.',
    imageUrl: svgIllustrations.marketing,
    keywords: ['branding', 'marketing', 'trust', 'campaign', 'transparency', 'storytelling'],
    fullDescription: 'Authentic green marketing campaigns build long-term trust with environmentally conscious consumers while preventing greenwashing claims.'
  },
  {
    id: 'strat-8',
    title: 'Carbon Footprint Audit',
    category: 'Finance',
    summary: 'Evaluate Scope 1-3 carbon emissions to identify tax rebates and cost savings.',
    imageUrl: svgIllustrations.audit,
    keywords: ['finance', 'carbon', 'audit', 'esg', 'taxes', 'scope3', 'emissions'],
    fullDescription: 'Conduct comprehensive carbon audits to unlock financial tax credits, reduce energy overhead, and fulfill mandatory ESG reporting guidelines.'
  },
  {
    id: 'strat-9',
    title: 'Renewable Energy Integration',
    category: 'Technology',
    summary: 'Deploy solar arrays and microgrid systems to power facilities and reduce utility costs.',
    imageUrl: svgIllustrations.renewable,
    keywords: ['renewable', 'solar', 'wind', 'energy', 'tech', 'grid', 'infrastructure'],
    fullDescription: 'Transition facilities to on-site renewable energy systems to achieve grid independence and lower long-term utility costs.'
  },
  {
    id: 'strat-10',
    title: 'Circular Product Lifecycle',
    category: 'Technology',
    summary: 'Design modular products for easy disassembly, repairability, and material reclamation.',
    imageUrl: svgIllustrations.circular,
    keywords: ['circular', 'repair', 'recycling', 'design', 'lifecycle', 'reuse'],
    fullDescription: 'Implement closed-loop product designs allowing customer trade-ins and remanufacturing of used components into new product lines.'
  },
  {
    id: 'strat-11',
    title: 'Zero Waste Office Protocol',
    category: 'Operations',
    summary: 'Implement digitized workflows, composting, and zero-landfill sorting systems.',
    imageUrl: svgIllustrations.waste,
    keywords: ['office', 'zero waste', 'operations', 'compost', 'paperless', 'workplace'],
    fullDescription: 'Transform everyday office operations into zero-waste ecosystems by incentivizing digital document management and composting organic waste.'
  },
  {
    id: 'strat-12',
    title: 'Green Cloud Infrastructure',
    category: 'Technology',
    summary: 'Migrate to carbon-neutral cloud data centers powered by clean renewable energy.',
    imageUrl: svgIllustrations.cloud,
    keywords: ['cloud', 'serverless', 'hosting', 'technology', 'carbon neutral', 'data center'],
    fullDescription: 'Optimize digital footprint by hosting web applications on energy-efficient serverless clusters in eco-certified cloud regions.'
  }
]