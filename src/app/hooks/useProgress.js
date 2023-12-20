/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-19 16:31:40
 * @FilePath: /my-next-dashboard/src/app/hooks/useProgress.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "@/app/lib/axiosInstance";
import { toast } from "react-toastify";
import { fetcher } from "@/app/lib/fetcher";

// export function useProjects(page, limit, searchQuery) {
export function useProgress() {
  // ...保留其他方法
  async function createProgress(progress) {
    try {
      const response = await axiosInstance.post("/api/progress", progress);
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createProject:", error);
      throw error; // 将错误向上抛出
    }
  }

  return {
    createProgress,
  };
}

export function useProgressByID(id) {
  const { data, isLoading, error } = useSWR(
    id ? `/api/progress/inApproval/${id}` : null, // 如果没有 id，则不执行请求
    fetcher
  );

  const progress = data?.progress || [];

  return {
    progress,
    isLoading,
    error,
  };
}
