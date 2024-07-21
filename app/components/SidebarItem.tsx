"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  Icon: LucideIcon;
  label: string;
  href: string;
};
const SidebarItem = ({ Icon, label, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      //   variant={active ? "sidebarOutline" : "sidebar"}
      className="flex justify-start h-[44px] w-full mt-2 text-xs bg-themePrimary hover:bg-themePrimaryHover"
    >
      <Icon className="mr-5 w-5 h-5" />
      <Link href={href} className="pl-2">
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
