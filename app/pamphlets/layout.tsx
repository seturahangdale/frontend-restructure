import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Film Shooting Guides & Pamphlets',
  description:
    'Download official film shooting guides and pamphlets for Madhya Pradesh. Everything a production team needs to plan a shoot in MP.',
  keywords: ['film shooting guide MP', 'Madhya Pradesh film pamphlet', 'film production guide India'],
  alternates: { canonical: 'https://filmindustrymp.com/pamphlets' },
  openGraph: {
    title: 'Film Shooting Guides & Pamphlets | Film Industry MP',
    description: 'Download official film shooting guides for Madhya Pradesh.',
    url: 'https://filmindustrymp.com/pamphlets',
  },
}

export default function PamphletsLayout({ children }: { children: React.ReactNode }) {
  return children
}
