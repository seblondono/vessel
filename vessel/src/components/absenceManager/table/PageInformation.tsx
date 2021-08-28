import clamp from 'lodash.clamp'
import { FC, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isValue } from '../../../util/typeGuardUtil'
import { TableQueryPaginationType } from '../model/queryFilters'

type Props = {
  totalEntries: number | undefined
}

const PageInformation: FC<Props> = ({ totalEntries: totalEntriesFromProps }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const pageFromUrl = queryParams.get(TableQueryPaginationType.PAGE)
  const pageSizeFromUrl = queryParams.get(TableQueryPaginationType.PAGE_SIZE)

  if (!isValue(pageFromUrl) || !isValue(pageSizeFromUrl)) return null

  const page = Number(pageFromUrl)
  const pageSize = Number(pageSizeFromUrl)

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
