import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const mockSession = {
  user: {
    image: null,
    name: 'John',
    email: 'john@email.com',
  },
  expires: '2023-08-17T15:29:21.167Z',
  activeSubscription: null,
}

export const mockProviders = {
  github: {
    id: 'github',
    name: 'Github',
    type: 'oauth',
    signinUrl: 'path/to/signin',
    callbackUrl: 'path/to/callback',
  },
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    authorize: null,
    credentials: null,
  },
  email: {
    id: 'email',
    type: 'email',
    name: 'Email',
  },
}

export const mockStripe = {
  product: {
    priceId: 'price-id-mock',
    amount: '£5.00',
  },
}

export const server = setupServer()
