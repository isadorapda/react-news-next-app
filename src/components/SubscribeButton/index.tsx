'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { getStripeJs } from '@/app/lib/stripe-js'
import { api } from '@/app/lib/api'

interface SubscribeProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if(session.activeSubscription){
        router.push('/posts')
        return
    }

    try {
      const subscribeResponse = await api.post('/subscribe')
      const { sessionId } = subscribeResponse.data
      const stripe = await getStripeJs()

      if (stripe) {
       await stripe.redirectToCheckout({ sessionId })
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
