/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:45:23
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-20 11:57:14
 * @FilePath: /my-next-dashboard/src/app/layout.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import MainLayout from "./dashboard/mainLayout";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZhuiMa CMDB",
  description: "自动化运维平台",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
