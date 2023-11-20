"use client";
import { useState } from "react";
import { useDutys } from "@/app/hooks/useDutys";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import { toast } from "react-toastify";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import EventModal from "./eventModal";

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [eventsData, setEventsData] = useState(events);

  const { dutys, total, isLoading } = useDutys();

  // console.log("all duty is --->", dutys);
  // modal

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (info) => {
    setSelectedDate(info);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { createDuty } = useDutys(); // 使用 useDutys 钩子获取 createDuty 函数

  const handleEventAdd = async (date, eventName, eventUser, eventColor) => {
    const data = {
      start: date.startStr,
      end: date.endStr,
      title: eventName,
      user: eventUser,
      backgroundColor: eventColor,
    };
    try {
      await createDuty(data);
      toast.success("Duty created successfully!");
    } catch (error) {
      toast.error("Failed to create duty");
      console.error("Failed to create duty", error);
    }

    handleModalClose();
  };
  // console.log(dutys);

  const handleEvents = (events) => {
    console.log("your select", events);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsModalEditOpen(true); // 打开模态框

    console.log("your click------>", selectedEvent);
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
          events={dutys}
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

      <EventModalEdit
        event={selectedEvent}
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
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

// EventModal 组件可能看起来像这样
const EventModalEdit = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) {
    return null;
  }

  console.log("isopen", isOpen, event);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {event.title}
                </Dialog.Title>
                <div className="mt-2 border-t ">
                  <p className="text-sm text-gray-500 pt-2">用户信息: 追马</p>
                  <div className="flex text-sm text-gray-500 pt-2 ">
                    联系电话: 135xxxxxxxx 一键onCall{" "}
                    <span className="flex-no-shrink text-xs  font-medium tracking-wider  text-gray-400 hover:text-green-400 transition ease-in duration-300 ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 pt-2">
                    开始时间: {event.start.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 pt-2">
                    结束时间: {event.end.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
