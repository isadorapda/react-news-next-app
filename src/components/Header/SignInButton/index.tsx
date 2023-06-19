import { FaGithub as IconGithub } from 'react-icons/fa'
import { IoCloseOutline as IconClose } from 'react-icons/io5'
import styles from './styles.module.scss'

export function SingInButton() {
  const isUserLoggedIn = true
  return isUserLoggedIn ? (
    <button type="button" className={styles.siginButton}>
      <IconGithub color="#04D361" /> Name
      <IconClose color='#737380' className={styles.closeButton}/>
    </button>
  ) : (
    <button type="button" className={styles.siginButton}>
      <IconGithub color="#eba417" /> Sign in with GitHub
    </button>
  )
}
