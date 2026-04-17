/**
 * backendFetch — Backend ke saath communicate karne ka ek jagah.
 * Backend down ho to error throw nahi karta, null return karta hai.
 * Har API route yahi use karega — baar baar try/catch likhne ki zaroorat nahi.
 */

const BACKEND_URL = process.env.INTERNAL_API_URL || 'https://film-api.indusanalytics.co.in/api'

export async function backendGet(path: string): Promise<any | null> {
    try {
        const res = await fetch(`${BACKEND_URL}${path}`, { cache: 'no-store' })
        if (!res.ok) return null
        const text = await res.text()
        if (!text || text.trim() === 'null') return null
        return JSON.parse(text)
    } catch {
        return null  // Backend down — caller handles fallback
    }
}

export async function backendPost(path: string, body: any): Promise<boolean> {
    try {
        const res = await fetch(`${BACKEND_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        return res.ok
    } catch {
        return false  // Backend down — caller handles fallback
    }
}
