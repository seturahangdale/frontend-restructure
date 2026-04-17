import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

// Static guide fallbacks (PDFs in /public/forms/)
const GUIDE_FALLBACKS = [
    { id: 4001, title: 'Film Shooting Guide',        buttonLabel: 'Film Shooting Guide',        type: 'guide', serviceKey: 'film-shooting',         filepath: '/forms/film-shooting-guide-mp.pdf' },
    { id: 4002, title: 'Movie Promotion Guide',      buttonLabel: 'Movie Promotion Guide',      type: 'guide', serviceKey: 'movie-promotion',        filepath: '/forms/film-promotion-guide-mp.pdf' },
    { id: 4003, title: 'Celebrity Management Guide', buttonLabel: 'Celebrity Management Guide', type: 'guide', serviceKey: 'celebrity-management',   filepath: '/forms/celebrity-management-guide-mp.pdf' },
    { id: 4004, title: 'Subsidy Related Guide',      buttonLabel: 'Subsidy Related Guide',      type: 'guide', serviceKey: 'subsidy',                filepath: '/forms/subsidy-guide-mp.pdf' },
    { id: 4005, title: 'Theatre Advertisement Guide',buttonLabel: 'Theatre Advertisement Guide',type: 'guide', serviceKey: 'theatre-advertisement',  filepath: '/forms/theatre-advertisement-guide-mp.pdf' },
]

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        const url = new URL(`${BACKEND_URL}/documents`)
        if (type) url.searchParams.set('type', type)

        let backendDocs: any[] = []
        try {
            const res = await fetch(url.toString(), { cache: 'no-store' })
            if (res.ok) {
                const data = await res.json()
                backendDocs = data.documents || []
            }
        } catch { /* backend down */ }

        // Merge: for each guide fallback, use it only if backend doesn't have that serviceKey
        const backendServiceKeys = new Set(backendDocs.map((d: any) => d.serviceKey).filter(Boolean))
        const missingGuides = GUIDE_FALLBACKS.filter(g => !backendServiceKeys.has(g.serviceKey))

        const documents = [...backendDocs, ...missingGuides]
        return NextResponse.json({ documents })
    } catch (error) {
        console.error('Get documents error:', error)
        return NextResponse.json({ documents: GUIDE_FALLBACKS })
    }
}
