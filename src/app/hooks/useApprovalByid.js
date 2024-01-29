/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-18 14:59:26
 * @FilePath: /my-next-dashboard/src/app/hooks/useapproval.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export function useApprovalByid(url) {


  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  const approvals = data?.approvals || [];
  const total = data?.total || 1; // 假设API返回总任务数


  return {
    approvals,
    isLoading,
    total,
    error,
    mutate
  };
}
