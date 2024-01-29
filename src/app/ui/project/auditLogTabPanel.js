import React from 'react'
import Link from "next/link";
import { clsx } from "clsx";
import {
    approvalStatusOptions,
    applyOperateOptions,
    userOption,
    BusinessOptions,
    RenderStatusComponent,
    RenderLink,
    TypeOptions,
} from "@/app/lib/utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { UpdateWorkflow, DeleteWorkflow } from "@/app/ui/workflow/buttons";
import { UpdateProject } from "./buttons";



export const AuditLogTabPanel = ({ audits, project }) => {
    return (
        <div className="flex bg-white px-6 ">
            <div className="space-y-6 border-l-2 border-dashed mt-5 ml-5 mb-5">
                {audits.map((audit, index) => (
                    <div className="relative w-full" key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-6">
                            <h4 className="font-bold text-blue-500">{project?.project_name} 操作记录.</h4>
                            {/* <p className="mt-2 max-w-screen-sm text-sm text-gray-500">{audit?.old_data} at  {audit?.new_data}.</p> */}
                            <div className="mt-2  text-sm text-gray-500">

                                <ReactDiffViewer
                                    oldValue={audit?.old_data}
                                    newValue={audit?.new_data}
                                    // compareMethod={DiffMethod.LINES}
                                    splitView={false}
                                    showDiffOnly={true}
                                    hideLineNumbers={false}
                                    styles={{
                                        content: {
                                            wordBreak: 'break-word',  // 或者 'break-all' 根据需要
                                            whiteSpace: 'pre-wrap',
                                        },
                                    }}
                                />
                            </div>
                            <span className="mt-1 block text-sm font-semibold text-blue-500">{audit?.updated_by} at  {audit?.updated_at}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
