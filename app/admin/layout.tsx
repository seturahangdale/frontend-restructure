'use client'

import { useEffect } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('admin-page')
    return () => document.body.classList.remove('admin-page')
  }, [])

  return (
    <>
      <style>{`#admin-root, #admin-root *, #admin-root *::before, #admin-root *::after { cursor: auto !important; }`}</style>
      <div id="admin-root">{children}</div>
    </>
  )
}
