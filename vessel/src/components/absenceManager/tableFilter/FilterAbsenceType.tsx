import { ChangeEvent, FC, useLayoutEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AbsenceFilterByType, AbsenceFilterType } from '../model/absencesModel'
import { AbsenceQueryFilterType, TableQueryPaginationType } from '../model/queryFilters'

const FilterAbsenceType: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const absenceTypeFilterFromURL = queryParams.get(AbsenceQueryFilterType.TYPE) ?? AbsenceFilterByType.NONE

  const [absenceTypeFilter, setAbsenceTypeFilter] = useState<AbsenceFilterType>(absenceTypeFilterFromURL)
  const handleFilterByAbsenceTypeChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setAbsenceTypeFilter(ev.target.value as AbsenceFilterType)
  }

  useLayoutEffect(() => {
    queryParams.set(TableQueryPaginationType.PAGE, '1')

    if (absenceTypeFilter === AbsenceFilterByType.NONE) {
      queryParams.delete(AbsenceQueryFilterType.TYPE)
    } else {
      queryParams.set(AbsenceQueryFilterType.TYPE, absenceTypeFilter)
    }

    history.push(`${location.pathname}?${queryParams.toString()}`)
  }, [absenceTypeFilter])

  return (
    <div className='p-2 flex items-center'>
      <label htmlFor='type'>Type</label>
      <select className='ml-3 p-1 border capitalize' id='type' name='type' onChange={handleFilterByAbsenceTypeChange}>
        {Object.values(AbsenceFilterByType).map((it: AbsenceFilterType) => (
          <option
            key={it}
            value={it}
            selected={absenceTypeFilter === it}>
            {it}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterAbsenceType
