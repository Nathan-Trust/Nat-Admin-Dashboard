import dayjs from "dayjs"; //utility libraray used to manipulate time in our code

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day(); //First day of the month from (0-6)
  let currentMonthCount = 0 - firstDayOfTheMonth; //If the first day of the month falls on a Sunday (0), you would need an offset of 0 so that the first day of the month is placed in the first cell of the calendar matrix.
  //If the first day of the month falls on a Wednesday (3), you would need an offset of -3 so that the first day of the month is placed in the fourth cell of the calendar matrix, aligning with Wednesday.

  /* currentMonthCount: This variable is being initialized with the calculated offset.
   It will be used to keep track of the day count as you populate the calendar matrix. It's essentially starting at a negative value that corresponds to how many days from the previous month need to be shown before the actual first day of the month. */
  
  
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}
