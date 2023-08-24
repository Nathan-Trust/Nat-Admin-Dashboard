import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useStateContext } from '../../contexts/ContextProvider'

export default function CreateEventButton() {
  const {setShowEventModal} = useStateContext( )
  return (
      <button onClick={() => setShowEventModal(true)} className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
          <MdAdd />
          <span className='pl-3 pr-7 dark:text-white'>Create</span>
    </button>
  )
}
