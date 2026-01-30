import { Metadata } from 'next'
import { ProjectsContent } from '@/components/projects-content'

export const metadata: Metadata = {
  title: 'Films Shot in Madhya Pradesh | Film Industry MP',
  description: 'Discover productions that have been filmed in Madhya Pradesh, from Hindi films to international documentaries and web series.',
}

export default function Projects() {
  return <ProjectsContent />
}
