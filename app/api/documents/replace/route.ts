import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const id = formData.get('id') as string | null

        if (!file || !id) {
            return NextResponse.json({ error: 'File and document ID are required' }, { status: 400 })
        }

        const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
        if (!isPDF) {
            return NextResponse.json({ error: 'Only PDF files are allowed for guides' }, { status: 400 })
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 })
        }

        // Proxy to backend: upload new file then update the document record
        // The backend doesn't have a dedicated replace endpoint, so we:
        // 1. Delete the old document
        // 2. Upload the new one with the same metadata

        // First, fetch the existing document metadata
        const getRes = await fetch(`${BACKEND_URL}/documents`, { cache: 'no-store' })
        if (!getRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
        }

        const { documents } = await getRes.json()
        const existing = documents?.find((d: any) => String(d.id) === String(id))

        if (!existing) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 })
        }

        // Upload the new file with the same metadata
        const proxyForm = new FormData()
        proxyForm.append('file', file, file.name)
        proxyForm.append('type', existing.type)
        proxyForm.append('title', existing.title)
        proxyForm.append('buttonLabel', existing.buttonLabel)
        if (existing.serviceKey) proxyForm.append('serviceKey', existing.serviceKey)

        const uploadRes = await fetch(`${BACKEND_URL}/documents/upload`, {
            method: 'POST',
            body: proxyForm,
        })

        if (!uploadRes.ok) {
            const err = await uploadRes.text()
            console.error('Backend replace upload error:', err)
            return NextResponse.json({ error: 'Failed to replace file' }, { status: 500 })
        }

        const uploadData = await uploadRes.json()

        // Delete the old document
        await fetch(`${BACKEND_URL}/documents/${id}`, { method: 'DELETE' })

        if (uploadData.document && uploadData.document.filepath && !uploadData.document.filepath.startsWith('http')) {
            uploadData.document.filepath = `https://film-api.indusanalytics.co.in${uploadData.document.filepath}`
        }

        return NextResponse.json({ success: true, document: uploadData.document })
    } catch (error) {
        console.error('Replace error:', error)
        return NextResponse.json({ error: 'Failed to replace file' }, { status: 500 })
    }
}
