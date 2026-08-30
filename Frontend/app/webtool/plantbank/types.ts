// Frontend/app/webtool/plantbank/types.ts

export interface Plant {
  id: string
  slNo: string | null
  item: string | null
  // Images (Supabase Storage URLs or external URLs)
  picture1: string | null
  picture2: string | null
  wholePlantImage: string | null
  closeUpImage: string | null
  flowerImage: string | null
  fruitImage: string | null
  leafImage: string | null
  // Identity
  commonName: string
  family: string | null
  plantType: string | null
  plantForm: string | null
  habitatSystem: string | null
  habitatType: string | null
  naturalHabitatDetail: string | null
  // Uses / conservation
  purposes: string | null
  iucnStatus: string | null
  // Foliage & reproduction
  foliageColour: string | null
  foliageHabit: string | null
  flowerColour: string | null
  floweringSeason: string | null
  flowerCharacteristic: string | null
  fruit: string | null
  seedBearingStructure: string | null
  fruitDescription: string | null
  // Climate & site
  climateCondition: string | null
  agroClimaticZone: string | null
  koppenZone1: string | null
  koppenZone2: string | null
  soilType: string | null
  // Growth
  maintenance: string | null
  growthHabit: string | null
  height5yr: string | null
  height10yr: string | null
  height20yr: string | null
  matureHeight: string | null
  growthHeightM: string | null
  spread5yr: string | null
  spread10yr: string | null
  spread20yr: string | null
  matureCanopySpread: string | null
  canopySpreadM: string | null
  leafDescription: string | null
  lifespanYears: string | null
  lifespanClass: string | null
  additionalDescription: string | null
  rootSystem: string | null
  rootDepth: string | null
  source: string | null
}

/** Fields exposed in the filter panel (all categorical fields) */
export const PLANT_FILTER_FIELDS: { key: keyof Plant; label: string }[] = [
  { key: 'family', label: 'Family' },
  { key: 'plantType', label: 'Plant type' },
  { key: 'plantForm', label: 'Plant form' },
  { key: 'habitatSystem', label: 'Habitat system' },
  { key: 'habitatType', label: 'Habitat type' },
  { key: 'iucnStatus', label: 'IUCN status' },
  { key: 'foliageHabit', label: 'Foliage habit' },
  { key: 'floweringSeason', label: 'Flowering season' },
  { key: 'climateCondition', label: 'Climate' },
  { key: 'agroClimaticZone', label: 'Agro-climatic zone' },
  { key: 'koppenZone1', label: "Koppen zone 1" },
  { key: 'koppenZone2', label: "Koppen zone 2" },
  { key: 'soilType', label: 'Soil type' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'growthHabit', label: 'Growth habit' },
  { key: 'lifespanClass', label: 'Lifespan class' },
  { key: 'rootSystem', label: 'Root system' },
]
