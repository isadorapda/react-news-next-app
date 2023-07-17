import { env } from '@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'ReactNews',
    version: '0.1.0',
  },
})
