import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { backendGet, backendPost } from '@/lib/backend-fetch'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const fallbackPath = path.join(process.cwd(), 'data', 'promotion.json')

export async function GET() {
    const data = await backendGet('/settings/promotion')
    if (data) return NextResponse.json(data)

    try {
        if (existsSync(fallbackPath)) {
            const raw = await fs.readFile(fallbackPath, 'utf-8')
            return NextResponse.json(JSON.parse(raw))
        }
    } catch { /* ignore */ }

    return NextResponse.json({})
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await backendPost('/settings/promotion', body)
        return NextResponse.json({ message: 'Promotion data updated successfully' })
    } catch {
        return NextResponse.json({ error: 'Failed to update promotion data' }, { status: 500 })
    }
}
