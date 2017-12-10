import { MS_PER_DAY } from './Constants';
import Day from './Day';

export function daysBetween (date1, date2) {
  return Math.round(Math.abs(date1 - date2) / MS_PER_DAY);
}

export function monthsBetween (date1, date2) {
  const month1 = date1.getMonth() + date1.getFullYear() * 12;
  const month2 = date2.getMonth() + date2.getFullYear() * 12;
  return month2 - month1;
}

export function today () {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function thisMonth () {
  const today = new Date();
  new Day(new Date(today.getFullYear(), today.getMonth(), 1));
}

export function nextMonth (date = thisMonth()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function equal (date1, date2) {
  return !(date1 < date2 || date1 > date2);
}

export function range (startDate, endDate) {
  const range = [];

  let currentDate = startDate;
  while (currentDate.isOnOrBefore(endDate)) {
    range.push(currentDate);
    currentDate = currentDate.offset({ days: 1 });
  }

  return range;
}
