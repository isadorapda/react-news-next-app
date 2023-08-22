import { render, screen } from '@testing-library/react'
import { SingInButton } from '.'
import { SessionProvider } from 'next-auth/react'
import { mockSession } from '../../../tests/mock'


  describe('Sign In Button Component', () => {
    test('should render "Sign in with GitHub" button when not authenticated', () => {
      render(
        <SessionProvider session={null}>
          <SingInButton />
        </SessionProvider>
      )
      expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
    })
    test('should render "John" button when authenticated', () => {
      render(
        <SessionProvider session={mockSession}>
          <SingInButton />
        </SessionProvider>
      )
      expect(screen.getByText('John')).toBeInTheDocument()
    })
  })
