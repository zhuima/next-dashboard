/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 17:15:20
 * @FilePath: /my-next-dashboard/src/app/hooks/useHosts.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "@/app/lib/axiosInstance";
import { toast } from "react-toastify";
import { fetcher } from "@/app/lib/fetcher";

// export function useHosts(page, limit, searchQuery) {
export function useHosts(url) {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    // shouldFetch ? `/api/host?${queryParams}` : null,
    fetcher
  );

  const hosts = data?.hosts || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createHost(host) {
    try {
      const response = await axiosInstance.post("/api/host", host);
      mutate(url);
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createHost:", error);
      throw error; // 将错误向上抛出
    }
  }

  async function updateHost(id, host) {
    await axiosInstance.put(`/api/host/${id}`, host);
    mutate();
  }

  // // 删除项目并更新缓存
  // const deleteP = async (id) => {
  //   const { error } = await axiosInstance.delete(`/api/host/${id}`);
  //   if (error) {
  //     throw error;
  //   }
  // };

  const deleteHost = async (id) => {
    // const currentHosts = data?.hosts ? [...data.hosts] : [];

    // await mutate(`/api/host?${queryParams}`, deleteP(id), {
    //   optimisticData: (hosts) =>
    //     currentHosts.filter((host) => host.id !== id),
    //   rollbackOnError: true,
    // });

    // console.log("in pring", url);

    await axiosInstance.delete(`/api/host/${id}`);
    // mutate();

    // console.log("Current data state2:", data);

    // // 获取当前的项目列表的副本
    // const currentHosts = data?.hosts ? [...data?.hosts] : [];

    // // 打印乐观更新前的项目列表
    // console.log("Before optimistic update:", currentHosts);

    // // 乐观更新
    // const promise = mutate(
    //   {
    //     ...data,
    //     hosts: currentHosts.filter((host) => host.id !== id),
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
    //   currentHosts.filter((host) => host.id !== id)
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/host/${id}`);
    //   // 可以在这里再次调用 mutate 来确保数据同步
    // } catch (error) {
    //   console.error("Error in deleteHost:", error);
    //   // 回滚更新
    //   mutate(
    //     `/api/host?${queryParams}`,
    //     { ...data, hosts: currentHosts },
    //     false
    //   );
    // }
    // // 获取当前的任务列表
    // const currentHosts = data?.hosts ? [...data.hosts] : [];

    // // 乐观更新（即先更新 UI）
    // const newHost = currentHosts.filter((host) => host.id !== id);
    // mutate(
    //   newHost,
    //   false // 不重新验证
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/host/${id}`);
    //   console.log("delete id", `/api/host/${id}`);
    //   // mutate(`/api/host?${queryParams}`);
    // } catch (error) {
    //   console.error("Error in deleteHost:", error);
    //   // 如果删除失败，则回滚更新
    //   mutate({ ...data, hosts: currentHosts }, false);
    // }
  };

  return {
    isLoading,
    hosts,
    error,
    total, // 返回总任务数
    createHost,
    updateHost,
    deleteHost,
    mutate,
  };
}
