/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 17:38:56
 * @FilePath: /my-next-dashboard/src/app/hooks/useDuty.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export function useDuty(id) {
  const { data, isLoading, error } = useSWR(`/api/duty/${id}`, fetcher);

  return {
    duty: data,
    isLoading,
    error,
  };
}
