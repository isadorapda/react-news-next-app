import Image from 'next/image'
import styles from './page.module.scss'
import { SubscribeButton } from '@/components/SubscribeButton'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <span>👏 Hey, welcome</span>
        <h1>
          News about the <span>React</span> world.
        </h1>
        <p>
          Get access to all publications <br />
          <span>for £5/ month</span>
        </p>
      <SubscribeButton/>
      </section>
      <Image
        src="/assets/avatar.svg"
        width={330}
        height={500}
        alt="A girl coding"
      />
    </main>
  )
}
