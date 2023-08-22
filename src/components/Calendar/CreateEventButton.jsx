import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function CreateEventButton() {
  return (
      <button className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
          <MdAdd />
          <span className='pl-3 pr-7'>Create</span>
    </button>
  )
}
