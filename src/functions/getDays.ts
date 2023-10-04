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
  const daysArray = [];
  for (let i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    daysArray.push({
      year: year,
      month: month,
      number: i + 1,
      day: daysInWeek[index++],
    });
    if (index == 7) index = 0;
  }
  return daysArray;
};

const arrayDaysFromToDay = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const toDay = date.getDate();
  const arrayDays = getDaysArray(2023, month).filter(el => el.number >= toDay);
  return arrayDays;
};
export { arrayDaysFromToDay };
