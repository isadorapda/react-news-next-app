import { env } from '@/env'
import { stripe } from '@/app/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { saveSubscription } from '../_lib/manageSubscription'

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function POST(request: Request, response: NextResponse) {
  const body = await request.text()
  const signature = headers().get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error}`, { status: 400 })
  }
  const { type } = event

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription

          await saveSubscription(
            subscription.id,
            subscription.customer as string,
            false
          )
          break

        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session

          await saveSubscription(
            session.subscription as string,
            session.customer as string,
            true
          )
          break

        default:
          throw new Error('Unhealed event')
      }
    } catch (error) {
      return NextResponse.json({ error: 'Webhook handler failed' })
    }
  }

  return new Response(null, { status: 200 })
}
