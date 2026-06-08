"use client";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { fontColor2 } from "@/lib/constants";
import Divider from "../ui/Divider";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="drawer drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4 md:px-12 lg:px-24 md:py-12 max-w-4xl">
        {children}
      </div>
      <div className="drawer-side flex">
        <ul className="menu bg-base-200 lg:w-48 min-w-14 md:min-w-48 text-base-content min-h-full pb-4 md:px-4 px-1 justify-between">
          <div className="space-y-2">
            <div className="flex justify-center py-2">
              <Logo size={24} color={fontColor2} />
            </div>
            <Divider style={{ opacity: 0.1, marginBottom: 18, marginTop: 0 }} />
            <SidebarItem name={t("overview")} path={"/docs/overview"} />
            <SidebarItem name={t("projects")} path={"/docs/projects"} />
            <SidebarItem name={t("reports")} path={"/docs/reports"} />
          </div>
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  name: string;
  path: string;
}

const SidebarItem = ({ name, path }: SidebarItemProps) => {
  const currentPath = usePathname();
  const router = useRouter();
  const style = currentPath === path ? "bg-base-300 rounded-md" : "";

  return (
    <li className={`mb-4 ${style}`}>
      <a
        onClick={() => {
          router.push(path);
        }}
        className={`active:bg-base-300 active:opacity-40 active:text-black gap-3`}
      >
        <span className="max-md:hidden">{name}</span>
      </a>
    </li>
  );
};

export default Sidebar;
