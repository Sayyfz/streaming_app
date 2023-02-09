const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function dateFormat(date: Date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    day +
    "-" +
    monthNames[monthIndex] +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}
