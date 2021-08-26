import { ChangeEvent, FC } from 'react'

type Props = {
  pageSize: number
  handlePageSizeChange: (ev: ChangeEvent<HTMLSelectElement>) => void
}

const PageSizeSelector: FC<Props> = ({ pageSize, handlePageSizeChange }) => {
  return (
    <div className='p-2 flex items-center'>
      <p>Page Size</p>
      <select className='ml-3 p-1 border' onChange={handlePageSizeChange}>
        <option value={10} selected={pageSize === 10}>10</option>
        <option value={30} selected={pageSize === 30}>30</option>
        <option value={50} selected={pageSize === 50}>50</option>
      </select>
    </div>
  )
}

export default PageSizeSelector
