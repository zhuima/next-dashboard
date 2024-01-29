
import { Suspense } from "react";
import Form from "@/app/ui/workflow/edit-form";
import { useProject } from "@/app/hooks/useProject";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { AiFillHome } from "react-icons/ai";
import { TasksTableSkeleton } from "@/app/ui/skeletons";
import ProjectSearchTab from "@/app/ui/project/projectSearchTab"
import ProjectTab from "@/app/ui/project/projectTab";

export default function Page({ params }) {
    const id = params.id;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "首页", Icon: AiFillHome, href: "/dashboard" },
                    {
                        label: "项目清单",
                        href: "/dashboard/workflow",
                        active: false,
                    },
                    {
                        label: "项目详情",
                        href: `/dashboard/workflow/${id}/detail`,
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<TasksTableSkeleton />}>
                <div className="project-scrollbar flex-1 p-2 mr-6 shadow-md rounded border border-gray-200">
                    <ProjectSearchTab projectid={id} />
                </div>
            </Suspense>
        </main>
    );
}
