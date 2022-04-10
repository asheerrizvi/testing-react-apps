// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useCounter(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}


test('exposes the count and increment/decrement functions', () => {
  const counterData = setup()

  expect(counterData.count).toBe(0)
  act(() => counterData.increment())
  expect(counterData.count).toBe(1)
  act(() => counterData.decrement())
  expect(counterData.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const counterData = setup({
    initialCount: 1
  })

  expect(counterData.count).toBe(1)
  act(() => counterData.increment())
  expect(counterData.count).toBe(2)
  act(() => counterData.decrement())
  expect(counterData.count).toBe(1)
})

test('allows customization of the step', () => {
  const counterData = setup({
    step: 2
  })

  expect(counterData.count).toBe(0)
  act(() => counterData.increment())
  expect(counterData.count).toBe(2)
  act(() => counterData.decrement())
  expect(counterData.count).toBe(0)
})

/* eslint no-unused-vars:0 */
