import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AbsenceQueryFilterType, TableQueryPaginationType } from '../model/queryFilters'

type Props = {
  label: string
  dateFilterType: AbsenceQueryFilterType.START_DATE | AbsenceQueryFilterType.END_DATE
}

const FilterAbsenceByDate: FC<Props> = ({ label, dateFilterType }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const absenceDateFilterFromURL = queryParams.get(dateFilterType) ?? ''

  const [date, setDate] = useState(absenceDateFilterFromURL)
  const handleFilterByAbsenceStartDateChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setDate(ev.target.value)
  }
  const validYearRegex = new RegExp('^[1-9]\\d{3}$')

  useLayoutEffect(() => {
    queryParams.set(TableQueryPaginationType.PAGE, '1')

    if (date === '') {
      queryParams.delete(dateFilterType)
    } else if (validYearRegex.test(date.split('-')[0])) {
      queryParams.set(dateFilterType, date)
    }

    history.push(`${location.pathname}?${queryParams.toString()}`)
  }, [date])

  return (
    <div className='p-2 flex items-center'>
      <label htmlFor={label}>{label}</label>
      <input
        className='ml-3 p-1 border'
        type='date'
        id={label}
        name={label}
        value={date}
        onChange={handleFilterByAbsenceStartDateChange} />
    </div>
  )
}

export default FilterAbsenceByDate
