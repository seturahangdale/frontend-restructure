import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

export async function GET() {
    try {
        const session = (await cookies()).get('session')?.value;
        if (!session) {
            return NextResponse.json({ error: 'No session' }, { status: 401 });
        }
        await decrypt(session);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
}

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        try {
            const payload = await decrypt(token);

            // Return only safe payload info
            return NextResponse.json({
                success: true,
                type: payload.type,
                expires: payload.expires
            });
        } catch (e) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
    }
}
