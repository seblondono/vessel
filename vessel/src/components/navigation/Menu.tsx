import { FC } from 'react'

const Menu: FC = () => {
  return (
    <nav className='h-16 flex justify-start items-center bg-yellow-500'>
      <div className='h-16 p-1 pl-3 pr-3 flex items-center'>
        <img src='assets/images/vessel_icon.png' alt='Vessel Icon' className='h-12 p-0.5 mr-2 rounded-full bg-white' />
        <div className='text-3xl text-white font-medium'>Vessel</div>
      </div>
      <div className='h-16 p-1 pl-4 pr-4 flex items-center hover:bg-yellow-600'>
        <a href='absence-manager' className='text-lg text-white'>
          Absence Manager
        </a>
      </div>
    </nav>
  )
}

export default Menu
