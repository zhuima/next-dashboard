/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 10:40:10
 * @FilePath: /my-next-dashboard/src/app/hooks/useTasks.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import axiosInstance from "@/app/lib/axiosInstance";

import { fetcher } from "@/app/lib/fetcher";

export function useTasks(page, limit, searchQuery) {
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
    shouldFetch ? `/api/task?${queryParams}` : null,
    fetcher
  );

  const tasks = data?.tasks || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createTask(task) {
    try {
      const response = await axiosInstance.post("/api/task", task);
      mutate();
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createTask:", error);
      throw error; // 将错误向上抛出
    }
  }

  async function updateTask(id, task) {
    await axiosInstance.put(`/api/task/${id}`, task);
    mutate();
  }

  // 删除任务并更新缓存
  const deleteTask = async (id) => {
    await axiosInstance.delete(`/api/task/${id}`);
    // mutate();
    // // 获取当前的任务列表
    // const currentTasks = data?.tasks ? [...data.tasks] : [];

    // // 乐观更新（即先更新 UI）
    // mutate(
    //   { ...data, tasks: tasks.filter((task) => task.id !== id) },
    //   false // 不重新验证
    // );

    // try {
    //   // 执行删除操作
    //   await axios.delete(`/api/task/${id}`);
    //   console.log("delete id", `/api/task/${id}`);
    //   mutate(`/api/task?${queryParams}`);
    // } catch (error) {
    //   console.error("Error in deleteTask:", error);
    //   // 如果删除失败，则回滚更新
    //   mutate({ ...data, tasks: currentTasks }, false);
    // }
  };

  return {
    isLoading,
    tasks,
    error,
    total, // 返回总任务数
    createTask,
    updateTask,
    deleteTask,
    mutate,
  };
}
