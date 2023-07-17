'use client'

import { FaGithub as IconGithub } from 'react-icons/fa'
import { IoCloseOutline as IconClose } from 'react-icons/io5'
import { signIn, useSession, signOut } from 'next-auth/react'
import styles from './styles.module.scss'

export function SingInButton() {
  const { data: session } = useSession()
  return session ? (
    <button
      type="button"
      className={styles.siginButton}
      onClick={() => signOut()}
    >
      <IconGithub color="#04D361" /> {session.user?.name}
      <IconClose color="#737380" className={styles.closeButton} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.siginButton}
      onClick={() => signIn('github')}
    >
      <IconGithub color="#eba417" /> Sign in with GitHub
    </button>
  )
}
