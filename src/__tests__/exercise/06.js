// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  // If the hook takes arguments, make sure to check if they are being passed.
  // expect(useCurrentPosition).toHaveBeenCalledWith('args')
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

// test('displays error message when geolocation is not supported', async () => {
//   const fakeError = new Error(
//     'Geolocation is not supported or permission denied',
//   )
//   const {promise, reject} = deferred()

//   window.navigator.geolocation.getCurrentPosition.mockImplementation(
//     (successCallback, errorCallback) => {
//       promise.catch(() => errorCallback(fakeError))
//     },
//   )

//   render(<Location />)

//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

//   await act(async () => {
//     reject()
//   })

//   expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

//   expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message)
// })

/*
eslint
  no-unused-vars: "off",
*/
