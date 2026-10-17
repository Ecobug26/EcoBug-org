import type { Metadata } from 'next'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog | EcoBug',
  description:
    'Notes on landscape design, plant selection, climate and biodiversity from the EcoBug team.',
}

export default function Blog() {
  return <BlogList />
}