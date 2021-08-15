import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AbsenceManager from './components/absenceManager/AbsenceManager'
import Deck from './components/deck/Deck'
import Menu from './components/navigation/Menu'

const App: FC = () => {
  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
        <Menu />
        <section className='h-vessel-content'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/deck' />
            </Route>
            <Route path='/deck'>
              <Deck />
            </Route>
            <Route path='/absence-manager'>
              <AbsenceManager />
            </Route>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App
