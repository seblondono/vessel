import clamp from 'lodash.clamp'
import { FC, useLayoutEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { AbsenceListItemDto } from '../../../../cargo/src/repository/absences/model/abscensesModel'
import { Routes } from '../../Routes'
import { isValue } from '../../util/typeGuardUtil'
import useQueryAbsences from './queries/useQueryAbsences'

const AbsenceManager: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const absences = useQueryAbsences()
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const searchQuery = `${Routes.ABSENCE_MANAGER}?page=${page}&pageSize=${pageSize}`

  useLayoutEffect(() => {
    history.push(searchQuery)
  }, [page, pageSize])

  if (location.search === '') {
    return <Redirect to={searchQuery} />
  }

  return (
    <div className='h-full overflow-auto p-8'>
      <section className='p-2 flex justify-end items-center'>
        <div className='p-2 flex items-center'>
          <p>Page Size</p>
          <select className='ml-3 p-1 border' onChange={(ev) => setPageSize(Number(ev.target.value))}>
            <option value={10} selected={pageSize === 10}>10</option>
            <option value={20} selected={pageSize === 20}>20</option>
            <option value={30} selected={pageSize === 30}>30</option>
          </select>
        </div>
        <div className='p-2 flex items-center'>
          <button onClick={() => {
            if (Number(page) > 1) {
              setPage(page - 1)
            }
          }
          } disabled={Number(page) === 1}>{'<'}</button>
          <div className='m-3'>{`${page} / ${isValue(
            absences.data?.totalPages) ? absences.data?.totalPages : '?'}`}</div>
          <button onClick={() => {
            const totalPages = absences.data?.totalPages
            if (isValue(totalPages) && Number(page) < totalPages) {
              setPage(page + 1)
            }
          }
          } disabled={Number(page) === absences.data?.totalPages}>{'>'}</button>
        </div>
        <div>
          <p>{`Absence ${1 + page * pageSize - pageSize} - ${clamp(
            page * pageSize, 1 + page * pageSize - pageSize, Number(absences.data?.totalEntries))} of ${isValue(
            absences.data?.totalEntries) ? absences.data?.totalEntries : '?'}`}</p>
        </div>
      </section>
      <table className='relative w-full table-fixed border-collapse border'>
        <thead>
        <tr>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Member Name</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Type</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Period</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Member Note</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Status</th>
          <th className='sticky top-table-sticky text-left bg-yellow-100 p-1 w-1/6 font-medium border-t border-b'>Admitter Note</th>
        </tr>
        </thead>
        <tbody className='divide-y'>
        {absences.data?.entries.map((it: AbsenceListItemDto) => {
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
      </table>
    </div>
  )
}

export default AbsenceManager
