'use client'
import { unstable_ViewTransition as ViewTransition } from 'react'

export default function Template({ children }) {
  return (
    <ViewTransition>
      {children}
    </ViewTransition>
  )
}
