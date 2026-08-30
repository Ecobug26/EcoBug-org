// lib/api/plants.ts

import { Plant } from '@/app/webtool/plantbank/types'
import { getSupabaseClient } from '@/lib/supabase/client'

const PLANTS_TABLE = 'plants'

const PLANT_COLUMNS =
  'id, sl_no, item, picture_1, picture_2, whole_plant_image, close_up_image, flower_image, fruit_image, leaf_image, common_name, family, plant_type, plant_form, habitat_system, habitat_type, natural_habitat_detail, purposes, iucn_status, foliage_colour, foliage_habit, flower_colour, flowering_season, flower_characteristic, fruit, seed_bearing_structure, fruit_description, climate_condition, agro_climatic_zone, koppen_zone_1, koppen_zone_2, soil_type, maintenance, growth_habit, height_5yr, height_10yr, height_20yr, mature_height, growth_height_m, spread_5yr, spread_10yr, spread_20yr, mature_canopy_spread, canopy_spread_m, leaf_description, lifespan_years, lifespan_class, additional_description, root_system, root_depth, source'

type PlantRow = Record<string, string | string[] | null>

function mapRow(row: PlantRow): Plant {
  return {
    id: row.id as string,
    slNo: (row.sl_no as string) ?? null,
    item: (row.item as string) ?? null,
    picture1: (row.picture_1 as string) ?? null,
    picture2: (row.picture_2 as string) ?? null,
    wholePlantImage: (row.whole_plant_image as string) ?? null,
    closeUpImage: (row.close_up_image as string) ?? null,
    flowerImage: (row.flower_image as string) ?? null,
    fruitImage: (row.fruit_image as string) ?? null,
    leafImage: (row.leaf_image as string) ?? null,
    commonName: (row.common_name as string) ?? '',
    family: (row.family as string) ?? null,
    plantType: (row.plant_type as string) ?? null,
    plantForm: (row.plant_form as string) ?? null,
    habitatSystem: (row.habitat_system as string) ?? null,
    habitatType: (row.habitat_type as string) ?? null,
    naturalHabitatDetail: (row.natural_habitat_detail as string) ?? null,
    purposes: (row.purposes as string) ?? null,
    iucnStatus: (row.iucn_status as string) ?? null,
    foliageColour: (row.foliage_colour as string) ?? null,
    foliageHabit: (row.foliage_habit as string) ?? null,
    flowerColour: (row.flower_colour as string) ?? null,
    floweringSeason: (row.flowering_season as string) ?? null,
    flowerCharacteristic: (row.flower_characteristic as string) ?? null,
    fruit: (row.fruit as string) ?? null,
    seedBearingStructure: (row.seed_bearing_structure as string) ?? null,
    fruitDescription: (row.fruit_description as string) ?? null,
    climateCondition: (row.climate_condition as string) ?? null,
    agroClimaticZone: (row.agro_climatic_zone as string) ?? null,
    koppenZone1: (row.koppen_zone_1 as string) ?? null,
    koppenZone2: (row.koppen_zone_2 as string) ?? null,
    soilType: (row.soil_type as string) ?? null,
    maintenance: (row.maintenance as string) ?? null,
    growthHabit: (row.growth_habit as string) ?? null,
    height5yr: (row.height_5yr as string) ?? null,
    height10yr: (row.height_10yr as string) ?? null,
    height20yr: (row.height_20yr as string) ?? null,
    matureHeight: (row.mature_height as string) ?? null,
    growthHeightM: (row.growth_height_m as string) ?? null,
    spread5yr: (row.spread_5yr as string) ?? null,
    spread10yr: (row.spread_10yr as string) ?? null,
    spread20yr: (row.spread_20yr as string) ?? null,
    matureCanopySpread: (row.mature_canopy_spread as string) ?? null,
    canopySpreadM: (row.canopy_spread_m as string) ?? null,
    leafDescription: (row.leaf_description as string) ?? null,
    lifespanYears: (row.lifespan_years as string) ?? null,
    lifespanClass: (row.lifespan_class as string) ?? null,
    additionalDescription: (row.additional_description as string) ?? null,
    rootSystem: (row.root_system as string) ?? null,
    rootDepth: (row.root_depth as string) ?? null,
    source: (row.source as string) ?? null,
  }
}

/**
 * Fetch all plants from Supabase. Returns [] when Supabase is not
 * configured or the query fails — the UI shows an empty state.
 */
export async function fetchPlants(): Promise<Plant[]> {
  const supabase = getSupabaseClient()
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from(PLANTS_TABLE)
      .select(PLANT_COLUMNS)
      .order('sl_no', { ascending: true })

    if (error) {
      console.error('Error fetching plants from Supabase:', error)
      return []
    }

    return (data ?? []).map(mapRow)
  } catch (error) {
    console.error('Unexpected error fetching plants:', error)
    return []
  }
}

/**
 * Fetch a single plant by ID from Supabase.
 */
export async function fetchPlantById(id: string): Promise<Plant | undefined> {
  const supabase = getSupabaseClient()
  if (!supabase) return undefined

  try {
    const { data, error } = await supabase
      .from(PLANTS_TABLE)
      .select(PLANT_COLUMNS)
      .eq('id', id)
      .maybeSingle()

    if (error || !data) {
      if (error) console.error('Error fetching plant from Supabase:', error)
      return undefined
    }

    return mapRow(data)
  } catch (error) {
    console.error('Unexpected error fetching plant:', error)
    return undefined
  }
}
