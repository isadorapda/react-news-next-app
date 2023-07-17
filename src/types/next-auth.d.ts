import NextAuth from 'next-auth'

type UserId = string

declare module 'next-auth' {
  interface Session {
    activeSubscription: string | null
  }
}
