/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 13:45:32
 * @FilePath: /my-next-dashboard/src/app/hooks/useTask.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import useSWR from "swr";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_BASE_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useTask(id) {
  const { data, isLoading, error } = useSWR(`/api/task/${id}`, fetcher);

  return {
    task: data,
    isLoading,
    error,
  };
}
