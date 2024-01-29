/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-23 17:29:48
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-23 18:06:59
 * @FilePath: /my-next-dashboard/src/app/ui/dutyschedule/downloadModal.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// DownloadModal.js
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PDFDownloadLinkWrapper from "./PDFDownloadLinkWrapper";

const DownloadModal = ({
  show,
  onClose,
  document,
  fileName,
  downloadLinkRef,
  onDownloadClick,
  onPreviewClick,
}) => (
  <Transition appear show={show} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
    >
      {/* Modal content */}
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        </Transition.Child>
        {/* Centering the modal content */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              导出数据
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                您可以下载或预览值班表的PDF格式。
              </p>
            </div>
            <PDFDownloadLinkWrapper
              document={document}
              fileName={fileName}
              ref={downloadLinkRef}
            />
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700"
                onClick={onDownloadClick}
              >
                下载
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                onClick={onPreviewClick}
              >
                预览
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default DownloadModal;
