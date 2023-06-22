import { env } from '@/env'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
    providers: [
            GithubProvider({
              clientId: env.GITHUB_ID,
              clientSecret: env.GITHUB_SECRET,
            //   authorization:{params:{scope:"read:user"}}
            }),
          ],
  })

  export { handler as GET, handler as POST }
