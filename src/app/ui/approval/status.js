/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:23:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-19 17:25:48
 * @FilePath: /my-next-dashboard/src/app/ui/approval/status.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import clsx from "clsx";

export default function ApprovalStatus({ status, label }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-red-600/10":
            status === 1,
          "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10":
            status === 4,
          "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20":
            status === 3,
        }
      )}
    >
      {status === 1 ? <>{label}</> : null}
      {status === 3 ? <>{label}</> : null}
      {status === 4 ? <>{label}</> : null}
    </span>
  );
}
