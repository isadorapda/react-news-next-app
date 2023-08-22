import Home, { getData } from '../../app/page'
import { screen, render } from '@testing-library/react'
import { stripe } from '../../app/lib/stripe'

jest.mock('../../app/lib/stripe.ts')

describe('Home Page', () => {
  //     test("should render correctly",  async () => {
  //         render(<Home />)
  //         const mokedStripe =  jest.mocked(stripe.prices.retrieve)
  //         mokedStripe.mockReturnValueOnce({
  //             id: 'fake-price-id',
  //             unit_amount:500
  //         } as any)

  //         const response = await getData()
  //    expect(screen.getByText(`for ${response.props.product.amount}/ month`)).toBeInTheDocument()
  //     })

  test('should show initial data', async () => {
    const mokedStripe = jest.mocked(stripe.prices.retrieve)
    mokedStripe.mockReturnValueOnce({
      id: 'fake-price-id',
      unit_amount: 500,
    } as any)

    const response = await getData()
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '£5.00',
          },
        },
      })
    )
  })
})
