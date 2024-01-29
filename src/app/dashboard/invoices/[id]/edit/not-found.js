/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:13:01
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 17:14:12
 * @FilePath: /my-next-dashboard/src/app/dashboard/menu1/[id]/edit/not-found.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import { BiFace } from "react-icons/bi";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <BiFace className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        prefetch
      >
        Go Back
      </Link>
    </main>
  );
}
