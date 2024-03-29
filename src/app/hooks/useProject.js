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

export function useProject(id) {
  // const { data, isLoading, error } = useSWR(`/api/project/${id}`, fetcher);
  const { data, isLoading, error } = useSWR(!!id ? `/api/project/${id}` : null, fetcher);



  return {
    project: data,
    isLoading,
    error,
  };
}
