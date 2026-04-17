import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { backendGet, backendPost } from '@/lib/backend-fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const fallbackPath = path.join(process.cwd(), 'data', 'about.json')

export async function GET() {
    const data = await backendGet('/settings/about')
    if (data) return NextResponse.json(data)

    try {
        const raw = await fs.readFile(fallbackPath, 'utf-8')
        return NextResponse.json(JSON.parse(raw))
    } catch { /* ignore */ }

    return NextResponse.json({})
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (!body.whoWeAre || !body.whatWeDo)
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
        await backendPost('/settings/about', body)
        return NextResponse.json({ message: 'About data updated successfully' })
    } catch {
        return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 })
    }
}
