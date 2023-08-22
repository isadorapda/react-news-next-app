import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { mockSession } from '../../tests/mock'
import { Header } from '.'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation')

describe('Home Component', () => {
  test('should have the active class when the link is active', () => {
  const useMocked = jest.mocked(usePathname)
        useMocked.mockReturnValue('/posts' )

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>
    )
    expect(screen.getByText('Posts')).toHaveClass('active')
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('should not have the active class when the link is inactive', () => {
  const useMocked = jest.mocked(usePathname)
        useMocked.mockReturnValue('/posts' )

    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>
    )
    expect(screen.getByText('Home')).not.toHaveClass('active')
    expect(screen.getByText('Posts')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
