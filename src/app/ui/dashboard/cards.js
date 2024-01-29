/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-12-04 11:00:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-04 11:05:14
 * @FilePath: /my-next-dashboard/src/app/ui/dashboard/cards.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// import {
//   BanknotesIcon,
//   ClockIcon,
//   UserGroupIcon,
//   InboxIcon,
// } from "@heroicons/react/24/outline";
"use client"
import React, { useEffect, useState, useRef, useMemo, useCallback, useReducer } from "react";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { lusitana } from "@/app/ui/fonts";
import { FaServer } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";


const iconMap = {
  Projects: GrProjects,
  Users: AiOutlineUser,
  Domains: TbTournament,
  Hosts: FaServer,
};

const initialState = {
  project_count: null,
  user_count: null,
  domain_count: null,
  host_count: null,
};

function reducer(state, action) {
  return { ...state, ...action };
}


export default async function CardWrapper() {

  const [websocketData, dispatch] = useReducer(reducer, initialState);

  const handleWebSocketMessage = useCallback((event) => {
    const newData = JSON.parse(event.data);

    // Compare with previous data before updating state
    if (JSON.stringify(newData) !== JSON.stringify(websocketData)) {
      dispatch(newData);
    }
  }, [websocketData]);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);

    socket.onopen = function () {
      console.log('ws Connected')
      // socket.send('Hello, server!');

    }

    socket.onclose = function () {
      console.log('ws closed')
    }

    socket.onmessage = handleWebSocketMessage;

    return () => {
      socket.close();
    };
  }, [handleWebSocketMessage]); // Re-run effect only if handleWebSocketMessage changes


  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      <Card title="Projects" value={websocketData?.project_count} type="Projects" />
      <Card title="Users" value={websocketData?.user_count} type="Users" />
      <Card title="Domains" value={websocketData?.domain_count} type="Domains" />
      <Card
        title="Hosts"
        value={websocketData?.host_count}
        type="Hosts" />
    </>
  ) // Include websocketData as a dependency
}

export function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
