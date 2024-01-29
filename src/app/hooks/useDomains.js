/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 17:15:20
 * @FilePath: /my-next-dashboard/src/app/hooks/useDomains.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "@/app/lib/axiosInstance";
import { toast } from "react-toastify";
import { fetcher } from "@/app/lib/fetcher";

// export function useDomains(page, limit, searchQuery) {
export function useDomains(url) {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    // shouldFetch ? `/api/domain?${queryParams}` : null,
    fetcher
  );

  const domains = data?.domains || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createDomain(domain) {
    try {
      const response = await axiosInstance.post("/api/domain", domain);
      mutate(url);
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createDomain:", error);
      throw error; // 将错误向上抛出
    }
  }

  async function updateDomain(id, domain) {
    await axiosInstance.put(`/api/domain/${id}`, domain);
    mutate();
  }

  // // 删除项目并更新缓存
  // const deleteP = async (id) => {
  //   const { error } = await axiosInstance.delete(`/api/domain/${id}`);
  //   if (error) {
  //     throw error;
  //   }
  // };

  const deleteDomain = async (id) => {
    // const currentDomains = data?.domains ? [...data.domains] : [];

    // await mutate(`/api/domain?${queryParams}`, deleteP(id), {
    //   optimisticData: (domains) =>
    //     currentDomains.filter((domain) => domain.id !== id),
    //   rollbackOnError: true,
    // });

    // console.log("in pring", url);

    await axiosInstance.delete(`/api/domain/${id}`);
    // mutate();

    // console.log("Current data state2:", data);

    // // 获取当前的项目列表的副本
    // const currentDomains = data?.domains ? [...data?.domains] : [];

    // // 打印乐观更新前的项目列表
    // console.log("Before optimistic update:", currentDomains);

    // // 乐观更新
    // const promise = mutate(
    //   {
    //     ...data,
    //     domains: currentDomains.filter((domain) => domain.id !== id),
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
    //   currentDomains.filter((domain) => domain.id !== id)
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/domain/${id}`);
    //   // 可以在这里再次调用 mutate 来确保数据同步
    // } catch (error) {
    //   console.error("Error in deleteDomain:", error);
    //   // 回滚更新
    //   mutate(
    //     `/api/domain?${queryParams}`,
    //     { ...data, domains: currentDomains },
    //     false
    //   );
    // }
    // // 获取当前的任务列表
    // const currentDomains = data?.domains ? [...data.domains] : [];

    // // 乐观更新（即先更新 UI）
    // const newDomain = currentDomains.filter((domain) => domain.id !== id);
    // mutate(
    //   newDomain,
    //   false // 不重新验证
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/domain/${id}`);
    //   console.log("delete id", `/api/domain/${id}`);
    //   // mutate(`/api/domain?${queryParams}`);
    // } catch (error) {
    //   console.error("Error in deleteDomain:", error);
    //   // 如果删除失败，则回滚更新
    //   mutate({ ...data, domains: currentDomains }, false);
    // }
  };

  return {
    isLoading,
    domains,
    error,
    total, // 返回总任务数
    createDomain,
    updateDomain,
    deleteDomain,
    mutate,
  };
}
