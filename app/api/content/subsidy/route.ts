import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'
const fallbackPath = path.join(process.cwd(), 'data', 'subsidy-content.json')

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/settings/subsidy`, { cache: 'no-store' })
        if (res.ok) {
            const text = await res.text()
            if (text && text.trim() !== 'null') {
                return new NextResponse(text, {
                    headers: { 'Content-Type': 'application/json' },
                })
            }
        }

        // Fallback to local JSON file
        if (!existsSync(fallbackPath)) {
            return NextResponse.json(
                { error: 'Content not found' },
                { status: 404 }
            )
        }

        const data = await fs.readFile(fallbackPath, 'utf-8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Fetch content error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        const res = await fetch(`${BACKEND_URL}/settings/subsidy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend error saving subsidy:', err)
            return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Content updated successfully',
        })
    } catch (error) {
        console.error('Update content error:', error)
        return NextResponse.json(
            { error: 'Failed to update content' },
            { status: 500 }
        )
    }
}
