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
import EventModal from "./eventModal";

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState(events);

  // modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (info) => {
    setSelectedDate(info);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEventAdd = (date, eventName, eventUser) => {
    setEventsData([
      ...eventsData,
      {
        start: date.startStr,
        end: date.endStr,
        title: eventName,
        user: eventUser,
      },
    ]);

    console.log("---->", {
      start: date.startStr,
      end: date.endStr,
      title: eventName,
      user: eventUser,
    });
    handleModalClose();
  };
  console.log(events);

  const handleEvents = (events) => {
    console.log("your select", events);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({ ...clickInfo.event });
    console.log("your click", selectedEvent);
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
          headerToolbar={{
            left: "today prev next",
            center: "title",
            right: "dayGridMonth timeGridWeek timeGridDay",
          }}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          themeSystem="Simplex"
          editable
          selectable
          events={eventsData}
          select={handleDateSelect}
          eventContent={(info) => <EventItem info={info} />}
          eventClick={handleEventClick}
        />
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddEvent={handleEventAdd}
        selectedDate={selectedDate}
      />
    </div>
  );
}

// a custom render function
const EventItem = ({ info }) => {
  const { event } = info;
  return (
    <div>
      <p>{event.title}</p>
    </div>
  );
};
