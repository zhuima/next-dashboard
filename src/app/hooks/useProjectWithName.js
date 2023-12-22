/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-21 15:25:34
 * @FilePath: /my-next-dashboard/src/app/hooks/useProjectWithName.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export function useProjectWithName(pname) {
  const { data, isLoading, error } = useSWR(`/api/project/${pname}`, fetcher);

  return {
    project: data,
    isLoading,
    error,
  };
}
