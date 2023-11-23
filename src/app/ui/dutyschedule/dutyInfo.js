"use client";
import { useState } from "react";
import { useDutys } from "@/app/hooks/useDutys";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRef } from "react";
import { forwardRef } from "react";

import { toast } from "react-toastify";
import { AiFillHome } from "react-icons/ai";
import EventAddModal from "@/app/ui/dutyschedule/eventAddModal";
import EventEditModal from "@/app/ui/dutyschedule/eventEditModal";
import EventInfoModal from "@/app/ui/dutyschedule/eventInfoModal";
import Breadcrumbs from "@/app/ui/breadcrumbs";

import {
  Page as InitPage,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

export default function DutyInfo() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { dutys, total, isLoading } = useDutys();
  const { createDuty, updateDuty } = useDutys(); // 使用 useDutys 钩子获取 createDuty 函数

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

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

  // 下载
  const downloadLinkRef = useRef(null);
  // 动态设置 PDF 文件名
  const dynamicFileName = `duty-schedule-${new Date().toISOString()}.pdf`;

  const handleDownloadClick = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  // 当用户点击预览时
  const handlePreviewClick = () => {
    // setPdfLoading(true);
    setShowExportModal(false); // 关闭下载预览对应的模态框
    setShowPreview(true);
  };

  return (
    <>
      {/* 弹出下载预览modal */}
      <Transition appear show={showExportModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowExportModal(!showExportModal)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-lg font-medium leading-6 text-gray-900  border-b mb-3"
                >
                  导出数据
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    您可以下载或预览值班表的PDF格式。
                  </p>
                </div>
                <PDFDownloadLinkWrapper
                  document={<MyDocument dutys={dutys} />}
                  fileName={dynamicFileName}
                  ref={downloadLinkRef}
                />
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleDownloadClick}
                  >
                    下载
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    onClick={handlePreviewClick}
                  >
                    预览
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* 预览 */}
      <Transition appear show={showPreview} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowPreview(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* Center the modal contents */}
          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                <div className="inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-gray-900 p-4 border-b"
                  >
                    <p>PDF 预览</p>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      关闭
                    </button>
                  </Dialog.Title>
                  <div className="p-4">
                    <PDFViewer className="w-full" height={800}>
                      <MyDocument dutys={dutys} />
                    </PDFViewer>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
            // themeSystem="Simplex"
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
                  // alert("clicked custom button 2!");
                  setShowExportModal(!showExportModal);
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
    </>
  );
}

const PDFDownloadLinkWrapper = forwardRef(({ document, fileName }, ref) => (
  <PDFDownloadLink document={document} fileName={fileName}>
    {({ blob, url, loading, error }) =>
      loading ? (
        <button disabled>Loading document...</button>
      ) : (
        <button ref={ref} style={{ display: "none" }}>
          Download now!
        </button>
      )
    }
  </PDFDownloadLink>
));

PDFDownloadLinkWrapper.displayName = "PDFDownloadLinkWrapper";

// 创建PDF文档组件
const MyDocument = ({ dutys }) => {
  const currentDate = new Date().toLocaleDateString();
  Font.register({
    family: "Microsoft Yahei",
    src: "/font/msyh.ttf",
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },

    text: {
      margin: 12,
      fontSize: 54,
      textAlign: "justify",
      fontFamily: "Microsoft Yahei",
    },

    content: {
      margin: 20,
      fontSize: 24,
      textAlign: "justify",
      fontFamily: "Microsoft Yahei",
    },
  });

  const Header = () => (
    <Text
      style={{
        position: "absolute",
        top: 30,
        left: 30,
        right: 30,
        fontSize: 24,
        fontFamily: "Microsoft Yahei",
      }}
    >
      追马 CMDB 值班表
    </Text>
  );

  const Footer = ({ pageNumber, totalPages }) => (
    <View
      fixed
      style={{
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        fontSize: 24,
        fontFamily: "Microsoft Yahei",
      }}
    >
      <Text>
        本PDF文档由程序自动生成 Page {pageNumber} of {totalPages}
      </Text>
    </View>
  );

  return (
    <Document>
      <InitPage size="A4" style={styles.body}>
        <View style={styles.text}>
          <Text>运维排班系统详情</Text>
          <Text style={styles.content}>{currentDate}</Text>
        </View>
      </InitPage>

      {dutys.map((item, index) => (
        <InitPage key={index} style={styles.body}>
          {/* ...页面内容... */}
          <Header />
          <View>
            <Text style={styles.content}>
              {item.id} {item.title}
            </Text>
          </View>
          <Footer pageNumber={index + 1} totalPages={dutys.length} />
        </InitPage>
      ))}
    </Document>
  );
};
