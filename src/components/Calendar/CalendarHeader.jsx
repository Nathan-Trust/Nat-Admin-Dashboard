import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useStateContext } from "../../contexts/ContextProvider";
import dayjs from "dayjs";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useStateContext();
  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <img src="" alt="Calendar Logo" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-gray-500 font-bold">Calendar</h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5 dark:text-white"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <BiChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <BiChevronRight />
        </span>
      </button>
      <h2 className="daek:text-white ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
