"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  TreeItem,
  StaticTreeDataProvider,
} from "react-complex-tree";

import "react-complex-tree/lib/style-modern.css";

const page = () => {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [search, setSearch] = useState("");
  const tree = useRef(null);

  const items = {
    root: {
      index: "root",
      canMove: true,
      isFolder: true,
      children: ["child1", "child2"],
      data: "Root item",
      canRename: true,
    },
    child1: {
      index: "child1",
      canMove: true,
      isFolder: true,
      children: ["child4", "child5"],
      data: "Child item 1",
      canRename: true,
    },
    child4: {
      index: "child4",
      canMove: true,
      isFolder: false,
      children: [],
      data: "Child item 4",
      canRename: true,
    },
    child5: {
      index: "child5",
      canMove: true,
      isFolder: false,
      children: [],
      data: "Child item 5",
      canRename: true,
    },
    child2: {
      index: "child2",
      canMove: true,
      isFolder: true,
      children: ["child3"],
      data: "Child item 2",
      canRename: true,
    },
    child3: {
      index: "child3",
      canMove: true,
      isFolder: true,
      children: ["child7", "child8"],
      data: "Child item 3",
      canRename: true,
    },
    child7: {
      index: "child7",
      canMove: true,
      isFolder: false,
      children: [],
      data: "Child item 7",
      canRename: true,
    },
    child8: {
      index: "child8",
      canMove: true,
      isFolder: false,
      children: [],
      data: "Child item 8",
      canRename: true,
    },
  };

  const dataProvider = useMemo(
    () =>
      new StaticTreeDataProvider(items, (item, data) => ({
        ...item,
        data,
      })),
    []
  );

  const findItemPath = useCallback(
    async (search, searchRoot = "root") => {
      const item = await dataProvider.getTreeItem(searchRoot);
      if (item.data.toLowerCase().includes(search.toLowerCase())) {
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
      <div className="w-1/4 min-w-0 max-w-xs border-r border-gray-200 flex flex-col">
        <form onSubmit={find} className="p-2 flex items-center space-x-2">
          <input
            className="flex-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <button className="p-2 bg-blue-500 text-white rounded-md">
            Find
          </button>
        </form>
        <UncontrolledTreeEnvironment
          dataProvider={
            new StaticTreeDataProvider(items, (item, data) => ({
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
          onSelectItems={(items) => setSelectedItems(items)}
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
      {/* 右侧栏 - 详情信息 */}
      <div className="flex-1 p-4 shadow-md">
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
