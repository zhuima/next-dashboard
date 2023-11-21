"use client";
import { useState } from "react";
import { useDutys } from "@/app/hooks/useDutys";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import { toast } from "react-toastify";
import EventAddModal from "@/app/ui/dutyschedule/eventAddModal";
import EventEditModal from "@/app/ui/dutyschedule/eventEditModal";
import EventInfoModal from "@/app/ui/dutyschedule/eventInfoModal";

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { dutys, total, isLoading } = useDutys();
  const { createDuty, updateDuty } = useDutys(); // 使用 useDutys 钩子获取 createDuty 函数

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 添加事件
  const handleDateSelect = (info) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day for comparison

    const selectedDate = new Date(info.startStr);

    if (selectedDate < today) {
      // If the selected date is before today, show an error and don't open the modal
      toast.error("你不能选择今天之前的日期进行值班安排.");
    } else {
      // If the selected date is today or in the future, proceed to open the modal
      setSelectedDate(info);
      setIsModalAddOpen(true);
    }
  };

  const handleModalAddClose = () => {
    setIsModalAddOpen(false);
  };

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

    handleModalAddClose();
  };

  // 编辑事件

  const handleModalEditClose = () => {
    setIsModalEditOpen(false);
  };

  const handleEventEdit = async (
    id,
    start,
    end,
    eventName,
    eventUser,
    eventColor
  ) => {
    const data = {
      id: id,
      start: start,
      end: end,
      title: eventName,
      user: eventUser,
      backgroundColor: eventColor,
    };

    console.log("update data", data);
    try {
      await updateDuty(Number(id), data);
      toast.success("Duty update successfully!");
    } catch (error) {
      toast.error("Failed to update duty");
      console.error("Failed to update duty", error);
    }

    handleModalEditClose();
  };

  // 点击事件显示详情
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsModalInfoOpen(true); // 打开模态框
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
          eventClick={handleEventClick}
        />
      </div>
      <EventAddModal
        isOpen={isModalAddOpen}
        onClose={handleModalAddClose}
        onAddEvent={handleEventAdd}
        selectedDate={selectedDate}
      />

      <EventEditModal
        isOpen={isModalEditOpen}
        onClose={handleModalEditClose}
        onEditEvent={handleEventEdit}
        eventData={selectedEvent}
      />

      <EventInfoModal
        event={selectedEvent}
        isOpen={isModalInfoOpen}
        onClose={() => setIsModalInfoOpen(false)}
        onEdit={() => setIsModalEditOpen(true)}
      />
    </div>
  );
}
