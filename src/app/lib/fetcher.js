/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-24 17:37:51
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-24 17:37:56
 * @FilePath: /my-next-dashboard/src/app/lib/fetcher.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// lib/fetcher.js
import axiosInstance from "./axiosInstance";

export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
