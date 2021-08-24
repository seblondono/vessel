import { FC } from 'react'
import { AbsenceListItemDto } from '../../../../../cargo/src/repository/absences/model/abscensesModel'
import { isValue } from '../../../util/typeGuardUtil'

type Props = {
  entries: AbsenceListItemDto[] | undefined
  isLoading: boolean
}

const Table: FC<Props> = ({ entries, isLoading }) => {
  return (
    <table className='relative w-full table-fixed border-collapse border'>
      <thead>
      <tr>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Member Name
        </th>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Type
        </th>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Period
        </th>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Member Note
        </th>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Status
        </th>
        <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>
          Admitter Note
        </th>
      </tr>
      </thead>
      <tbody className='divide-y'>
      {isLoading ? (
        <tr>
          <td colSpan={6} className='text-center'>Loading absences...</td>
        </tr>
      ) : null}
      {!isLoading && isValue(entries) ? entries.map((it: AbsenceListItemDto) => {
        return (
          <tr key={it.id}>
            <td className='p-1'>{it.userName}</td>
            <td className='p-1 capitalize'>{it.type}</td>
            <td className='p-1'>{`${it.startDate} - ${it.endDate}`}</td>
            <td className='p-1 truncate' title={it.memberNote}>{it.memberNote}</td>
            <td className='p-1 truncate capitalize' title={it.status}>{it.status.toLowerCase()}</td>
            <td className='p-1 truncate' title={it.admitterNote}>{it.admitterNote}</td>
          </tr>
        )
      }) : null}
      </tbody>
    </table>
  )
}

export default Table
