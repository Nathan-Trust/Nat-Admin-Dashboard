import React from 'react'

const Header = ({dropdown , title}) => {
  return (
    <div className='mb-10 flex justify-between items-center dark:text-white'>
      <p className='text-3xl  tracking-tight '>{title}</p>
      <p className='text-gray-400 '>
        {dropdown}
      </p>
    </div>
  )
}

export default Header