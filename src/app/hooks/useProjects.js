/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-27 16:26:05
 * @FilePath: /my-next-dashboard/src/app/hooks/useProjects.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import axiosInstance from "@/app/lib/axiosInstance";

import { fetcher } from "@/app/lib/fetcher";

export function useProjects(page, limit, searchQuery) {
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
    shouldFetch ? `/api/project?${queryParams}` : null,
    fetcher
  );

  const projects = data?.projects || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createProject(project) {
    try {
      const response = await axiosInstance.post("/api/project", project);
      mutate();
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createProject:", error);
      throw error; // 将错误向上抛出
    }
  }

  async function updateProject(id, project) {
    await axiosInstance.put(`/api/project/${id}`, project);
    mutate();
  }

  // 删除项目并更新缓存
  const deleteProject = async (id) => {
    await axiosInstance.delete(`/api/project/${id}`);
    mutate();
    // // 获取当前的任务列表
    // const currentProjects = data?.projects ? [...data.projects] : [];

    // // 乐观更新（即先更新 UI）
    // const newProject = currentProjects.filter((project) => project.id !== id);
    // mutate(
    //   newProject,
    //   false // 不重新验证
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/project/${id}`);
    //   console.log("delete id", `/api/project/${id}`);
    //   // mutate(`/api/project?${queryParams}`);
    // } catch (error) {
    //   console.error("Error in deleteProject:", error);
    //   // 如果删除失败，则回滚更新
    //   mutate({ ...data, projects: currentProjects }, false);
    // }
  };

  return {
    isLoading,
    projects,
    error,
    total, // 返回总任务数
    createProject,
    updateProject,
    deleteProject,
    mutate,
  };
}
