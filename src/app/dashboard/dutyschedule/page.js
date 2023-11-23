"use client";
import { useState } from "react";
import { useDutys } from "@/app/hooks/useDutys";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { toast } from "react-toastify";
import { AiFillHome } from "react-icons/ai";
import EventAddModal from "@/app/ui/dutyschedule/eventAddModal";
import EventEditModal from "@/app/ui/dutyschedule/eventEditModal";
import EventInfoModal from "@/app/ui/dutyschedule/eventInfoModal";
import Breadcrumbs from "@/app/ui/breadcrumbs";

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

  // 拖拽
  const handleEventDrop = async (dropInfo) => {
    // If the selected date is today or in the future, proceed to open the modal
    console.log("drop event---->", dropInfo.event);
    const data = {
      id: Number(dropInfo.event.id),
      start: dropInfo.event.startStr,
      end: dropInfo.event.endStr,
      title: dropInfo.event.title,
      user: dropInfo.event.user,
      backgroundColor: dropInfo.event.backgroundColor,
    };
    console.log("drop event", data);
    try {
      await updateDuty(Number(dropInfo.event.id), data);
      toast.success("Duty update successfully!");
    } catch (error) {
      toast.error("Failed to update duty");
      console.error("Failed to update duty", error);
    }
  };

  // 改变日程
  const handleEventResize = async (resizeInfo) => {
    // If the selected date is today or in the future, proceed to open the modal
    console.log("resize event---->", resizeInfo.event);
    const data = {
      id: Number(resizeInfo.event.id),
      start: resizeInfo.event.startStr,
      end: resizeInfo.event.endStr,
      title: resizeInfo.event.title,
      user: resizeInfo.event.user,
      backgroundColor: resizeInfo.event.backgroundColor,
    };
    console.log("resize event", data);
    try {
      await updateDuty(Number(resizeInfo.event.id), data);
      toast.success("Duty update successfully!");
    } catch (error) {
      toast.error("Failed to update duty");
      console.error("Failed to update duty", error);
    }
  };

  // 事件允许
  const handleEventAllow = (dropLocation, event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // console.log("------------->", dropLocation);
    // console.log("<------------->", event);
    // 检查事件的新开始时间和结束时间
    if (dropLocation.start < today || dropLocation.end < today) {
      toast.error("你不能选择今天之前的日期进行值班安排.");
      return false; // 阻止事件移动或调整大小
    }
    return true; // 允许事件移动或调整大小
  };

  let firstDaty = 1;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "值班表",
            href: "/dashboard/dutyschedule",
            active: true,
          },
        ]}
      />
      <div className="w-full  h-screen">
        <div className="mt-4  md:mt-8">
          <FullCalendar
            defaultView="dayGridWeek"
            firstDay={firstDaty}
            locale="zh-cn"
            weekNumbers // 是否在日历中显示周次(一年中的第几周)
            weekNumberTitle="周"
            handleWindowResize //是否随浏览器窗口大小变化而自动变化
            eventLimit //数据条数太多时，限制各自里显示的数据条数（多余的以“+2more”格式显示）
            eventColor="#f3f4f6"
            themeSystem="Simplex"
            headerToolbar={{
              left: "today prev next myCustomButton",
              center: "prevYear title nextYear",
              right: "dayGridMonth timeGridWeek timeGridDay listMonth",
            }}
            buttonText={{
              today: "今天",
              month: "月",
              week: "周",
              day: "日",
              prev: "上个月",
              next: "下个月",
              listMonth: "月度汇总",
              prevYear: "上年",
              nextYear: "下年",
              // 可以为其他内置按钮添加更多翻译
            }}
            customButtons={{
              myCustomButton: {
                text: "导出数据",
                click: () => {
                  alert("clicked custom button 2!");
                },
              },
            }}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            slotEventOverlap={false}
            editable
            selectable
            eventAllow={handleEventAllow}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
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
    </main>
  );
}
