/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-14 10:34:10
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-14 13:51:26
 * @FilePath: /my-next-dashboard/src/app/dashboard/dutyschedule/page copy.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
// DutySchedulePage.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DutyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventData, setEventData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventInput = (date, role, description) => {
    const newEvent = {
      date: date,
      role: role,
      description: description,
    };
    setEventData([...eventData, newEvent]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">值班表</h1>
      </div>
      <div className="mb-4">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="ISO 8601"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role">选择角色：</label>
        <select id="role" className="px-2 py-1 border border-gray-300">
          {/* 在这里添加选项 */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description">事件描述：</label>
        <input
          type="text"
          id="description"
          className="px-2 py-1 border border-gray-300"
          placeholder="输入事件描述"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => handleEventInput(selectedDate, role, description)}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          添加事件
        </button>
      </div>
      {/* 在这里展示事件列表 */}
    </div>
  );
}

export default DutyCalendar;
