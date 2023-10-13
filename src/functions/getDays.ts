const getDaysArray = (year: number, month: number) => {
  const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  let index = daysIndex[new Date(year, month - 1, 1).toString().split(" ")[0]];

  const daysArray = [...Array(numDaysInMonth[month - 1])]
    .map((e, i) => i + 1)
    .map((el, i) => {
      if (index == 7) index = 0;
      return {
        year: year,
        month: month,
        number: i + 1,
        day: daysInWeek[index++],
      };
    });
  return daysArray;
};

const arrayDaysFromToDay = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const toDay = date.getDate();
  const year = date.getFullYear();

  const arrayDays = getDaysArray(year, month).filter(el => el.number >= toDay);
  return arrayDays;
};
export { arrayDaysFromToDay };
