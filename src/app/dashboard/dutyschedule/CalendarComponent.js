/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-14 10:34:35
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-14 10:54:03
 * @FilePath: /my-next-dashboard/src/app/dashboard/dutyschedule/CalendarComponent.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarComponent = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onDateSelect(date);
      }}
      inline
    />
  );
};

export default CalendarComponent;
