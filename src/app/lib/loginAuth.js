/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-16 10:05:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-04 15:57:06
 * @FilePath: /my-next-dashboard/src/app/lib/customAuth.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import axiosInstance from "@/app/lib/axiosInstance";

export async function loginAuth(username, password) {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      username: username,
      password: password,
    });
    return response.data; // 假设成功响应包含了任务数据
  } catch (error) {
    console.error("Error in Auth:", error);
    throw error; // 将错误向上抛出
  }
}
