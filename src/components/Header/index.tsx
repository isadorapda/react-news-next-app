'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
import { SingInButton } from './SignInButton'

const navlinks = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/posts',
    name: 'Posts',
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image
          src="/assets/logo.svg"
          alt="Ig.News Logo"
          width={100}
          height={50}
        />
        <nav>
          {navlinks.map((link, index) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className={isActive ? styles.active : ''}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
        <SingInButton />
      </div>
    </header>
  )
}
