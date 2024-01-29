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
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

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


//  intercept the response

// axiosInstance.interceptors.response.use(async (response) => {
//   return response
// }, async function (error) {

//   const { status } = error?.response;
//   if (status === 401) {
//     console.log('Caught 401 error, signing out and redirecting...');

//     try {
//       await signOut({ redirect: false });
//       redirect('/login');
//     } catch (redirectError) {
//       console.error('Error during sign out and redirect:', redirectError);
//     }
//   }
//   return Promise.reject(error);
// })


axiosInstance.interceptors.response.use(async (response) => {
  return response;
}, async function (error) {
  // 首先检查 error.response 是否存在
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      console.log('Caught 401 error, signing out and redirecting...');
      try {
        // Perform sign-out logic (assuming signOut is a function that handles sign-out)
        await signOut();
        // await signOut({ redirect: false });
        redirect('/login');
      } catch (redirectError) {
        console.error('Error during sign out and redirect:', redirectError);
      }


    }
  } else {
    // 处理没有 response 的情况
    console.error('Error without response:', error);
  }
  return Promise.reject(error);
});



//   const originalRequest = error.config
//   if (error?.response?.status === 401 && !originalRequest._retry) {
//     try {
//       originalRequest._retry = true
//       const result = await refreshAccessToken()
//       authAxios.accessToken = result?.accessToken
//       return authAxios(originalRequest)
//     } catch (err) {
//       if (err?.response && err?.response?.data) {
//         return Promise.reject(err?.response?.data)
//       }
//       return Promise.reject(err)
//     }
//   }
//   return Promise.reject(error)
// })


export default axiosInstance;
