import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Menu: FC = () => {
  return (
    <nav className='h-vessel-nav flex justify-start items-center bg-yellow-500'>
      <NavLink
        to='/deck'
        className='h-16 p-1 pl-3 pr-3 flex items-center hover:bg-yellow-600'
        activeClassName='vessel-route-active'
      >
        <img src='assets/images/vessel_icon.png' alt='Vessel Icon' className='h-12 p-0.5 mr-2 rounded-full bg-white' />
        <div className='text-2xl text-white font-medium'>Vessel</div>
      </NavLink>
      <NavLink
        to='/absence-manager'
        className='h-16 p-1 pl-4 pr-4 flex items-center hover:bg-yellow-600'
        activeClassName='vessel-route-active'
      >
        <div className='text-md text-white'>
          Absence Manager
        </div>
      </NavLink>
    </nav>
  )
}

export default Menu
