import { FC } from 'react'
import { isValue } from '../../../util/typeGuardUtil'

type Props = {
  page: number
  totalPages: number | undefined
  handleNextPageClick: () => void
  handlePreviousPageClick: () => void
}

const PageNavigator: FC<Props> = ({ page, totalPages, handleNextPageClick, handlePreviousPageClick }) => {
  return (
    <div className='p-2 flex items-center'>
      <button onClick={handlePreviousPageClick} disabled={page === 1}>{'<'}</button>
      <div className='m-3'>{`${page} / ${isValue(totalPages) ? totalPages : '?'}`}</div>
      <button onClick={handleNextPageClick} disabled={page === totalPages}>{'>'}</button>
    </div>
  )
}

export default PageNavigator
