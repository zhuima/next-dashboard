/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:45:23
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 16:54:39
 * @FilePath: /my-next-dashboard/src/app/dashboard/layout.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import MainLayout from "./mainLayout";

export default function Layout({ children }) {
  return <MainLayout>{children}</MainLayout>;
}
