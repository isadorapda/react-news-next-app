import { env } from '@/env'
import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  if (env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    const stripeJs = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    return stripeJs
  }
  throw new Error('error')
}
