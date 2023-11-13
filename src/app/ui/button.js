/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 16:35:27
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 16:35:30
 * @FilePath: /my-next-dashboard/src/app/ui/button.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import clsx from "clsx";

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
