/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-13 17:54:13
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-12-01 16:08:28
 * @FilePath: /my-next-dashboard/src/app/ui/search.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useCallback } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useSWRConfig } from "swr";

import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push, replace } = useRouter();
  const { mutate } = useSWRConfig();

  const handleSearch = useCallback(useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
    replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });  // 使用router.push进行客户端导航

    // 使用 mutate 进行数据请求的节流或防抖
    // mutate(`${pathname}?${params.toString()}`);
  }, 800,
    // The maximum time func is allowed to be delayed before it's invoked:
    { maxWait: 2000 }),
    [] // Dependency array - adjust as needed
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <AiOutlineSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
