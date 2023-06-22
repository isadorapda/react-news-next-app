import { Roboto_Flex } from 'next/font/google'
import { Header } from '@/components/Header'
import NextAuthProvider from './providers'
import './globals.scss'

const roboto = Roboto_Flex({
  display: 'swap',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Ig.News',
  description: 'News about the React world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextAuthProvider>
          <Header />
          <section>{children}</section>
        </NextAuthProvider>
      </body>
    </html>
  )
}
