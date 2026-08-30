-- Supabase schema for the Plant Bank
-- Run in the Supabase SQL editor, then import your real plant data
-- (CSV import via Table Editor works — match the column names below).

create table if not exists public.plants (
  id uuid primary key default gen_random_uuid(),
  sl_no text,
  item text,
  picture_1 text,
  picture_2 text,
  whole_plant_image text,
  close_up_image text,
  flower_image text,
  fruit_image text,
  leaf_image text,
  common_name text not null,
  family text,
  plant_type text,
  plant_form text,
  habitat_system text,
  habitat_type text,
  natural_habitat_detail text,
  purposes text,
  iucn_status text,
  foliage_colour text,
  foliage_habit text,
  flower_colour text,
  flowering_season text,
  flower_characteristic text,
  fruit text,
  seed_bearing_structure text,
  fruit_description text,
  climate_condition text,
  agro_climatic_zone text,
  koppen_zone_1 text,
  koppen_zone_2 text,
  soil_type text,
  maintenance text,
  growth_habit text,
  height_5yr text,
  height_10yr text,
  height_20yr text,
  mature_height text,
  growth_height_m text,
  spread_5yr text,
  spread_10yr text,
  spread_20yr text,
  mature_canopy_spread text,
  canopy_spread_m text,
  leaf_description text,
  lifespan_years text,
  lifespan_class text,
  additional_description text,
  root_system text,
  root_depth text,
  source text,
  created_at timestamptz not null default now()
);

alter table public.plants enable row level security;

create policy "Public read access to plants"
  on public.plants for select
  to anon
  using (true);
