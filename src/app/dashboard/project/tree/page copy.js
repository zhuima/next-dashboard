"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  TreeItem,
  StaticTreeDataProvider,
} from "react-complex-tree";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useProjectsTree } from "@/app/hooks/useProjectsTree";
import "react-complex-tree/lib/style-modern.css";

const page = () => {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [search, setSearch] = useState("");
  const tree = useRef(null);

  const {
    treeData: projectItems,
    isLoading,
    mutate,
  } = useProjectsTree("/api/project/tree");

  const dataProvider = useMemo(
    () =>
      new StaticTreeDataProvider(projectItems, (item, data) => ({
        ...item,
        data,
      })),
    []
  );

  console.log("select item=-=====>", selectedItems);
  const findItemPath = useCallback(
    async (search, searchRoot = "root") => {
      const item = await dataProvider.getTreeItem(searchRoot);
      console.log("item ----> searchRoot <<<<<<<<<", item, searchRoot);

      if (
        item &&
        item.data &&
        item.data.toLowerCase().includes(search.toLowerCase())
      ) {
        return [item.index];
      }
      const searchedItems = await Promise.all(
        (item.children &&
          item.children.map((child) => findItemPath(search, child))) ||
          []
      );
      const result = searchedItems.find((item) => item !== null);
      if (!result) {
        return null;
      }
      return [item.index, ...result];
    },
    [dataProvider]
  );

  const find = useCallback(
    (e) => {
      e.preventDefault();
      // 检查输入是否为空
      if (!search.trim()) {
        return; // 如果为空，不执行后续操作
      }

      if (search) {
        findItemPath(search).then((path) => {
          if (path) {
            tree.current
              .expandSubsequently(path.slice(0, path.length - 1))
              .then(() => {
                tree.current.selectItems([path[path.length - 1]]);
                tree.current.focusItem(path[path.length - 1]);
              });
          }
        });
      }
    },
    [findItemPath, search]
  );

  return (
    <div className="flex ">
      {/* 左侧栏 - 目录树 */}
      <div className="w-1/4 min-w-0 max-w-xs border-r border-gray-200 flex flex-col ">
        <form onSubmit={find} className="p-2 flex items-center space-x-2">
          <input
            type="search"
            className="peer flex-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="p-2 bg-blue-500 text-white rounded-md">
            <AiOutlineSearch />
          </button>
        </form>
        {/* Tree container with scrolling */}
        <div className="project-scrollbar  overflow-y-auto max-h-screen">
          <UncontrolledTreeEnvironment
            dataProvider={
              new StaticTreeDataProvider(projectItems, (item, data) => ({
                ...item,
                data,
              }))
            }
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
            canDragAndDrop={true}
            canDropOnFolder={true}
            canReorderItems={true}
          >
            <Tree
              treeId="tree-1"
              rootItem="root"
              treeLabel="Tree Example"
              ref={tree}
            />
          </UncontrolledTreeEnvironment>
        </div>
      </div>
      {/* 右侧栏 - 详情信息 */}
      <div className="flex-1 p-6 mr-6 shadow-md  rounded border border-gray-200">
        {selectedItems && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Item Details</h3>
            <p>{selectedItems}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
