import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AbsenceManager from './components/absenceManager/AbsenceManager'
import Deck from './components/deck/Deck'
import Menu from './components/navigation/Menu'
import { Routes } from './Routes'

const App: FC = () => {
  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Menu />
        <section className='h-vessel-content' data-testid='vessel-content'>
          <Switch>
            <Route path={Routes.ROOT} exact>
              <Redirect to={Routes.DECK} />
            </Route>
            <Route path={Routes.DECK}>
              <Deck />
            </Route>
            <Route path={Routes.ABSENCE_MANAGER}>
              <AbsenceManager />
            </Route>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App
