/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:49:06
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-12 20:50:20
 * @FilePath: /my-next-dashboard/src/app/components/Content.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const Content = ({ children }) => {
  // return <div className="flex-grow p-4 overflow-auto">{children}</div>;
  return <div className="flex flex-col flex-grow p-4 overflow-y-auto">{children}</div>;
};

export default Content;
