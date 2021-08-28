import { ChangeEvent, FC } from 'react'
import { AbsenceFilterByType, AbsenceFilterType } from '../model/absencesModel'

type Props = {
  absenceTypeFilter: AbsenceFilterType
  handleFilterByAbsenceTypeChange: (ev: ChangeEvent<HTMLSelectElement>) => void
}

const FilterAbsenceType: FC<Props> = ({ absenceTypeFilter, handleFilterByAbsenceTypeChange }) => {
  return (
    <div className='p-2 flex items-center'>
      <p>Type</p>
      <select className='ml-3 p-1 border capitalize' onChange={handleFilterByAbsenceTypeChange}>
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
