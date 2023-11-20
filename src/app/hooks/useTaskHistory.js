/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-17 13:55:35
 * @FilePath: /my-next-dashboard/src/app/hooks/useTaskHistory.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_BASE_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useTaskHistory(id, page, limit, searchQuery) {
  // 构建带有分页和搜索查询参数的URL
  const queryParams = new URLSearchParams({
    page: page,
    size: limit,
    query: searchQuery, // 假设API支持`q`作为搜索参数
  }).toString();

  // 当page, limit或searchQuery为undefined时，不发送请求
  const shouldFetch =
    page !== undefined && limit !== undefined && searchQuery !== undefined;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/task/${id}/history?${queryParams}` : null,
    fetcher,
    {
      dedupingInterval: 300, // 防抖间隔，单位为毫秒
    }
  );

  const loading = !data && !error;
  const taskHistory = data?.taskHistory || [];
  const total = data?.total || 1; // 假设API返回总任务数

  return {
    isLoading,
    taskHistory,
    error,
    total, // 返回总任务数
    mutate,
  };
}
