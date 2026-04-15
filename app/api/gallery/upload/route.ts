import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Proxy the multipart form data directly to the backend
        // The backend expects: image, title, location, category, year, description
        // The frontend may send: file, title, category, description, tags
        // We remap 'file' -> 'image' and handle missing fields
        const file = formData.get('file') as File | null
        const image = formData.get('image') as File | null
        const actualFile = image ?? file

        if (!actualFile) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        if (!actualFile.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 })
        }

        const proxyForm = new FormData()
        proxyForm.append('image', actualFile, actualFile.name)
        proxyForm.append('title', (formData.get('title') as string) || 'Untitled')
        proxyForm.append('location', (formData.get('location') as string) || '')
        proxyForm.append('category', (formData.get('category') as string) || 'others')

        const year = formData.get('year') as string | null
        if (year) proxyForm.append('year', year)

        const description = formData.get('description') as string | null
        if (description) proxyForm.append('description', description)

        const res = await fetch(`${BACKEND_URL}/gallery/upload`, {
            method: 'POST',
            body: proxyForm,
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend gallery upload error:', err)
            return NextResponse.json({ error: 'Failed to upload gallery image' }, { status: 500 })
        }

        const data = await res.json()
        // Normalize response: backend returns { success, item } with item.imageUrl
        // Frontend expects { success, item } with item.src
        if (data.item && data.item.imageUrl && !data.item.src) {
            data.item.src = `https://film-api.indusanalytics.co.in${data.item.imageUrl}`
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Gallery upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload gallery image' },
            { status: 500 }
        )
    }
}
