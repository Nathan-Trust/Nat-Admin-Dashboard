import { MdAdd, MdCancel, MdSegment } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import { ScheduleOutlined ,CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { BiBookmark } from "react-icons/bi";

const labelClasses = ["indigo","gray","green","blue","red","purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent , selectedEvents } = useStateContext();
  const [title, setTitle] = useState(selectedEvents  ? selectedEvents.title : "");
  const [selectedLabel, setSelectedLabel] = useState(selectedEvents ? labelClasses.find((lbl) => lbl === selectedEvents.label) :labelClasses[0]);
  const [description, setDescription] = useState(selectedEvents ? selectedEvents.description  :" ");

  function  handleSubmit  (e) {
e.preventDefault()
const calendarEvent = {
  title,
  description,
  label:selectedLabel,
  day:daySelected.valueOf(),
  id:selectedEvents ? selectedEvents.id : Date.now(),
    }
    
    if (selectedEvents){
      dispatchCalEvent({type:"update" , payload:calendarEvent})
    } else {
      dispatchCalEvent({ type:"push", payload:calendarEvent })
    }

setShowEventModal(false)
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400"></span>
          <div className="flex items-center justify-end">
            {selectedEvents && (
              
              <span onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvents });
                setShowEventModal(false)
        }} className="text-red-400 cursor-pointer">
              <DeleteOutlined />
            </span>
)}
          <button onClick={() => setShowEventModal(false)}>
            <span className="text-gray-400">
              <MdCancel />
            </span>
          </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-gray-400">
              <ScheduleOutlined />
            </span>
            <p>{daySelected.format("dddd,  MMMM DD")}</p>
            <span className="text-gray-400">
              <MdSegment />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="text-gray-400">
              <BiBookmark />
            </span>
            <div className="flex">
              {labelClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center  justify-center cursor-pointer `}
                >
                  {selectedLabel === lblClass && (
                    <span className="text-white text-sm">
                      <CheckOutlined />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600  px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
