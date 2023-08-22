import React, { useState , useEffect } from "react";
import CalendarHeader from "./Calendar/CalendarHeader";
import SideBar from "./Calendar/SideBar";
import Month from "./Calendar/Month";
import { getMonth } from "../util";
import { useStateContext } from "../contexts/ContextProvider";

const CalendarComponent = () => {
  const { monthIndex, setMonthIndex } = useStateContext();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <>
      <div className="flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <SideBar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default CalendarComponent;
