import Sidebar from './Sidebar'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout
