import { query as q } from 'faunadb'
import { env } from '@/env'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { fauna } from './fauna'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection(
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(String(session.user?.email))
                    )
                  )
                )
              ),
              q.Match(q.Index('subscription_by_status'), 'active')
            )
          )
        )
        return { ...session, activeSubscription: userActiveSubscription }
      } catch {
        return { ...session, activeSubscription: null }
      }
    },

    async signIn({ user }) {
      const { email } = user
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(String(user.email))
                )
              )
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(
              q.Match(q.Index('user_by_email'), q.Casefold(String(user.email)))
            )
          )
        )
        return true
      } catch {
        return false
      }
    },
  },
}
