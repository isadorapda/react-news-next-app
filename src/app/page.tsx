import Image from 'next/image'
import styles from './page.module.scss'
import { SubscribeButton } from '@/components/SubscribeButton'
import { stripe } from './lib/stripe'

export default async function Home() {
  const {props} = await getData()
  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <span>👏 Hey, welcome</span>
        <h1>
          News about the <span>React</span> world.
        </h1>
        <p>
          Get access to all publications <br />
          <span>for {props.product.amount}/ month</span>
        </p>
        <SubscribeButton priceId={props.product.priceId} />
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

export const getData = async () => {
  const price = await stripe.prices.retrieve('price_1NUpq6AvhBUcYKX73chRxcvv', {
    expand: ['product'],
  })
  if (!price.unit_amount) {
    throw new Error('Price not found')
  }
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
  }
}
export const revalidate = 0
