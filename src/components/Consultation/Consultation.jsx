// Calendar.js
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const events = [
  {
    title: 'Team Meeting',
    start: new Date(2025, 3, 29, 10, 0), // April 29, 2025
    end: new Date(2025, 3, 29, 11, 0),
  },
];

function MyCalendar() {
  const [allEvents, setAllEvents] = useState(events);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
