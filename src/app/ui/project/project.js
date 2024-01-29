"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";
import {
  UncontrolledTreeEnvironment,
  ControlledTreeEnvironment,
  Tree,
  TreeItem,
  StaticTreeDataProvider,
  TreeDataProvider,
} from "react-complex-tree";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useProjectsTree } from "@/app/hooks/useProjectsTree";
import "react-complex-tree/lib/style-modern.css";
import ProjectTab from "@/app/ui/project/projectTab";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NothingSelect } from "./nothingSelect";

const Project = () => {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push, replace } = useRouter();


  const [search, setSearch] = useState("");
  const tree = useRef(null);

  const { treeData: projectItems, isLoading } =
    useProjectsTree("/api/project/tree");

  // Instantiating StaticTreeDataProvider
  const dataProvider = new StaticTreeDataProvider(
    projectItems,
    (item, data) => ({
      ...item,
      data,
    })
  );

  const findItemPath = async (search, searchRoot = "root") => {
    const item = await dataProvider.getTreeItem(searchRoot);

    if (!item) {
      console.log("Item not found or data provider is not ready.");
      return null;
    }

    if (item.data.toLowerCase().includes(search.trim().toLowerCase())) {
      return [item.index];
    }

    const searchedItems = await Promise.all(
      item.children?.map((child) => findItemPath(search.trim(), child)) ?? []
    );
    const result = searchedItems.find((item) => item !== null);
    if (!result) {
      return null;
    }
    return [item.index, ...result];
  };

  const find = async (event) => {
    event.preventDefault();

    const query = searchParams.get("query");

    // if (!query.trim()) {
    //   return;
    // }

    if (isLoading) {
      console.log("Search is not available while data is loading.");
      return;
    }

    const path = await findItemPath(query);
    if (path && path.length > 0 && path[path.length - 1] !== undefined) {
      tree.current
        ?.expandSubsequently(path.slice(0, path.length - 1))
        .then(() => {
          tree.current?.selectItems([path[path.length - 1]]);
          tree.current?.focusItem(path[path.length - 1]);
        });
    }
  };


  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    // replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
    push(`${pathname}?${params.toString()}`, undefined, { shallow: true });  // 使用router.push进行客户端导航

    // 使用 mutate 进行数据请求的节流或防抖
    // mutate(`${pathname}?${params.toString()}`);
  }, 1000);

  // const handleSelect = (projectItems) => {
  //   const params = new URLSearchParams(searchParams);
  //   setSelectedItems(projectItems)
  //   params.delete("query");

  // }


  console.log("default selectedItems", selectedItems)
  return (
    <div className="flex project-scrollbar">
      {/* 左侧栏 - 目录树 */}
      <div className="w-1/4 min-w-0 max-w-xs border-r border-gray-200 flex flex-col ">
        {/* <div className="w-1/4 min-w-0 max-w-xs border-r border-gray-200 flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]" style={{ maxHeight: '100vh' }}> */}
        <form onSubmit={find} className="p-2 flex items-center space-x-2">
          <input
            type="search"
            className="peer flex-1 w-full p-2 border border-gray-300 rounded-md"
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            placeholder="Search..."
            // value={search}
            defaultValue={searchParams.get("query")?.toString()}
            disabled={isLoading} // 禁用输入框当数据正在加载
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Find
          </button>
        </form>
        {/* Tree container with scrolling */}
        {isLoading ? (
          <div className="peer flex-1  p-2"><Skeleton count={4} /></div> // 显示加载指示器

        ) : (
          <div className="project-scrollbar overflow-y-auto h-full max-h-[calc(100vh-12rem)]" >
            {/* <UncontrolledTreeEnvironment
              dataProvider={dataProvider} */}

            <ControlledTreeEnvironment
              items={projectItems}
              getItemTitle={(item) => item.data}
              viewState={{
                ["tree-1"]: {
                  focusedItem,
                  expandedItems,
                  selectedItems,
                },
              }}
              onFocusItem={(item) => setFocusedItem(item.index)}
              onExpandItem={(item) =>
                setExpandedItems([...expandedItems, item.index])
              }
              onCollapseItem={(item) =>
                setExpandedItems(
                  expandedItems.filter(
                    (expandedItemIndex) => expandedItemIndex !== item.index
                  )
                )
              }
              onSelectItems={(projectItems) => setSelectedItems(projectItems)}
              // onSelectItems={handleSelect(projectItems)}
              canDragAndDrop={true}
              canDropOnFolder={true}
              canReorderItems={true}
              canSearch={true}
            >
              <Tree
                treeId="tree-1"
                rootItem="root"
                treeLabel="Tree Example"
                ref={tree}
              />
            </ControlledTreeEnvironment>
          </div>
        )}
      </div>
      {/* 右侧栏 - 详情信息 */}

      <div className="project-scrollbar flex-1 p-2 mr-6 shadow-md rounded border border-gray-200 overflow-y-auto  h-full max-h-[calc(100vh-6rem)]">

        {/* <div className="flex-1 p-6 mr-6 shadow-md rounded border border-gray-200 overflow-y-auto " style={{ maxHeight: '100vh' }}> */}
        {/* <ProjectTab selectedItems={selectedItems} /> */}
        {selectedItems.length >= 1 ? (
          <ProjectTab selectedItems={selectedItems} />
        ) : (
          <NothingSelect />
        )}
      </div>
    </div>
  );
};

export default Project;
