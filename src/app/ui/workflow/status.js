/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:23:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 11:00:23
 * @FilePath: /my-next-dashboard/src/app/ui/workflow/status.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import clsx from "clsx";

export default function WorkflowStatus({ status }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10":
            status === "disable",
          "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20":
            status === "active",
        }
      )}
    >
      {status === "disable" ? <>禁用</> : null}
      {status === "active" ? <>启用</> : null}
    </span>
  );
}
