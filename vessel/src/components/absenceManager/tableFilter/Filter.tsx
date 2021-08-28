import { FC } from 'react'

type Props = {
  label: string
}

const Filter: FC<Props> = ({ children, label }) => {
  return (
    <section className='flex items-center'>
      <p className='mr-4'>{label}</p>
      {children}
    </section>
  )
}

export default Filter
