const DAYSOFWEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function amOrpm(timeInHour) {
  if (timeInHour === 0) {
    return '12:00 am';
  }

  if (timeInHour === 12) {
    return '12:00 pm';
  }

  if (timeInHour > 12) {
    return `${timeInHour - 12}:00 pm`;
  }

  return `${timeInHour}:00 am`;
}

export function getDayOfWeek(date, daysAfter) {
  let day = new Date(date).getUTCDay();
  
  if ((day + daysAfter) > 6) {
    return DAYSOFWEEK[(day - 7) + daysAfter];
  }

  return DAYSOFWEEK[day + daysAfter];
}