import React from 'react'
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from './SmallCalendar'
import Label from "./Label"

export default function SideBar() {
  return (
    <aside className='border p-5 w-64 '>
      <CreateEventButton />
      <SmallCalendar/>
      <Label />
   </aside>
  )
}
