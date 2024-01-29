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
import { NothingSelect } from "./nothingSelect"

export const ProjectTabPanel = ({ project }) => {

    return (
        <>
            {
                project.project_name ? (
                    <>
                        {/* <div className="flex justify-end mt-3 ">
                            <UpdateProject
                                id={project?.id}
                                className="middle none center mr-4 rounded-lg bg-blue-500 px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            />
                        </div> */}

                        <div className="w-full bg-white p-8  rounded-lg flex justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col relative overflow-hidden mb-4 mt-4">
                            <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#676bbe] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm">基础信息</span>
                            <div className="border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                                <table className="min-w-full divide-y divide-gray-200 md:table ">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                项目名称
                                            </th>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {project?.project_name}
                                                {/* <div className="group relative ">
                                                    <button></button>
                                                    <span
                                                        className="pointer-events-none  -top-7 left-0  opacity-0 transition-opacity group-hover:opacity-100   px-5 py-3 text-center text-gray-600 truncate -translate-x-1/2 bg-white rounded-lg shadow-lg -bottom-12  dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white"
                                                    >
                                                        This is a button.
                                                    </span>
                                                </div> */}
                                            </td>
                                            <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                项目负责人
                                            </th>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {project?.Owner?.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-4 wwhitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                服务类型
                                            </th>
                                            <td
                                                className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                            >
                                                <RenderStatusComponent
                                                    options={TypeOptions}
                                                    currentValue={project?.type}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            {project?.git_repo && (
                                                <>
                                                    <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                        代码仓库
                                                    </th>
                                                    <td
                                                        className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        colSpan="3"
                                                    >
                                                        <RenderLink href={`${project?.git_repo.replace('git@gitlab.op.dajie-inc.com:', 'http://gitlab.op.dajie-inc.com/')}`} title={project?.git_repo} />
                                                    </td>
                                                </>
                                            )}
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
                                            <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                项目端口
                                            </th>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {project?.port}
                                            </td>
                                        </tr>
                                        <tr>
                                            {project?.domain && (
                                                <>
                                                    <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                        项目域名
                                                    </th>
                                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500" colSpan="3">
                                                        <RenderLink href={project?.domain} title={project?.domain} />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                项目描述
                                            </th>
                                            <td
                                                colSpan="3"
                                                className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                            >
                                                <p>{project?.description}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                关联机器
                                            </th>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                {/* 部署方式分k8s和ecs两种方式 */}
                                                {project?.deploy_type == 1 ? (
                                                    <RenderLink href={`https://kubepi.dajie-inc.com/kubernetes/msmx-test/namespace/test/workload/view/Deployment/${project?.project_name}`} title={`${project?.project_name} 对应k8s控制台`} />
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

                        {
                            (project?.status == "active" && project?.type != 2 && project?.type != 6) ?
                                <>

                                    {/* 测试环境 */}
                                    <div className="w-full bg-white p-8  rounded-lg flex justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col relative overflow-hidden mb-4 mt-4">
                                        <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#676bbe] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm">测试环境</span>
                                        <div className="border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            发布地址
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            {/* <Link className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none" href={`https://pipeline.dajie-inc.com/view/k8s-test/job/${project?.project_name}-for-k8s-test`} target="_blank">
                                https://pipeline.dajie-inc.com/view/k8s-test/job/{project?.project_name}-for-k8s-test
                              </Link> */}

                                                            <RenderLink href={`https://pipeline.dajie-inc.com/view/k8s-test/job/${project?.project_name}-for-k8s-test`} title={`https://pipeline.dajie-inc.com/view/k8s-test/job/${project?.project_name}-for-k8s-test`} />

                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            日志监控
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.git_repo}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            业务监控
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderStatusComponent
                                                                options={BusinessOptions}
                                                                currentValue={project?.business}
                                                            />
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            测试域名
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <Link href={`${project?.domain}`} target="_blank">
                                                                {project?.domain}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            项目描述
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.description}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            关联机器
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderStatusComponent
                                                                options={BusinessOptions}
                                                                currentValue={project?.business}
                                                            />
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    {/* 预发环境 */}

                                    <div className="w-full bg-white p-8  rounded-lg flex justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col relative overflow-hidden mb-4 mt-4">
                                        <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#70ff20] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm">预发环境</span>
                                        <div className="border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            发布地址
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            http://www.baidu.com
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            日志监控
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.git_repo}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            业务监控
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderStatusComponent
                                                                options={BusinessOptions}
                                                                currentValue={project?.business}
                                                            />
                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowraptext-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            测试域名
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <Link href={`${project?.domain}`} target="_blank">
                                                                {project?.domain}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-normal text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            项目描述
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.description}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            关联机器
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderStatusComponent
                                                                options={BusinessOptions}
                                                                currentValue={project?.business}
                                                            />
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* 生产环境 */}
                                    <div className="w-full bg-white p-8  rounded-lg flex justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col relative overflow-hidden mb-4 mt-4">
                                        <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#de25a1] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm">生产环境</span>
                                        <div className="border shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-3">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            发布地址
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderLink href={`https://pipeline.dajie-inc.com/view/k8s-prod/job/${project?.project_name}-for-k8s-prod`} title={`${project?.project_name} 发布地址`} />

                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            日志监控
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.git_repo}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            业务监控
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderLink href={`https://grafana.dajie-inc.com/d/HqPEDtjMkf/k8s-jvm-micrometer?orgId=1&refresh=30s`} title={`Spring Boot Metrics 监控`} />

                                                        </td>

                                                    </tr>

                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            测试域名
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <Link href={`${project?.domain}`} target="_blank">
                                                                {project?.domain}{" "}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start  text-sm font-medium text-gray-500 bg-gray-100">
                                                            项目描述
                                                        </th>
                                                        <td
                                                            colSpan="3"
                                                            className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                                        >
                                                            <p>{project?.description}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            配置中心
                                                        </th>

                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            <RenderLink href={`http://new-prod-config.dajie-inc.com/config.html?#/appid=${project?.project_name}`} title={`${project?.project_name} 对应配置中心地址`} />

                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium text-gray-500 bg-gray-100">
                                                            关联机器
                                                        </th>

                                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                                            {project?.deploy_type == 1 ? (
                                                                <RenderLink href={`https://kubepi.dajie-inc.com/kubernetes/msmx-prod/namespace/prod/workload/view/Deployment/${project?.project_name}`} title={`${project?.project_name} 对应k8s控制台`} />
                                                            ) : (
                                                                <RenderStatusComponent
                                                                    options={BusinessOptions}
                                                                    currentValue={project?.business}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                                : ""
                        }
                    </>
                ) : (
                    <NothingSelect />
                )
            }
        </>

    )
}

