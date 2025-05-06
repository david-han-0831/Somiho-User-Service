import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1200px] p-6">{children}</div>
      </main>
    </div>
  )
}
