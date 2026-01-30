'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminContent } from '@/components/admin-content'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('logo')

  return (
    <div className="flex min-h-screen pt-20">
      <AdminSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      <AdminContent activeSection={activeSection} />
    </div>
  )
}
