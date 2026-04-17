import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { backendGet, backendPost } from '@/lib/backend-fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const fallbackPath = path.join(process.cwd(), 'data', 'social.json')

export async function GET() {
    const data = await backendGet('/settings/social')
    if (data) return NextResponse.json(data)

    try {
        if (existsSync(fallbackPath)) {
            const raw = await fs.readFile(fallbackPath, 'utf-8')
            return NextResponse.json(JSON.parse(raw))
        }
    } catch { /* ignore */ }

    return NextResponse.json({ videoCategories: [], socialLinks: [] })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        await backendPost('/settings/social', body)
        return NextResponse.json({ success: true, message: 'Social data updated successfully' })
    } catch {
        return NextResponse.json({ error: 'Failed to update social data' }, { status: 500 })
    }
}
