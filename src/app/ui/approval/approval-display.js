import React from 'react'
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import ApplyForm from "./approval-apply";
import { useApproval } from "@/app/hooks/useApproval";
import { useProgressByID, useProgress } from "@/app/hooks/useProgress";
import {
    approvalStatusOptions,
    applyOperateOptions,
    userOption,
    BusinessOptions,
    RenderStatusComponent,
    RenderLink,
    TypeOptions,
    formatDateToLocal,
} from "@/app/lib/utils";
import { useProject } from "@/app/hooks/useProject";


export default function ApprovalDisplay({ event }) {
    const { data: session } = useSession();
    const { approval, isLoading, error } = useApproval(event?.id);
    // const {
    //     progress,
    //     isLoading: isLoading,
    //     error: perror,
    // } = useProgressByID(event?.id);


    const { project, isLoading: pLoading } = useProject(event?.project?.id);


    console.log("event?.approvalId ----->", event);

    // 查找对应的数据，然后渲染
    const statusObject = applyOperateOptions.find(option => option.value === event?.status);

    console.log("statusObject ----->", statusObject);


    // 类型数组，用于根据状态值映射到对应的标签类型
    const typeArray = ["", "gray", "gray", "green", "red", "gray"];

    // // 根据当前状态值找到对应的标签选项
    const statusOption = approvalStatusOptions.find(
        (option) => option.value === approval?.status
    );
    const tag = {
        type: typeArray[approval?.status], // 获取类型
        label: statusOption ? statusOption.label : "", // 获取标签，如果未找到则为空字符串
    };



    // 判断用户角色
    const isApproverAndRoleAdmin = session?.user?.username === approval?.approver || session?.user?.role === 1;


    return (
        <>

            {/* steps */}
            <div className="w-full py-6">
                <div className="flex justify-center">
                    <div className="w-1/3">
                        <div className="relative mb-2">
                            <div className="mx-auto flex h-10 w-10 items-center rounded-full bg-green-500 text-lg text-white">
                                <span className="w-full text-center text-white"> 1 </span>
                            </div>
                        </div>

                        <div className="text-center text-xs md:text-base">提交数据</div>
                    </div>

                    <div className="w-1/3">
                        <div className="relative mb-2">
                            <div className="align-center absolute flex content-center items-center align-middle" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                <div className="align-center w-full flex-1 items-center rounded bg-gray-200 align-middle">
                                    <div className="w-0 rounded bg-green-300 py-1" style={{ width: '100%' }}></div>
                                </div>
                            </div>

                            <div className="mx-auto flex h-10 w-10 items-center rounded-full bg-green-500 text-lg text-white">
                                <span className="w-full text-center text-white"> 2 </span>
                            </div>
                        </div>

                        <div className="text-center text-xs md:text-base">{event?.approver} 审批中</div>
                    </div>

                    <div className="w-1/3">
                        <div className="relative mb-2">
                            <div className="align-center absolute flex content-center items-center align-middle" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                <div className={clsx("align-center w-full flex-1 items-center rounded align-middle", statusObject?.linkColor)} >
                                    <div className="w-0 rounded bg-white-300 py-1" style={{ width: '100%' }}></div>
                                </div>
                            </div>

                            <div className={clsx("mx-auto flex h-10 w-10 items-center rounded-full bg-gray-500 text-lg text-white", statusObject?.bgColor)}>
                                <span className="w-full text-center text-white"> 3 </span>
                            </div>
                        </div>

                        <div className="text-center text-xs md:text-base">审批{statusObject?.label}</div>
                    </div>

                </div>
            </div >


            {/* description and timeline */}
            <div className="grid grid-cols-3 gap-4 mt-4 ">
                <div className="col-span-2 bg-white p-4 rounded-md shadow grid grid-cols-1 gap-4">
                    <div className="w-full bg-white p-8  rounded-lg flex justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col relative overflow-hidden mb-4 mt-4">
                        <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#676bbe] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm">基础信息</span>
                        <div className="border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                            <table className="min-w-full divide-y divide-gray-200 md:table ">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            项目名称
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500" colSpan="3">
                                            {project?.project_name}
                                        </td>

                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            项目负责人
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                            {project?.Owner?.username}
                                        </td>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            项目端口
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                            {project?.port}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                            服务类型
                                        </th>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                        >
                                            <RenderStatusComponent
                                                options={TypeOptions}
                                                currentValue={project?.type}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        {project?.type == 1 ? (
                                            <>
                                                <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                    代码仓库

                                                </th>
                                                <td
                                                    className="px-6 py-4 whitespace-normal text-sm text-gray-500 col-span-3"
                                                >
                                                    <RenderLink href={`${project?.git_repo.replace('git@gitlab.op.dajie-inc.com:', 'http://gitlab.op.dajie-inc.com/')}`} title={project?.git_repo} />
                                                </td>
                                            </>)
                                            : ""}
                                    </tr>


                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            业务线
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                            <RenderStatusComponent
                                                options={BusinessOptions}
                                                currentValue={project?.business}
                                            />
                                        </td>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            项目语言
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                            {project?.language}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            状态
                                        </th>
                                        <td colSpan="3" className={clsx("flex items-center px-6 py-4 whitespace-normal text-sm", project?.status === "active" ? "text-green-500" : "text-red-500")}>
                                            <span className="relative flex items-center mr-3"> {/* Ensure items are centered and margin is applied */}
                                                <span className={clsx("animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75", project?.status === "active" ? "bg-green-400" : "bg-red-500")}></span>
                                                <span className={clsx("relative inline-flex rounded-full h-3 w-3 ", project?.status === "active" ? "bg-green-500" : "bg-red-500")}></span>
                                            </span>
                                            <span className="flex items-center">{project?.status}</span> {/* Wrap the status text in a flex container */}
                                        </td>


                                    </tr>

                                    <tr>
                                        <th className="px-6 py-4whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            项目域名
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500  col-span-3">
                                            {project?.domain ? <RenderLink href={project?.domain} title={project?.domain} /> : ""}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                            项目描述
                                        </th>
                                        <td
                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500   col-span-3"
                                        >
                                            <p>{project?.description}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                            关联机器
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500   col-span-3" >
                                            {/* 部署方式分k8s和ecs两种方式 */}
                                            {project?.deploy_type == 1 ? (
                                                <RenderLink href={`https://kubepi.dajie-inc.com/kubernetes/msmx-test/namespace/test/workload/view/Deployment/${project?.project_name}`} title={`${event?.project?.project_name} 对应k8s控制台`} />
                                            ) : (
                                                <>
                                                    {
                                                        project?.Hosts?.map((host, index) => (
                                                            <p key={index}>
                                                                <RenderLink href="https://ssh.dajie-inc.com/luna/?_=1704187202234" title={host.ip} />
                                                            </p>
                                                        ))
                                                    }
                                                </>
                                            )}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* 渲染时间线 */}
                <div className="bg-white p-4 rounded-md shadow">
                    <div className="flex items-center">
                        <span
                            className={clsx(
                                "ring-1 ring-inset ring-red-600/10 text-white rounded px-2 py-1 mr-2 whitespace-nowrap",
                                statusObject?.bgColor
                            )}
                        >
                            {statusObject?.label}
                        </span>
                        <h5 className="whitespace-normal">{approval?.title}</h5>
                    </div>
                    <div className="max-w-md mx-auto bg-white p-4">
                        <AlignTimeline
                            session={session}
                            approval={approval}
                            progress={approval?.progress}
                            isLoading={isLoading}
                        />
                    </div>
                </div>


                {/* approval */}
            </div>
            <div className="bg-gray-300 mt-4 rounded-md">
                {/* 用户相同 或者用户角色是1的才能进行审批 */}
                {isApproverAndRoleAdmin && approval?.status === 1 && (
                    <ApplyForm
                        operateOptions={applyOperateOptions}
                        userOption={userOption}
                        approvalId={event.id}
                    />
                )}
            </div>
        </>
    )
}


