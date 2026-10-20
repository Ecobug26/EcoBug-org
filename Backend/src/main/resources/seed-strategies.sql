-- ============================================================================
-- EcoBug Strategy Seed Data
-- Run this in Supabase SQL Editor AFTER the backend has started once
-- Image URLs are placeholders — replace with real illustration URLs.
-- ============================================================================

-- Clear existing strategy data (uncomment if re-seeding)
-- DELETE FROM strategy_keywords;
-- DELETE FROM strategies;

-- ----------------------------------------------------------------------------
-- 1. CLIMATE BASED — Serial Blooming
-- ----------------------------------------------------------------------------
INSERT INTO strategies (title, category, summary, image_url, full_description) VALUES
(
  'Serial Blooming',
  'climate based',
  'Serial Blooming plants flowering species along pathways so streets bloom year-round across seasons.',
  'https://images.ecobug.app/strategies/climate-based-serial-blooming.jpg',
  $$Serial Blooming or Serial Planting is a system of planting trees and plants along a pathway, roadway or avenue in which flowering species suitable to the location's climate are installed in such a way that they blossom in different seasons, ensuring the streets are in bloom with different flowers year-round. In this method, flowering species need to be chosen such that a few blossom in winters, a few in monsoons, a few in summers, and a few in springs and autumns, keeping the avenues vibrant and colourful perennially through seasonal blooming. Ideally, native or naturalised species compatible with each other and the climatic context are interspersed in rows rather than being planted monotypically across different areas of an urban space. This concept was initially developed by Gustav Hermann Krumbiegel, a renowned horticulturist of German origin, who implemented it in the city of Bengaluru, India, which came to be heralded as 'Garden City'.$$
),
(
  'Wind Filtering of Plants and Windbreakers',
  'climate based',
  'Tall canopying trees act as windbreakers, channel wind, prevent soil erosion, and create cooler microclimates.',
  'https://images.ecobug.app/strategies/climate-based-wind-filtering.jpg',
  $$Generally, the presence of trees in a space creates a microclimate in which wind is often channelled based on the planting patterns, a system that can be improvised to benefit the landscape and users. Tall, canopying trees can often present themselves as effective windbreakers to arrest high-speed winds from entering or disrupting an area such as an agricultural field, garden or a protected residence. They can change the direction of the winds, and their firm anchorage to the ground prevents soil erosion and loss of topsoil nutrients due to the action of wind. The filtering of wind by trees brings about a cooler, temperate climate in the region. On the other hand, medium-sized trees provide adequate shade for pedestrian paths and screen colder winds to gain heat during colder seasons.$$
);

-- ----------------------------------------------------------------------------
-- 1. CLIMATE BASED — Xeriscaping
-- ----------------------------------------------------------------------------
INSERT INTO strategies (title, category, summary, image_url, full_description) VALUES
(
  'Xeriscaping',
  'climate based',
  'Xeriscaping conserves water using drought-tolerant species adapted to scarce water conditions.',
  'https://images.ecobug.app/strategies/climate-based-xeriscaping.jpg',
  $$Xeriscaping is a practice of planting in landscapes to conserve water, reduce or eliminate irrigation through the use of plant species that are adapted to and can survive in scarce water conditions. By and large, drought-tolerant species are utilised to preserve water and reduce reliance on fertilisers, pesticides and the need for constant maintenance. This is a popular system adopted in dry, hot and arid climates to ensure certain native plants, succulents and regional, ornamental varieties can thrive in the space. In order to achieve this, soil and site analysis, plant selection, and planting scheme must be effectively done. Certain exotic species well-suited to the climate can also be used, provided they are not destructive to the other native plants used in the palette. Turfs and lawns with grass beds are avoided while planting in such dry landscapes as they consume higher amounts of water. Xeriscaping ensures that the landscapes designed do not appear dry and flat, rather lush and healthy.$$
);