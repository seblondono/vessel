import { FC } from 'react'
import useQueryAbsences from './queries/useQueryAbsences'

const AbsenceManager: FC = () => {
  const absences = useQueryAbsences()

  return (
    <div className='h-full overflow-auto p-8'>
      <table className='relative w-full table-fixed border-collapse border'>
        <thead>
        <tr>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/5 font-medium border-t border-b'>Member Name</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/5 font-medium border-t border-b'>Type</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/5 font-medium border-t border-b'>Period</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/5 font-medium border-t border-b'>Member Note</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/5 font-medium border-t border-b'>Admitter Note</th>
        </tr>
        </thead>
        <tbody className='divide-y'>
        {absences.data?.map((it) => {
          return (
            <tr key={it.id}>
              <td className='p-1'>{it.userId}</td>
              <td className='p-1'>{it.type}</td>
              <td className='p-1'>{`${it.startDate} - ${it.endDate}`}</td>
              <td className='p-1 truncate' title={it.memberNote}>{it.memberNote}</td>
              <td className='p-1 truncate' title={it.admitterNote}>{it.admitterNote}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AbsenceManager
