function useDate(date) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
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

  var d = new Date(date);
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var day = dayNames[d.getDay()];
  var numDay = d.getDate();
  var month = monthNames[d.getMonth()];
  var year = d.getFullYear();
  var meridian = "AM";
  var numtype = "th";

  if (numDay.toString().endsWith(1)) {
    numtype = "st";
  } else if (numDay.toString().endsWith(2)) {
    numtype = "nd";
  } else if (numDay.toString().endsWith(3)) {
    numtype = "rd";
  }

  if (hour > 12) {
    hour = hour - 12;
    meridian = "PM";
  } else if (hour == 0) {
    hour = 12;
  }

  return {
    hour,
    min,
    sec,
    day,
    month,
    year,
    meridian,
    numDay,
    numtype,
  };
}

export default useDate;
