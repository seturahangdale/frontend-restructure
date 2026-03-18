import type { Metadata } from 'next'
import { SubsidyContent } from '@/components/subsidy-content'

export const metadata: Metadata = {
  title: 'Film Subsidies & Incentives in Madhya Pradesh',
  description:
    'Explore MP government subsidies and financial incentives for film productions. Get up to ₹2 crore subsidy for shooting in Madhya Pradesh.',
  keywords: ['MP film subsidy', 'Madhya Pradesh film incentive', 'film grant India', 'film shooting subsidy'],
  alternates: { canonical: 'https://filmindustrymp.com/subsidy' },
  openGraph: {
    title: 'Film Subsidies & Incentives in Madhya Pradesh | Film Industry MP',
    description: 'Get up to ₹2 crore subsidy for shooting in Madhya Pradesh. Learn about MP government film incentives.',
    url: 'https://filmindustrymp.com/subsidy',
  },
}

export default function SubsidyPage() {
  return <SubsidyContent />
}



