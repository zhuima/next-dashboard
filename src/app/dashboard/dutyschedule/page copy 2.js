"use client";
import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import events from "./events";

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEventsData([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };
  const handleEventUpdate = (info) => {
    const updatedEvents = eventsData.map((event) => {
      if (event.id === info.event.id) {
        return { ...event, start: info.event.start, end: info.event.end };
      }
      return event;
    });
    setEventsData(updatedEvents);
  };

  const handleEventDelete = () => {
    const updatedEvents = eventsData.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEventsData(updatedEvents);
    setSelectedEvent(null);
  };

  let firstDaty = 1;

  return (
    <div className="w-full  h-screen">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>值班表</h1>
      </div>

      <div className="mt-4  md:mt-8">
        <FullCalendar
          defaultView="dayGridWeek"
          firstDay={firstDaty}
          locale="zh"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          themeSystem="Simplex"
          editable
          selectable
          events={eventsData}
          select={handleSelect}
        />
        {selectedEvent && (
          <div className="mt-4">
            <button
              onClick={handleEventDelete}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600"
            >
              删除事件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
