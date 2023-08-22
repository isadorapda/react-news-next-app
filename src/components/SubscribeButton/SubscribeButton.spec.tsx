import { render, screen, fireEvent } from '@testing-library/react'
import { SessionProvider, signIn } from 'next-auth/react'
import { SubscribeButton } from '.'

// jest.mock('next/navigation', () => ({
//   useRouter() {
//     return {
//       push: () => jest.fn(),
//     }
//   },
// }))
jest.mock('next-auth/react')


describe('Subscribe Button Component', () => {

  test('renders correctly',  () => {
  
   const {debug} = render(
      <SessionProvider session={null}>
        <SubscribeButton />
      </SessionProvider>
    )
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
debug()
  })

  test('redirects to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const {debug}=render(
      <SessionProvider session={null}>
        <SubscribeButton />
      </SessionProvider>
    )
    // const subsbribeButton = screen.getByText('Subscribe now')
    // fireEvent.click(subsbribeButton)
    // expect(signInMocked).toHaveBeenCalled()
    debug()
  })
})