const AlignTimeline = ({ session, approval, progress, isLoading }) => (
    <div className="py-5 flex items-start justify-start bg-white" >
        <div className="space-y-6 border-l-2 border-dashed">
            <div className="relative w-full" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-green-500">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                {approval &&
                    <p className="ml-6 text-gray-600 leading-none text-xs mb-5">
                        申请人: {approval?.user?.username} {formatDateToLocal(approval?.created_at)}
                        {/* {format(approval?.created_at, "yyyy-MM-dd HH:mm:ss")} */}
                    </p>
                }
            </div>

            {progress && Array.isArray(progress) && !isLoading
                ? progress?.map((item, index) => (
                    <div className="relative w-full" key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-green-500">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                        </svg>
                        <span className="ml-6 text-gray-600 leading-none text-xs mb-2"> {approval?.approver} {formatDateToLocal(item.updated_at)}</span>
                        <div className="ml-6 w-full rounded border border-slate-200 bg-white p-4 shadow">
                            <div className="mt-2 max-w-screen-sm text-sm text-gray-500"> <div dangerouslySetInnerHTML={{ __html: item.opinion }} />.</div>
                        </div>
                    </div>
                ))
                : ""}

            {approval?.status == 1 ? (

                <div className="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-gray-500">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                    <div className="ml-6 w-full rounded border border-slate-200 bg-white p-4 shadow">
                        {approval?.approver} 审批中
                    </div>
                </div>

            ) : (
                ""
            )}

        </div>
    </div >
);

