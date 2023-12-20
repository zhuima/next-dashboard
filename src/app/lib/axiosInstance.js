/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 17:37:39
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-15 18:48:04
 * @FilePath: /my-next-dashboard/src/app/lib/axiosInstance.js
 * @Description:
 * Link
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// lib/axiosInstance.js
import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,
});

// intercept the request
// https://github.com/techfortified/nextjs14-nextauth-nodeapi-yt/blob/main/nextauth/src/config/index.js

axiosInstance.interceptors.request.use(
  async (config) => {
    // 定义需要排除的 URL 列表
    const excludeUrls = [
      "/api/auth/session",
      "/api/auth/callback",
      "/api/auth/signin",
      "/api/auth/signout",
      "/api/auth/login",
    ];

    // 检查当前请求的 URL 是否在排除列表中
    if (!excludeUrls.includes(config.url)) {
      // 不在排除列表中的 URL 执行特定逻辑，如添加认证头
      const session = await getSession();
      const accessToken = session?.user.accessToken;

      console.log("token是什么", accessToken);
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        };
      }
    }

    // 返回配置
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
