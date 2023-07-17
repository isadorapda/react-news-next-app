import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { stripe } from '@/app/lib/stripe'
import { env } from '@/env'
import { query as q } from 'faunadb'
import { fauna } from '@/app/lib/fauna'
import { authOptions } from '@/app/lib/auth'

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions)
  const user = await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(String(session?.user?.email))
      )
    )
  )

  let customerId = user.data.stripe_customer_id

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: String(session?.user?.email),
    })

    await fauna.query(
      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      })
    )

    customerId = stripeCustomer.id
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      {
        price: 'price_1NUpq6AvhBUcYKX73chRxcvv',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: env.STRIPE_SUCCESS_URL,
    cancel_url: env.STRIPE_CANCEL_URL,
  })

  return NextResponse.json(
    { sessionId: stripeCheckoutSession.id },
    { status: 200 }
  )
}
