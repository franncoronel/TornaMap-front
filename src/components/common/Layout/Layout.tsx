import './layout.css'
import Nav from '../Nav/Nav'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout-container">
      <div className="page-structure">
        {children}
      </div>
      <Nav />
    </div>
  )
}
