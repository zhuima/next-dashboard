/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:45:23
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-08 16:16:20
 * @FilePath: /my-next-dashboard/src/app/layout.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ZhuiMa CMDB Dashboard",
    default: "ZhuiMa CMDB Dashboard",
  },
  description: "自动化运维平台",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  icons: {
    icon: '/favicon.ico', // /public path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
