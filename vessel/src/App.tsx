import { FC } from 'react'
import AbsenceManager from './components/absenceManager/AbsenceManager'
import Menu from './components/navigation/Menu'

const App: FC = () => {
  return (
    <div className='w-screen h-screen'>
      <Menu />
      <section>
        <AbsenceManager />
      </section>
    </div>
  )
}

export default App
