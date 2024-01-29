/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-20 18:06:59
 * @FilePath: /my-next-dashboard/src/app/hooks/useProjectsTree.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/lib/fetcher";

// export function useProjects(page, limit, searchQuery) {
export function useProjectsDomain(url) {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    // shouldFetch ? `/api/project?${queryParams}` : null,
    fetcher
  );


  const project = data?.projects || [];
  const total = data?.total || 1; // 假设API返回总任务数



  return {
    isLoading,
    project,
    total,
    error,
    mutate,
  };
}
