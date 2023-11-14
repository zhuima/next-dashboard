/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-14 13:39:45
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-14 15:36:53
 * @FilePath: /my-next-dashboard/src/app/dashboard/dutyschedule/events.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const events = [
  {
    title: "追马值班",
    start: getDate("YEAR-MONTH-02"),
    end: getDate("YEAR-MONTH-04"),
    backgroundColor: "red",
  },
  { title: "Nick值班", start: getDate("YEAR-MONTH-02") },
  { title: "Tony值班", start: getDate("YEAR-MONTH-03") },
  {
    title: "追马又值班了",
    start: getDate("YEAR-MONTH-13"),
    end: getDate("YEAR-MONTH-18"),
    backgroundColor: "green",
  },
  {
    title: "Nick又值班了",
    start: getDate("YEAR-MONTH-14"),
    end: getDate("YEAR-MONTH-18"),
    backgroundColor: "blue",
  },
  {
    start: "2023-11-09",
    end: "2023-11-11",
    title: "我是谁？",
    user: "nick",
    backgroundColor: "blue",
  },
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
