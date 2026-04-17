import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { backendGet, backendPost } from '@/lib/backend-fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const fallbackPath = path.join(process.cwd(), 'data', 'pathshala-videos.json')

export async function GET() {
    const data = await backendGet('/settings/pathshala-videos')
    if (data) return NextResponse.json(data)

    try {
        if (existsSync(fallbackPath)) {
            const raw = await fs.readFile(fallbackPath, 'utf-8')
            return NextResponse.json(JSON.parse(raw))
        }
    } catch { /* ignore */ }

    return NextResponse.json({ videos: [] })
}

export async function POST(request: NextRequest) {
    let body: any
    try { body = await request.json() }
    catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

    // Always save locally first (instant, reliable)
    try { await fs.writeFile(fallbackPath, JSON.stringify(body, null, 2), 'utf-8') }
    catch { /* ignore */ }

    // Also sync to backend if available
    await backendPost('/settings/pathshala-videos', body)

    return NextResponse.json({ success: true })
}
