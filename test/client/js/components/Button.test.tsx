import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { Button } from '../../../../client/js/components/Button'

describe('Button', () => {
  it('should render a default button with text', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should run the click handler', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Button</Button>)
    fireEvent.click(screen.getByText('Button'))
    expect(handleClick.mock.calls.length).toBe(1)
  })
})
