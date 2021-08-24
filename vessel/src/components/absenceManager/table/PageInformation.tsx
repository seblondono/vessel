import clamp from 'lodash.clamp'
import { FC, useLayoutEffect, useState } from 'react'
import { isValue } from '../../../util/typeGuardUtil'

type Props = {
  page: number
  pageSize: number
  totalEntries: number | undefined
}

const PageInformation: FC<Props> = ({ page, pageSize, totalEntries: totalEntriesFromProps }) => {
  const [totalEntries, setTotalEntries] = useState(() => isValue(totalEntriesFromProps) ? totalEntriesFromProps : 0)
  const firstEntryNumber = 1 + page * pageSize - pageSize
  const lastEntryNumber = clamp(page * pageSize, 1 + page * pageSize - pageSize, totalEntries)

  useLayoutEffect(() => {
    if (isValue(totalEntriesFromProps)) {
      setTotalEntries(totalEntriesFromProps)
    }
  }, [totalEntriesFromProps])

  return (
    <div>
      <p>{`Absence ${firstEntryNumber} - ${lastEntryNumber} of ${totalEntries}`}</p>
    </div>
  )
}

export default PageInformation
