import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export const CalendarView = (props) => {
  return (
    <>
      <Calendar
        {...props}
        localizer={localizer}
      />
    </>
  );
};

/* import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CalendarView(props) {
  return <BigCalendar {...props} localizer={localizer} />;
}
 */
