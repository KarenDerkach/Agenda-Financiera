import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface eventsType {

  title: string;
  allDay: boolean;
  start: any;
  end: any;

}


const events: eventsType[]  = [
  {   
      
      title: "Big Meeting",
      allDay: true,
      start: new Date(2020, 3, 1),
      end: new Date(2020, 3, 1)
  },
  {   
      
      title: "Vacation",
      allDay: false,
      start: new Date(2020, 3, 7),
      end: new Date(2020, 3, 10)
  },
  {
      
      title: "Conference",
      allDay: false,
      start: new Date(2020, 3, 11),
      end:  new Date(2020, 3, 13)
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end:'' ,allDay: false });
  const [allEvents, setAllEvents] = useState(events );

  function handleAddEvent() {
      setAllEvents([...allEvents, newEvent]);
  }

  return (
      <div className="App">
          <h1>Calendar</h1>
          <h2>Add New Event</h2>
          <div>
              <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              {/* <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selectsEnd={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
              <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end})} /> */}
              <input type="date" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start:e.target.value })} />
              <input type="date" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end:e.target.value })} />
              <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                  Add Event
              </button>
          </div>
          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
      </div>
  );
}

export default App;