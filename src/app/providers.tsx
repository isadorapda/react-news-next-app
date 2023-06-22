'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface AuthProps {
  children: React.ReactNode
}

export default async function NextAuthProvider({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>
}
