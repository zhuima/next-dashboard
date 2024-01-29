/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 17:38:42
 * @FilePath: /my-next-dashboard/src/app/hooks/useProject.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export function useHostList() {
  const { data, isLoading, error } = useSWR(`/api/host/list`, fetcher);

  return {
    hosts: data?.hosts || [],
    isLoading,
    error,
  };
}
