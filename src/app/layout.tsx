import { Roboto_Flex } from 'next/font/google'
import { Header } from '@/components/Header'
import {NextAuthProvider} from './providers'
import './globals.scss'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../../prismicio'

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
          <section>
            {children}
            <PrismicPreview repositoryName={repositoryName}/>
          </section>

        </NextAuthProvider>
      </body>
    </html>
  )
}
