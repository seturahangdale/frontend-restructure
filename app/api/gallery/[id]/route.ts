import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const res = await fetch(`${BACKEND_URL}/gallery/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend gallery update error:', err)
            return NextResponse.json(
                { error: 'Failed to update item' },
                { status: res.status }
            )
        }

        const data = await res.json()
        return NextResponse.json({
            success: true,
            message: 'Gallery item updated successfully',
            ...data,
        })
    } catch (error) {
        console.error('Update item error:', error)
        return NextResponse.json(
            { error: 'Failed to update item' },
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

        const res = await fetch(`${BACKEND_URL}/gallery/${id}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Backend gallery delete error:', err)
            return NextResponse.json(
                { error: 'Failed to delete item' },
                { status: res.status }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Gallery item deleted successfully',
        })
    } catch (error) {
        console.error('Delete item error:', error)
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        )
    }
}
