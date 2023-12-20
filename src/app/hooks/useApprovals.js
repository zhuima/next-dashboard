/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 17:14:19
 * @FilePath: /my-next-dashboard/src/app/hooks/useApprovals.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "@/app/lib/axiosInstance";
import { toast } from "react-toastify";
import { fetcher } from "@/app/lib/fetcher";

// export function useProjects(page, limit, searchQuery) {
export function useApprovals(url) {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    // shouldFetch ? `/api/project?${queryParams}` : null,
    fetcher
  );

  const approvals = data?.approvals || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createApproval(approval) {
    try {
      const response = await axiosInstance.post("/api/approval", approval);
      mutate(url);
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

  // // 删除项目并更新缓存
  // const deleteP = async (id) => {
  //   const { error } = await axiosInstance.delete(`/api/project/${id}`);
  //   if (error) {
  //     throw error;
  //   }
  // };

  const deleteProject = async (id) => {
    // const currentProjects = data?.projects ? [...data.projects] : [];

    // await mutate(`/api/project?${queryParams}`, deleteP(id), {
    //   optimisticData: (projects) =>
    //     currentProjects.filter((project) => project.id !== id),
    //   rollbackOnError: true,
    // });

    // console.log("in pring", url);

    await axiosInstance.delete(`/api/project/${id}`);
    // mutate();

    // console.log("Current data state2:", data);

    // // 获取当前的项目列表的副本
    // const currentProjects = data?.projects ? [...data?.projects] : [];

    // // 打印乐观更新前的项目列表
    // console.log("Before optimistic update:", currentProjects);

    // // 乐观更新
    // const promise = mutate(
    //   {
    //     ...data,
    //     projects: currentProjects.filter((project) => project.id !== id),
    //   },
    //   false // 不重新验证
    // );

    // await toast.promise(promise, {
    //   pending: "Mutating data",
    //   success: "muttation is successfull",
    //   error: "Mutation failed",
    // });

    // // 打印乐观更新后的项目列表
    // console.log(
    //   "After optimistic update:",
    //   currentProjects.filter((project) => project.id !== id)
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/project/${id}`);
    //   // 可以在这里再次调用 mutate 来确保数据同步
    // } catch (error) {
    //   console.error("Error in deleteProject:", error);
    //   // 回滚更新
    //   mutate(
    //     `/api/project?${queryParams}`,
    //     { ...data, projects: currentProjects },
    //     false
    //   );
    // }
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
    approvals,
    error,
    total, // 返回总任务数
    createApproval,
    updateProject,
    deleteProject,
    mutate,
  };
}
