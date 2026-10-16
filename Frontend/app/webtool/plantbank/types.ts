/**
 * Plant Bank data model — mirrors the Figma "PLANT BANK" detail screen
 * (Areca Lutescans entry) and the list card fields.
 */

/** One labelled attribute block in the detail grid (e.g. Foliage, Climate). */
export interface PlantAttribute {
  heading: string
  /** Small value lines rendered under the heading (e.g. "Colour: Green"). */
  lines: string[]
  /** Renders the tiny green MORE pill seen on some Figma blocks. */
  more?: boolean
}

export interface Plant {
  id: string
  /** Big detail title, e.g. ARECA LUTESCANS */
  scientificName: string
  /** Subtitle under the title, e.g. PALM */
  subtitle: string
  /** Common Names row, e.g. ARECA PALM */
  commonNames: string
  imageUrl: string
  /** List card fields (Figma list card: PLANT TYPE / FOLIAGE COLOUR / CLIMATIC ZONE). */
  plantType: string
  foliageColour: string
  climaticZone: string
  /** Detail attribute grid in Figma display order (9 blocks + 3 growth blocks). */
  attributes: PlantAttribute[]
  iucnStatus: string
  uses: string
  /** Search keywords for the list filter. */
  keywords: string[]
}
