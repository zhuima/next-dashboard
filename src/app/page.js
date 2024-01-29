/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:45:23
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-23 14:39:52
 * @FilePath: /my-next-dashboard/src/app/page.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import Image from "next/image";
import CMDBLogo from "@/app/ui/cmdb-logo";

export const metadata = {
  title: "ZhuiMa CMDB 平台",
  description: "自动化运维平台",
};

export default function Page() {
  return (
    <main className="flex h-screen flex-col flex-grow p-6 overflow-hidden">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Link href="/" prefetch>
          <CMDBLogo />
        </Link>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to DevOps CMDB.</strong> This is the website for the{" "}
            <Link href="http://localhost:3000/" className="text-blue-500" prefetch>
              ZhuiMa CMDB
            </Link>
            , brought to you by Zhuima.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            prefetch
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/next.svg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/vercel.svg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
