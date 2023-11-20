/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:33:15
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-20 11:57:45
 * @FilePath: /my-next-dashboard/src/app/ui/cmdb-logo.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Image from "next/image";
export default function CMDBLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white mt-5`}>
      <Image
        src="/next.svg"
        alt="Logo"
        className="w-24 h-auto filter invert"
        width="24"
        height="60"
      />
    </div>
  );
}
