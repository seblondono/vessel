import { FC } from 'react'
import { AbsenceListItemDto } from '../../../../../cargo/src/repository/absences/model/abscensesModel'
import { isValue } from '../../../util/typeGuardUtil'

type Props = {
  entries: AbsenceListItemDto[] | undefined
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const TableBody: FC<Props> = ({ entries, isLoading, isError, refetch }) => {
  if (isLoading) {
    return (
      <tbody className='divide-y'>
      <tr>
        <td colSpan={6} className='p-3 text-center'>Loading absences...</td>
      </tr>
      </tbody>
    )
  }

  if (isError) {
    return (
      <tbody className='divide-y'>
      <tr>
        <td colSpan={6} className='p-3 text-center'>
          There was an error fetching your crew absences
          <button className='ml-3 p-1 border' onClick={refetch}>Retry</button></td>
      </tr>
      </tbody>
    )
  }

  if (!isValue(entries)) return null

  if (entries.length === 0) {
    return (
      <tbody className='divide-y'>
      <tr>
        <td colSpan={6} className='p-3 text-center'>No absences found</td>
      </tr>
      </tbody>
    )
  }

  return (
    <tbody className='divide-y'>
    {entries.map((it: AbsenceListItemDto) => {
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
    })}
    </tbody>
  )
}

export default TableBody
