'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'

export function NavbarWrapper() {
    const pathname = usePathname()
    const isAuthPage = pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/reset-password'
    const hasOwnNav = pathname === '/film-pathshala' || pathname === '/'

    if (isAuthPage || hasOwnNav) return null

    return <Navbar />
}
