import { query as q } from 'faunadb'
import { env } from '@/env'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { fauna } from '@/app/services/fauna'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('user_by_email'), q.Casefold(String(user.email)))
              )
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(String(user.email))))
          )
        )
        return true
      } catch {
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
