/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-20 14:23:18
 * @FilePath: /my-next-dashboard/src/app/hooks/useDutys.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_APP_API_BASE_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useDutys() {
  const { data, error, isLoading, mutate } = useSWR(`/api/duty`, fetcher);

  const dutys = data?.dutys || [];
  const total = data?.total || 1; // 假设API返回总任务数

  // ...保留其他方法
  async function createDuty(duty) {
    try {
      const response = await axios.post("/api/duty", duty);
      mutate();
      return response.data; // 假设成功响应包含了任务数据
    } catch (error) {
      console.error("Error in createDuty:", error);
      throw error; // 将错误向上抛出
    }
  }

  return {
    isLoading,
    dutys,
    error,
    total, // 返回总任务数
    createDuty,
    mutate,
  };
}
