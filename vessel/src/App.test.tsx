import { fireEvent, getByText, render, screen } from '@testing-library/react'
import App from './App'
import { Routes } from './Routes'
import { renderWithRouter } from './utils/testsUtil'

test('should render app header', () => {
  render(<App />)
  const header = screen.getByText('Vessel')
  expect(header).toBeInTheDocument()
})

// region vessel navigation
test(`should redirect user to Deck component when visiting '${Routes.ROOT}' route`, () => {
  renderWithRouter(<App />)
  expect(screen.getByText(/deck/i)).toBeInTheDocument()
})

test(`should render Deck component when visiting '${Routes.DECK}' route`, () => {
  renderWithRouter(<App />, { route: Routes.DECK })
  expect(screen.getByText(/deck/i)).toBeInTheDocument()
})

test(`should render AbsenceManager component when visiting '${Routes.ABSENCE_MANAGER}' route`, () => {
  renderWithRouter(<App />, { route: Routes.ABSENCE_MANAGER })
  const vesselContent = screen.getByTestId('vessel-content')
  expect(getByText(vesselContent, 'Absence Manager')).toBeInTheDocument()
})

test(`should navigate to '${Routes.DECK}' route when clicking on nav item with text 'Vessel'`, () => {
  render(<App />)
  const vesselNav = screen.getByTestId('vessel-nav')
  fireEvent.click(getByText(vesselNav, 'Vessel'))
  const vesselContent = screen.getByTestId('vessel-content')
  expect(getByText(vesselContent, 'Deck')).toBeInTheDocument()
})

test(
  `should navigate to '${Routes.ABSENCE_MANAGER}' route when clicking on nav item with text 'Absence Manager'`, () => {
    render(<App />)
    const vesselNav = screen.getByTestId('vessel-nav')
    fireEvent.click(getByText(vesselNav, 'Absence Manager'))
    const vesselContent = screen.getByTestId('vessel-content')
    expect(getByText(vesselContent, 'Absence Manager')).toBeInTheDocument()
  })
// endregion
