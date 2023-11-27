/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 17:37:39
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 17:37:44
 * @FilePath: /my-next-dashboard/src/app/lib/axiosInstance.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,
});

export default axiosInstance;
