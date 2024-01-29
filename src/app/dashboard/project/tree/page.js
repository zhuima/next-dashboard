
import Project from "@/app/ui/project/project"
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {
  AiFillHome,
} from "react-icons/ai";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {

  return (
    <main className=" overflow-hidden">
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "项目列表",
            href: "/dashboard/project/tree",
            active: true,
          },]}
      />
      <Project />
    </main>
  );
}
