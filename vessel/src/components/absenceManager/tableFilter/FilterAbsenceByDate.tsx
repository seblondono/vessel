import { ChangeEvent, FC } from 'react'

type Props = {
  label: string
  date: string | undefined
  handleFilterByAbsenceDateChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

const FilterAbsenceByDate: FC<Props> = ({ label, date, handleFilterByAbsenceDateChange }) => {
  return (
    <div className='p-2 flex items-center'>
      <label htmlFor='start'>{label}</label>
      <input className='ml-3 p-1 border' type='date' id='start' name='trip-start' value={date} onChange={handleFilterByAbsenceDateChange} />
    </div>
)
}

export default FilterAbsenceByDate
