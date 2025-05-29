// utils/holidayChecker.js
import fetch from "node-fetch";

const calendarId = "en.indonesian.official#holiday@group.v.calendar.google.com";
const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

let holidays = [];

export const fetchHolidays = async (year) => {
  const timeMin = `${year}-01-01T00:00:00Z`;
  const timeMax = `${year}-12-31T23:59:59Z`;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}`;

  const response = await fetch(url);
  const data = await response.json();

  holidays = data.items.map((event) => event.start.date);
};

export const isHolidayOrWeekend = (dateStr) => {
  const date = new Date(dateStr);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Minggu = 0, Sabtu = 6
  const isHoliday = holidays.includes(dateStr);
  return isWeekend || isHoliday;
};
