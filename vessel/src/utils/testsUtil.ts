import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '../Routes'

export const renderWithRouter = (ui: ReactElement, { route = Routes.ROOT } = {}) => {
  window.history.pushState({}, ui.props.name, route)
  return render(ui, { wrapper: BrowserRouter })
}
