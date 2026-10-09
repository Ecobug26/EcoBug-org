export type Post = {
  slug: string
  title: string
  category: string
  read: string
  image: string
  excerpt: string
  body: string[]
}

const ORIGIN_IMAGE = '/images/origin.png'

export const posts: Post[] = [
  {
    slug: 'right-plant-right-place',
    title: 'The Right Plant for the Right Place',
    category: 'Plant Selection',
    read: '4 min',
    image: '/images/blog_1.png',
    excerpt:
      'Why a plant thrives in one place but struggles in another — and how our Plant Bank matches plants to the places they belong.',
    body: [
      'Have you ever wondered why a plant thrives in one place but struggles in another? The answer often has less to do with the plant itself and more to do with where it has been placed.',
      'Every plant has its own needs. Some prefer direct sunlight, while others grow better in shade. Some need well-drained soil, while others prefer moisture. Temperature, rainfall, soil type, space, and maintenance all play a role in how well a plant grows.',
      'This is why plant selection should be more than choosing something that looks good. At ECOBUG, we are developing a Plant Bank that brings these characteristics together. It can help identify plants suitable for a particular location based on its environmental and spatial conditions. The idea is simple: instead of asking "Which plant looks good here?", we can start asking "Which plant belongs here?" Sometimes, the best landscapes are the ones where the plants seem like they were always meant to be there.',
    ],
  },
  {
    slug: 'nature-part-of-design',
    title: 'When Nature Becomes Part of the Design',
    category: 'Design Philosophy',
    read: '4 min',
    image: '/images/blog_2.png',
    excerpt:
      'What if the landscape was considered from the very beginning — designing around what a site already is?',
    body: [
      'We often think of landscape as something that is added to a building. A lawn here, a few trees there, perhaps a pathway connecting everything together. But what if the landscape was considered from the very beginning?',
      'A site already has its own character. It has trees, slopes, soil, sunlight, wind, water, and perhaps even wildlife. Designing around these existing conditions can create spaces that feel more natural and connected to their surroundings. Sometimes, preserving an existing tree can be more meaningful than planting ten new ones. Sometimes, allowing rainwater to follow its natural path can be better than forcing it somewhere else.',
      'Landscape architecture is not always about adding more. It can also be about understanding what is already there and knowing what should remain. Good design does not always make nature fit the space. Sometimes, it allows the space to fit into nature.',
    ],
  },
  {
    slug: 'why-places-feel-cooler',
    title: 'Why Do Some Places Feel Cooler?',
    category: 'Climate',
    read: '4 min',
    image: '/images/blog_3.png',
    excerpt:
      'Trees shade, filter, cool and protect — how thinking of plants as performers changes the way we design.',
    body: [
      'Have you ever walked through a tree-lined street on a hot afternoon and immediately felt the difference?',
      'Trees and vegetation can have a significant impact on how we experience outdoor spaces. They provide shade, reduce direct solar exposure, and can influence the temperature of the spaces around them. The arrangement of a landscape matters too. A large tree in the right location can create a comfortable resting space, while vegetation placed along a building can help reduce heat gain. This is where climate becomes an important part of landscape design.',
      'Instead of treating plants as decoration, we can think of them as elements that perform. They can shade, filter, cool, protect, attract, and even help manage water. A landscape can be beautiful because of its colours and forms. But sometimes, its most important qualities are the ones we cannot immediately see.',
    ],
  },
  {
    slug: 'garden-more-than-plants',
    title: 'A Garden Is More Than Plants',
    category: 'Biodiversity',
    read: '4 min',
    image: '/images/blog_4.png',
    excerpt:
      'Soil, insects, birds, water and plants constantly interact — why a little wildness can make a space more alive.',
    body: [
      'When we imagine a garden, we usually think about plants first. But a garden is a small ecosystem made up of much more than greenery. Soil, insects, birds, water, sunlight, microorganisms, and plants constantly interact with one another. Even something as simple as a flowering plant can become a source of food for pollinators.',
      'This makes biodiversity an important part of landscape design. Using a variety of plants with different heights, textures, flowering periods, and functions can create more opportunities for different species to inhabit a space. Native and locally adapted plants can also play an important role in supporting the surrounding ecosystem.',
      'A landscape does not have to be a perfectly controlled garden. Sometimes, allowing a little wildness into a space can make it more alive.',
    ],
  },
  {
    slug: 'welcome-to-ecobug',
    title: 'Welcome to Ecobug',
    category: 'Introduction',
    read: '4 min',
    image: '/images/intro.png',
    excerpt:
      'Whether its a residential garden, a commercial complex, or a public park, thoughtful landscape planning can improve functionality, sustainability, and overall well-being.',
    body: [
      'A well-designed landscape does more than enhance the appearance of a property; it shapes how people experience and interact with the space. Whether its a residential garden, a commercial complex, or a public park, thoughtful landscape planning can improve functionality, sustainability, and overall well-being.',
      'At ECOBUG, we help bring these ideas to life through landscaping consultancy and software solutions that simplify the design process. Our goal is to help create outdoor spaces that are not only visually appealing but also practical and environmentally responsible.',
      'Who Are We and What Do We Do?',
      'The name ECOBUG reflects our commitment to nature. We believe that a healthy balance between flora, fauna, and the built environment is essential for creating landscapes that thrive. Our mission is to help clients design outdoor spaces that are functional, aesthetically pleasing, and environmentally responsible.',
'Our blogs intend to convey ideas, suggestions and tips for better landscaping. We hope that these writings can help the users understand that landscaping is not all aesthetics. Our objective is to shed light on landscaping practices and help you design an ethical and sustainable design.',
'Thank you for taking the time to learn about ECOBUG. We look forward to sharing more insights, ideas, and practical tips to help you create landscapes that are beautiful, sustainable, and built to last. We hope you will join us as we explore the world of thoughtful landscaping together.',
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
