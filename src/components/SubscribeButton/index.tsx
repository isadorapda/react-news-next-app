'use client'

import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'
import { getStripeJs } from '@/app/services/stripe-js'
import { api } from '@/app/services/api'

interface SubscribeProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeProps) {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const subscribeResponse = await api.post('/subscribe')
      const { sessionId } = subscribeResponse.data
      const stripe = await getStripeJs()

      if (stripe) {
        stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
