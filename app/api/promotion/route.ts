import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'
const fallbackPath = path.join(process.cwd(), 'data', 'promotion.json')

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/settings/promotion`, { cache: 'no-store' })
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

        return NextResponse.json({})
    } catch (error) {
        console.error('Fetch promotion error:', error)
        return NextResponse.json({ error: 'Failed to fetch promotion data' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()

        const res = await fetch(`${BACKEND_URL}/settings/promotion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend error saving promotion:', err)
            return NextResponse.json({ error: 'Failed to update promotion data' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Promotion data updated successfully' })
    } catch (error) {
        console.error('Update promotion error:', error)
        return NextResponse.json({ error: 'Failed to update promotion data' }, { status: 500 })
    }
}
