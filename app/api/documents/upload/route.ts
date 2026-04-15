import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const title = formData.get('title') as string
        const buttonLabel = formData.get('buttonLabel') as string
        const type = formData.get('type') as string
        const serviceKey = formData.get('serviceKey') as string | null

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes: Record<string, string[]> = {
            form: ['application/pdf'],
            guide: ['application/pdf'],
            pamphlet: ['image/png', 'image/jpeg', 'image/jpg'],
            visiting_card: ['image/png', 'image/jpeg', 'image/jpg'],
        }

        const isPDFType = (type === 'form' || type === 'guide') && file.name.toLowerCase().endsWith('.pdf')
        if (!isPDFType && !allowedTypes[type]?.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type for this category' },
                { status: 400 }
            )
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            )
        }

        // Build proxy form data for backend
        const proxyForm = new FormData()
        proxyForm.append('file', file, file.name)
        proxyForm.append('type', type)
        proxyForm.append('title', title || file.name)
        proxyForm.append('buttonLabel', buttonLabel || getDefaultButtonLabel(type))
        if (serviceKey) proxyForm.append('serviceKey', serviceKey)

        const res = await fetch(`${BACKEND_URL}/documents/upload`, {
            method: 'POST',
            body: proxyForm,
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend document upload error:', err)
            return NextResponse.json(
                { error: 'Failed to upload file' },
                { status: 500 }
            )
        }

        const data = await res.json()
        // Normalize filepath to include backend base URL if it's a relative path
        if (data.document && data.document.filepath && !data.document.filepath.startsWith('http')) {
            data.document.filepath = `https://film-api.indusanalytics.co.in${data.document.filepath}`
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        )
    }
}

function getDefaultButtonLabel(type: string): string {
    const defaults: Record<string, string> = {
        form: 'Download Form',
        pamphlet: 'View Pamphlet',
        visiting_card: 'Download Card',
    }
    return defaults[type] || 'Download'
}
