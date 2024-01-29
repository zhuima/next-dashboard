/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 17:15:20
 * @FilePath: /my-next-dashboard/src/app/hooks/useUsers.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "@/app/lib/axiosInstance";
import { toast } from "react-toastify";
import { fetcher } from "@/app/lib/fetcher";

// export function useUsers(page, limit, searchQuery) {
export function useUsers(url) {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    // shouldFetch ? `/api/user?${queryParams}` : null,
    fetcher,
    {
      keepPreviousData: true
    }
  );

  const users = data?.users || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createUser(user) {
    try {
      const response = await axiosInstance.post("/api/user", user);
      mutate(url);
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error; // 将错误向上抛出
    }
  }

  async function updateUser(id, user) {
    await axiosInstance.put(`/api/user/${id}`, user);
    mutate();
  }

  // // 删除项目并更新缓存
  // const deleteP = async (id) => {
  //   const { error } = await axiosInstance.delete(`/api/user/${id}`);
  //   if (error) {
  //     throw error;
  //   }
  // };

  const deleteUser = async (id) => {
    // const currentUsers = data?.users ? [...data.users] : [];

    // await mutate(`/api/user?${queryParams}`, deleteP(id), {
    //   optimisticData: (users) =>
    //     currentUsers.filter((user) => user.id !== id),
    //   rollbackOnError: true,
    // });

    // console.log("in pring", url);

    await axiosInstance.delete(`/api/user/${id}`);
    // mutate();

    // console.log("Current data state2:", data);

    // // 获取当前的项目列表的副本
    // const currentUsers = data?.users ? [...data?.users] : [];

    // // 打印乐观更新前的项目列表
    // console.log("Before optimistic update:", currentUsers);

    // // 乐观更新
    // const promise = mutate(
    //   {
    //     ...data,
    //     users: currentUsers.filter((user) => user.id !== id),
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
    //   currentUsers.filter((user) => user.id !== id)
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/user/${id}`);
    //   // 可以在这里再次调用 mutate 来确保数据同步
    // } catch (error) {
    //   console.error("Error in deleteUser:", error);
    //   // 回滚更新
    //   mutate(
    //     `/api/user?${queryParams}`,
    //     { ...data, users: currentUsers },
    //     false
    //   );
    // }
    // // 获取当前的任务列表
    // const currentUsers = data?.users ? [...data.users] : [];

    // // 乐观更新（即先更新 UI）
    // const newUser = currentUsers.filter((user) => user.id !== id);
    // mutate(
    //   newUser,
    //   false // 不重新验证
    // );

    // try {
    //   // 执行删除操作
    //   await axiosInstance.delete(`/api/user/${id}`);
    //   console.log("delete id", `/api/user/${id}`);
    //   // mutate(`/api/user?${queryParams}`);
    // } catch (error) {
    //   console.error("Error in deleteUser:", error);
    //   // 如果删除失败，则回滚更新
    //   mutate({ ...data, users: currentUsers }, false);
    // }
  };

  return {
    isLoading,
    users,
    error,
    total, // 返回总任务数
    createUser,
    updateUser,
    deleteUser,
    mutate,
  };
}
