import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'
const GALLERY_FALLBACK_PATH = path.join(process.cwd(), 'data', 'gallery.json')

export async function GET() {
    let categories: any[] | null = null
    let items: any[] | null = null

    try {
        const [categoriesRes, itemsRes] = await Promise.all([
            fetch(`${BACKEND_URL}/settings/gallery-categories`, { cache: 'no-store' }),
            fetch(`${BACKEND_URL}/gallery`, { cache: 'no-store' }),
        ])

        if (categoriesRes.ok) {
            const text = await categoriesRes.text()
            if (text && text.trim() !== 'null') {
                try { categories = JSON.parse(text) } catch { /* ignore */ }
            }
        }

        if (itemsRes.ok) {
            const data = await itemsRes.json()
            if (data && Array.isArray(data.items) && data.items.length > 0) {
                const mapped = data.items.map((item: any) => ({
                    ...item,
                    src: item.src || item.imageUrl || '',
                    tags: item.tags || [],
                    description: item.description || '',
                }))
                const hasImages = mapped.some((item: any) => item.src && item.src.trim() !== '')
                if (hasImages) items = mapped
            }
        }
    } catch { /* backend down */ }

    // If we got both from backend, return them
    if (categories !== null && items !== null) {
        return NextResponse.json({ categories, items })
    }

    // Fallback to local gallery.json
    try {
        if (existsSync(GALLERY_FALLBACK_PATH)) {
            const fileData = await fs.readFile(GALLERY_FALLBACK_PATH, 'utf-8')
            const fallback = JSON.parse(fileData)
            return NextResponse.json({
                categories: categories ?? fallback.categories ?? [],
                items: items ?? fallback.items ?? [],
            })
        }
    } catch { /* ignore */ }

    return NextResponse.json({ categories: categories ?? [], items: items ?? [] })
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.categories || !body.items) {
            return NextResponse.json({ error: 'Invalid gallery data structure' }, { status: 400 })
        }

        // Save categories to settings key; items are managed individually via upload/delete
        const res = await fetch(`${BACKEND_URL}/settings/gallery-categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body.categories),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend error saving gallery categories:', err)
            return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Gallery updated successfully',
        })
    } catch (error) {
        console.error('Update gallery error:', error)
        return NextResponse.json(
            { error: 'Failed to update gallery' },
            { status: 500 }
        )
    }
}
