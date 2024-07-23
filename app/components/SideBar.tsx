"use client";

import { cn } from "@/lib/utils";
import { Square, Combine } from "lucide-react";
import SidebarItem from "./SidebarItem";

type Props = {
  className?: string;
};
const SideBar = ({ className }: Props) => {
  return (
    <aside
      className={cn(
        "flex h-full xl:w-[280px] xl:fixed left-0 top-0 px-6 border-r-[1px] border-slate-200 flex-col bg-muted",
        className
      )}
    >
      <div className="mt-32">
        <SidebarItem Icon={Square} label={"Single Income Source"} href="/" />
        <SidebarItem
          Icon={Combine}
          label={"Multiple Income Sources"}
          href="/multiple-income-sources"
        />
      </div>
    </aside>
  );
};

export default SideBar;
