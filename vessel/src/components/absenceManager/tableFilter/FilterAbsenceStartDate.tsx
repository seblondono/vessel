import { ChangeEvent, FC } from 'react'

type Props = {
  absenceStartDate: string | undefined
  handleFilterByAbsenceStartDateChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

const FilterAbsenceStartDate: FC<Props> = ({ absenceStartDate, handleFilterByAbsenceStartDateChange }) => {
  return (
    <div className='p-2 flex items-center'>
      <label htmlFor='start'>Start date</label>
      <input className='ml-3 p-1 border'  type='date' id='start' name='trip-start' value={absenceStartDate} onChange={handleFilterByAbsenceStartDateChange} />
    </div>
)
}

export default FilterAbsenceStartDate
