import { FC } from 'react'
import useQueryAbsences from './queries/useQueryAbsences'

const AbsenceManager: FC = () => {
  const absences = useQueryAbsences()

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='text-5xl font-bold'>Absence Manager</div>
      <p>{JSON.stringify(absences.data)}</p>
    </div>
  )
}

export default AbsenceManager
