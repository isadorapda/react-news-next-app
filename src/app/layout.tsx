import { Header } from '@/components/Header'
import './globals.scss'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({
    display:'swap',
    subsets:['latin']
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
        <Header/>
      {/* <div className='header'>Navbar</div> */}
        <section>
        {children}
        </section>
        </body>
    </html>
  )
}
