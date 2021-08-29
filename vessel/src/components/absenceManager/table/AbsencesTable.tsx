import { FC } from 'react'

const AbsencesTable: FC = ({ children }) => {
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
      {children}
    </table>
  )
}

export default AbsencesTable
