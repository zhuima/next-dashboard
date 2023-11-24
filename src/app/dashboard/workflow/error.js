/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:11:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 17:17:34
 * @FilePath: /my-next-dashboard/src/app/dashboard/invoices/error.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
