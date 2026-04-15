import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'
const fallbackPath = path.join(process.cwd(), 'data', 'about.json')

export async function GET() {
    try {
        const res = await fetch(`${BACKEND_URL}/settings/about`, { cache: 'no-store' })
        if (res.ok) {
            const text = await res.text()
            // Backend returns null (the string "null") when no data exists yet
            if (text && text.trim() !== 'null') {
                return new NextResponse(text, {
                    headers: { 'Content-Type': 'application/json' },
                })
            }
        }

        // Fallback to local JSON file
        const data = await fs.readFile(fallbackPath, 'utf8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        console.error('Error reading about data:', error)
        return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        // Simple validation
        if (!body.whoWeAre || !body.whatWeDo) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
        }

        const res = await fetch(`${BACKEND_URL}/settings/about`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend error saving about:', err)
            return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
        }

        return NextResponse.json({ message: 'About data updated successfully' })
    } catch (error) {
        console.error('Error updating about data:', error)
        return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
    }
}
