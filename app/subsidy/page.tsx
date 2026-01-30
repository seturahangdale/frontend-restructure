import { Metadata } from 'next'
import { SubsidyContent } from '@/components/subsidy-content'

export const metadata: Metadata = {
  title: 'MP Film Subsidy Scheme - Film Industry MP',
  description: 'Learn about the Madhya Pradesh Film Subsidy Scheme offering up to 35% subsidies for Hindi, international, and web series productions.',
}

export default function Subsidy() {
  return <SubsidyContent />
}
