/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:23:08
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 17:24:12
 * @FilePath: /my-next-dashboard/src/app/ui/invoices/status.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { AiOutlineCheckCircle, AiFillClockCircle } from "react-icons/ai";

import clsx from "clsx";

export default function InvoiceStatus({ status }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "paid",
        }
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <AiFillClockCircle className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <AiOutlineCheckCircle className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
