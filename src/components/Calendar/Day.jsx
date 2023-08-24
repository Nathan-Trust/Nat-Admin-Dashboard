import dayjs from "dayjs";
import React, {useState , useEffect} from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Day({ day, idx, rowIdx }) {
  
  const [dayEvents, setDayEvents] = useState([])
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvents } = useStateContext()
  
  
  
  useEffect(() => {
    const events = filteredEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
    setDayEvents(events)
  }, [filteredEvents , day])
  
  // console.log(dayEvents)

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1  dark:text-white">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center dark:text-white ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setDaySelected(day)
        setShowEventModal(true)
      } }>
        {dayEvents.map((evt,idx) => (
          <div key={idx} onClick={() => setSelectedEvents(evt)} className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
