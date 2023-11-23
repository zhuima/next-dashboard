import { AiFillHome } from "react-icons/ai";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import DutyInfo from "@/app/ui/dutyschedule/dutyInfo";

export const metadata = {
  title: "值班表",
  description: "运维排班页面",
};

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "首页", Icon: AiFillHome, href: "/dashboard" },
          {
            label: "值班表",
            href: "/dashboard/dutyschedule",
            active: true,
          },
        ]}
      />
      <DutyInfo />
    </main>
  );
}
