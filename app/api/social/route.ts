import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'
const fallbackPath = path.join(process.cwd(), 'data', 'social.json')

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/settings/social`, { cache: 'no-store' })
        if (res.ok) {
            const text = await res.text()
            if (text && text.trim() !== 'null') {
                return new NextResponse(text, {
                    headers: { 'Content-Type': 'application/json' },
                })
            }
        }

        // Fallback to local JSON file
        if (existsSync(fallbackPath)) {
            const data = await fs.readFile(fallbackPath, 'utf-8')
            return NextResponse.json(JSON.parse(data))
        }

        return NextResponse.json({ videoCategories: [], socialLinks: [] })
    } catch (error) {
        console.error('Fetch social error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch social data' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const res = await fetch(`${BACKEND_URL}/settings/social`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend error saving social:', err)
            return NextResponse.json({ error: 'Failed to update social data' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Social data updated successfully',
        })
    } catch (error) {
        console.error('Update social error:', error)
        return NextResponse.json(
            { error: 'Failed to update social data' },
            { status: 500 }
        )
    }
}
