import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { title, buttonLabel } = body

        const res = await fetch(`${BACKEND_URL}/documents/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, buttonLabel }),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend document update error:', err)
            return NextResponse.json(
                { error: 'Failed to update document' },
                { status: res.status }
            )
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json(
            { error: 'Failed to update document' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const res = await fetch(`${BACKEND_URL}/documents/${id}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend document delete error:', err)
            return NextResponse.json(
                { error: 'Failed to delete document' },
                { status: res.status }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Document deleted successfully',
        })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json(
            { error: 'Failed to delete document' },
            { status: 500 }
        )
    }
}
